from aws_cdk import (
    # Duration,
    Stack,
    # aws_sqs as sqs,
    RemovalPolicy,
    aws_cognito as cognito,
    aws_apigatewayv2 as apigwv2,
    aws_apigatewayv2_authorizers as apigw_auth,
    aws_apigatewayv2_integrations as apigw_int,
    aws_ecs_patterns as ecs_patterns,
    aws_ecr_assets as ecr_assets,
    aws_ecs as ecs,
    aws_apigatewayv2_integrations as apigw_int,
    aws_s3 as s3,
    aws_iam as iam,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    Duration,
    CfnOutput
)
from constructs import Construct

class InfraStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # The code that defines your stack goes here

        imported_user_pool = cognito.CfnUserPool(
            self,
            "AuthUserPool",
            user_pool_name="Auth User Pool",
            deletion_protection="ACTIVE",
            policies=cognito.CfnUserPool.PoliciesProperty(
                password_policy=cognito.CfnUserPool.PasswordPolicyProperty(
                    minimum_length=8,
                    require_uppercase=True,
                    require_lowercase=True,
                    require_numbers=True,
                    require_symbols=True,
                    temporary_password_validity_days=7,
                )
            ),
            verification_message_template=cognito.CfnUserPool.VerificationMessageTemplateProperty(
                default_email_option="CONFIRM_WITH_CODE"
            ),
            user_attribute_update_settings=cognito.CfnUserPool.UserAttributeUpdateSettingsProperty(
                attributes_require_verification_before_update=[]
            ),
            mfa_configuration="OFF",
            email_configuration=cognito.CfnUserPool.EmailConfigurationProperty(
                email_sending_account="COGNITO_DEFAULT"
            ),
            admin_create_user_config=cognito.CfnUserPool.AdminCreateUserConfigProperty(
                allow_admin_create_user_only=False,
                unused_account_validity_days=7,
            ),
            account_recovery_setting=cognito.CfnUserPool.AccountRecoverySettingProperty(
                recovery_mechanisms=[
                    cognito.CfnUserPool.RecoveryOptionProperty(
                        name="verified_email",
                        priority=1,
                    ),
                    cognito.CfnUserPool.RecoveryOptionProperty(
                        name="verified_phone_number",
                        priority=2,
                    ),
                ]
            ),
            lambda_config={},  # matches your output
            user_pool_tags={},  # matches your output
        )

        # Safety: prevents accidental deletion if someone runs `cdk destroy`.
        imported_user_pool.apply_removal_policy(RemovalPolicy.RETAIN)

        # CREATING JWT AUTHORIZER AND HTTP API GATEWAY
        user_pool = cognito.UserPool.from_user_pool_id(
            self,
            "AuthUserPoolRef",
            imported_user_pool.ref,  # This is the UserPoolId
        )

        api_client = cognito.UserPoolClient(
            self,
            "ApiClient",
            user_pool=user_pool,
            auth_flows=cognito.AuthFlow(user_password=True, user_srp=True),
            generate_secret=False,  # typical for public clients
        )

        http_api = apigwv2.HttpApi(self, "HttpApi")

        issuer = f"https://cognito-idp.{self.region}.amazonaws.com/{user_pool.user_pool_id}"

        jwt_auth = apigw_auth.HttpJwtAuthorizer("JwtAuth", jwt_issuer=issuer, jwt_audience=[api_client.user_pool_client_id])

        # Adding in ECS and ALB
        alb_service = ecs_patterns.ApplicationLoadBalancedFargateService(
            self,
            "AppService",
            task_image_options=ecs_patterns.ApplicationLoadBalancedTaskImageOptions(
                image=ecs.ContainerImage.from_asset(
                    directory="../app",
                    file="Dockerfile",
                    # build_args={"NODE_ENV": "production"},
                    platform=ecr_assets.Platform.LINUX_AMD64,
                ),
                container_port=80,
            ),
            public_load_balancer=False,  # keeping it private to use API Gateway as the front door
        )
        listener = alb_service.listener

        # Linking API Gateway with ALB Service through a protected route
        vpc_link = apigwv2.VpcLink(
            self,
            "ApiVpcLink",
            vpc=alb_service.cluster.vpc,
        )

        alb_integration = apigw_int.HttpAlbIntegration(
            "AlbIntegration",
            listener=listener,
            vpc_link=vpc_link,
        )

        http_api.add_routes(
            path="/app/{proxy+}",
            methods=[apigwv2.HttpMethod.ANY],
            integration=alb_integration,
            authorizer=jwt_auth,
        )

        # CREATING AN S3 BUCKET AND GIVING ECS ACCESS

        bucket = s3.Bucket(
            self,
            "ImageVault",
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            encryption=s3.BucketEncryption.S3_MANAGED,
            enforce_ssl=True,
        )

        bucket.grant_read_write(alb_service.task_definition.task_role)

        distribution = cloudfront.Distribution(
            self,
            "ImageVaultCdn",
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3BucketOrigin.with_origin_access_control(bucket),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
                allowed_methods=cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
            ),
        )

        CfnOutput(self, "BucketName", value=bucket.bucket_name)
        CfnOutput(self, "CloudFrontDomain", value=distribution.domain_name)

        # example resource
        # queue = sqs.Queue(
        #     self, "InfraQueue",
        #     visibility_timeout=Duration.seconds(300),
        # )
