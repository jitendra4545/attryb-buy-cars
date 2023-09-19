import { Box, Button, Input, Text } from '@chakra-ui/react'
import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
export const Navbar = () => {
  return (
    <Box p='17px' bg='teal.800' >
      <Box display={'flex'} justifyContent={'space-evenly'}>
        <Text color={'white'} fontSize={'xl'} _hover={{color:'yellow'}} fontWeight={'bold'}>All Cars</Text>
        <Box display={'flex'}>
        <Input placeholder='Enter Car Model With Year' />
        <Button><AiOutlineSearch/></Button>
        </Box>

        <Text color={'white'} fontSize={'xl'} _hover={{color:'yellow'}} fontWeight={'bold'} >Add Cars</Text>

      </Box>
      </Box>
  )
}
