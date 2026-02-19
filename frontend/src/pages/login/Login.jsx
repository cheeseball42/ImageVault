import { Box, Button, Heading, VStack, Card, CardHeader, CardBody, CardFooter , Input} from "@chakra-ui/react";
import {FiLogIn} from "react-icons/fi";
import {useNavigate, Link} from "react-router-dom";
import Title from "../../components/title/Title";
import {FooterText} from "../../components/footer/Footer";

function Login(){
    const navigate = useNavigate();

    return (<Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.900, blue.700, purple.900)">
        <VStack spacing={6}>
            <Card bgColor="whiteAlpha.500" maxW="500px">
                <CardHeader minW="full" display="flex" alignItems="center" justifyContent="center"><Title/></CardHeader>
                <CardBody>
                    <Input backgroundColor={"whiteAlpha.800"} boxShadow="inset 0 2px 6px rgba(0,0,0,0.15)" placeholder='Username' margin="0.5rem" _placeholder={{color: "brand.greyshift"}}/>
                    <Input backgroundColor={"whiteAlpha.800"} boxShadow="inset 0 2px 6px rgba(0,0,0,0.15)" placeholder='Password' type="password" margin="0.5rem" _placeholder={{color: "brand.greyshift"}}/>
                    <Button colorScheme="blue" leftIcon={<FiLogIn />} onClick={()=>navigate("/gallery")}>Login</Button>
                    <Box marginTop={"35px"}>Already have an account? <br/><Link to="/signup">Signup here.</Link></Box>
                </CardBody>
                <CardFooter><FooterText/></CardFooter>
            </Card>
        </VStack>
    </Box>)
}

export default Login;