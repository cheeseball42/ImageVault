import { Menu, MenuButton, MenuItem, MenuList, Box, Avatar} from "@chakra-ui/react"
import {FiLock} from "react-icons/fi"
import {useNavigate} from "react-router-dom";
import Title from "../title/Title"

function NavBar(){
    const navigate = useNavigate()
    return <Box w="full" h="70" backgroundColor="whiteAlpha.800" borderBottom="solid 2px rebeccapurple" display="flex" justifyContent="space-between" alignItems="center" position="fixed" top="0" boxShadow="0 12px 24px rebeccapurple" zIndex="500">
        <Box marginLeft={5}><Title/></Box>
        <Menu>
  <MenuButton borderRadius="0" padding="5px" marginRight="5px" h="full" margin="0" _hover={{boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)", border: "0"}} alignItems="center" justifyContent="center" display="flex" maxW="500">
    <Box>
        <Avatar name='Ryan Florence' src='https://bit.ly/broken-link' bg="lightblue"/> &nbsp; <Box alignItems={"center"} justifyContent={"center"} lineHeight={"10"} textShadow="0 -1px 0 rgba(255,255,255,0.9),0 1px 0 rgba(0,0,0,0.5)" _active={{border: "0"}} display="inline-block">Ryan Florence</Box>
    </Box>
</MenuButton>
  <MenuList>
    <MenuItem icon={<FiLock />} onClick={()=>navigate("/login")}>
      Logout
    </MenuItem>
  </MenuList>
</Menu>
    </Box>
}

export default NavBar;