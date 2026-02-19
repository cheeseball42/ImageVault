import { Box, Button, Heading, VStack, Card, CardHeader, CardBody, CardFooter , Input} from "@chakra-ui/react";
import {FiLogIn} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import Title from "../../components/title/Title";

function Login(){
    const navigate = useNavigate();

    return (<Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.900, blue.700, purple.900)">
        <VStack spacing={6}>
            <Card bgColor="whiteAlpha.500">
                <CardHeader minW="full" display="flex" alignItems="center" justifyContent="center"><Title/></CardHeader>
                <CardBody>
                  <Input placeholder='Username' margin="0.5rem" _placeholder={{color: "brand.greyshift"}}/>
                  <Input placeholder='Password' margin="0.5rem" _placeholder={{color: "brand.greyshift"}}/>
                  <Button colorScheme="blue" leftIcon={<FiLogIn />} onClick={()=>navigate("/gallery")}>Login</Button>
                </CardBody>
                <CardFooter>Designed and Deployed By Akila Paranawithana</CardFooter>
            </Card>
        </VStack>
    </Box>)
}

export default Login;