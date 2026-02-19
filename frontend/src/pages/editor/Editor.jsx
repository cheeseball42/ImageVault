import { Box, Button, Tab, Tabs, TabList, TabPanels, TabPanel, HStack, Heading, VStack, Card, CardHeader, CardBody, CardFooter, Image, Input, AspectRatio} from "@chakra-ui/react";
import {FiCheck, FiRefreshCw} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

function Transform(){
    const navigate = useNavigate();

    return (<Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.900, blue.700, purple.900)">
        <VStack spacing={6}>
            <Card w="90vw" margin={"10"} bgColor="whiteAlpha.500">
                {/* <CardHeader><Heading color="brand.main">ImageVault - Editor</Heading></CardHeader> */}
                <CardBody>
                    <AspectRatio ratio={3/2} w="full" maxW={{ base: "100%", md: "600px" }} mx="auto">
                        <Image src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop" objectFit="cover"/>
                    </AspectRatio>
                    <Tabs isFitted variant='enclosed' colorScheme="purple" backgroundColor={"whiteAlpha.800"} boxShadow="inset 0 2px 6px rgba(0,0,0,0.15)" borderRadius={"10"} margin="5">
                        <TabList color="brand.greyshift">
                            <Tab>One</Tab>
                            <Tab>Two</Tab>
                            <Tab>Three</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <p>one!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
                <CardFooter w="full">
                    <HStack justify="center" spacing={4} mx="auto">
                        <Button leftIcon={<FiRefreshCw/>} colorScheme='blue' mx="auto">Apply</Button>
                        <Button leftIcon={<FiCheck/>} colorScheme='green' mx="auto" onClick={()=>navigate("/gallery")}>Save</Button>
                    </HStack>
                </CardFooter>
            </Card>
        </VStack>
    </Box>)
}

export default Transform;