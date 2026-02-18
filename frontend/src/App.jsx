import './App.css'
import { Box, Button, Heading, VStack, Card, CardHeader, CardBody, CardFooter , Input} from "@chakra-ui/react"

function App() {

  return (
    <>
      <Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.900, blue.700, purple.900)">
        <VStack spacing={6}>
          <Card>
            <CardHeader><Heading>ImageVault</Heading></CardHeader>
            <CardBody>
              <Input placeholder='Username' margin="0.5rem" />
              <Input placeholder='Password' margin="0.5rem"/>
              <Button colorScheme="blue">Login</Button>
            </CardBody>
            <CardFooter>Designed and Deployed By Akila Paranawithana</CardFooter>
          </Card>
        </VStack>
      </Box>
    </>
  )
}

export default App
