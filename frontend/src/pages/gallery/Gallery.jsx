import { Box, Button, Heading, VStack, Card, CardHeader, CardBody, CardFooter , Input} from "@chakra-ui/react"

function Gallery(){
    return (<Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.900, blue.700, purple.900)">
        <VStack spacing={6}>
            <Card>
                <CardHeader><Heading>ImageVault - Gallery</Heading></CardHeader>
                <CardBody>
                  
                </CardBody>
                <CardFooter>Designed and Deployed By Akila Paranawithana</CardFooter>
            </Card>
        </VStack>
    </Box>)
}

export default Gallery;