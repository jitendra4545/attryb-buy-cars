import { Box, Button, Input, Text } from '@chakra-ui/react'
import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { SearchFunc } from './SearchFunc'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <Box p='17px' bg='teal.800' >
      <Box display={'flex'} justifyContent={'space-evenly'}>
      <Link to='/'>
        <Text color={'white'} fontSize={'xl'} _hover={{color:'yellow'}} fontWeight={'bold'}>All Cars</Text>
       </Link>
       <SearchFunc/>

       <Link to='/add'>
       <Text color={'white'} fontSize={'xl'} _hover={{color:'yellow'}} fontWeight={'bold'} >Add Cars</Text>
       </Link>

      </Box>
      </Box>
  )
}
