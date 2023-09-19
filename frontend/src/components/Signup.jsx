
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {MdDriveFileRenameOutline} from 'react-icons/md'
import { Link, useNavigate } from "react-router-dom";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

import axios from 'axios'
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


const navigate=useNavigate()
const handleReg=()=>{

  const payload={
    name,email,password
  }
  axios.post(`http://localhost:8456/user/signup`,payload)
  .then((res)=>{
    console.log(res)
    if(res.data?.msg=="User Register Successfully"){
      alert("User registerd")
      navigate("/login")
    }else{
      alert(res.data.msg,res.data?.err)
    }
  }).catch((err)=>{
  
    console.log(err)
  })
  
}





  return (
    <>
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome To Attryb</Heading>
        
        <Box minW={{ base: "90%", md: "468px" }}>
          {/* <form > */}
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
                 <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                     children={<MdDriveFileRenameOutline color="gray.300" />}
                  />
                  <Input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Your Name" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                  onChange={(e)=>setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText m={'20px 0px'} fontWeight={'500'} textAlign="right">
                  <Link  to='/login'>Already have Accound? Login</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              onClick={handleReg}
              >
               Register
              </Button>
            </Stack>
          {/* </form> */}
        </Box>
      </Stack>
      
      
    </Flex>
    </>
  );
};

export default Signup;

