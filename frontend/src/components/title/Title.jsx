import {Heading, Box} from "@chakra-ui/react"
import { FaVault } from "react-icons/fa6";

function Title(){
    return <Heading color="brand.main">
        <Box filter= "drop-shadow(0 -1px 0 rgba(255,255,255,0.9)) drop-shadow(0 1px 0 rgba(0,0,0,0.5))" display="flex" _hover={{filter: "none", cursor: "pointer"}}>
            <Box boxSize="1em" mt="3px" as={FaVault}/>&nbsp;ImageVault
        </Box>
    </Heading>
}

export default Title