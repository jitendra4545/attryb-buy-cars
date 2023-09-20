
import { Box, Image } from '@chakra-ui/react'
import React from 'react'

export const Loader = () => {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box>
           <Image src='https://media.tenor.com/guhB4PpjrmUAAAAM/loading-loading-gif.gif' />
        </Box>
    </Box>
  )
}
