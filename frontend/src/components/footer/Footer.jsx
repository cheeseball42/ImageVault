import { Box } from "@chakra-ui/react";

function FooterText(){
    return <Box w="full" bgGradient="linear(to-br, whiteAlpha.100, blue.700, purple.900)" fontWeight="extrabold" bgClip="text" justifyContent="center">Designed and Deployed By Akila Paranawithana</Box>
}

function Footer(){
    return <Box w="full" h="7" boxShadow="0 -6px 24px rebeccapurple" backgroundColor="whiteAlpha.800" position="fixed" bottom="0"><FooterText/></Box>
}

export default Footer;
export {FooterText}