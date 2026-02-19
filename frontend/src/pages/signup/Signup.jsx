import { Box, Button, VStack, Card, CardHeader, CardBody, CardFooter} from "@chakra-ui/react";
import {FiUserPlus} from "react-icons/fi";
import {useNavigate, Link} from "react-router-dom";
import Title from "../../components/title/Title";
import {FooterText} from "../../components/footer/Footer";
import Input from "../../components/input/Input";

function Signup(){
    const navigate = useNavigate();

    return (<Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.900, blue.700, purple.900)">
        <VStack spacing={6}>
            <Card bgColor="whiteAlpha.500" maxW="500px">
                <CardHeader minW="full" display="flex" alignItems="center" justifyContent="center"><Title/></CardHeader>
                <CardBody>
                    <Input type="username"/>
                    <Input type="email"/>
                    <Input type="password"/>
                    <Button colorScheme="blue" leftIcon={<FiUserPlus />} onClick={()=>navigate("/login")}>Signup</Button>
                    <Box marginTop={"35px"}>Already have an account? <br/><Link to="/login">Login here</Link></Box>
                </CardBody>
                <CardFooter><FooterText/></CardFooter>
            </Card>
        </VStack>
    </Box>)
}

export default Signup;