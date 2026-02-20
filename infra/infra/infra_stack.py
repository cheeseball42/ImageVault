from aws_cdk import (
    # Duration,
    Stack,
    # aws_sqs as sqs,
    RemovalPolicy,
    aws_cognito as cognito
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

        # example resource
        # queue = sqs.Queue(
        #     self, "InfraQueue",
        #     visibility_timeout=Duration.seconds(300),
        # )
