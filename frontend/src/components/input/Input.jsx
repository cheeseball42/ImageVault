import {Input, FormControl, FormLabel, InputLeftElement, FormHelperText, FormErrorMessage, InputGroup} from "@chakra-ui/react";
import { useState } from "react";
import {FiLock, FiUser, FiMail} from "react-icons/fi"

const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    username: /^[a-zA-Z0-9+=,.@_-]{4,24}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,256}$/
}

const requirements = {
    email: "e.g. user@example.com",
    username: "4–24 characters. Letters, numbers, and +=,.@_-.",
    password: "Minimum 8 characters with upper, lower, number & symbol."
}

const prompt = {
    email: "Email",
    username: "Username",
    password: "Password"
}

const icons = {
  email: FiMail,
  username: FiUser,
  password: FiLock,
};

function CustomInput({type}){
    const [input, setInput] = useState("");
    const [isError, setIsError] = useState(false)
    const Icon = icons[type]
    return <FormControl isInvalid={isError} marginY="1rem">
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
                <Icon color='gray.300' />
            </InputLeftElement>
      <Input value={input} onChange={(e)=>{setInput(e.target.value); setIsError(!regex[type].test(e.target.value))}} backgroundColor={"whiteAlpha.800"} type={type} boxShadow="inset 0 2px 6px rgba(0,0,0,0.15)" placeholder={prompt[type]} _placeholder={{color: "brand.greyshift"}}/>
      </InputGroup>
      {!isError ? (
        <FormHelperText w="full" textAlign={"left"}>
            {requirements[type]}
        </FormHelperText>
      ) : (
        <FormErrorMessage>Invalid {type}. {requirements[type]}</FormErrorMessage>
      )}
    </FormControl>
    return 
}

export default CustomInput;