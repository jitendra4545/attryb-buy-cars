import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { AllRoutes } from './pages/AllRoutes'
import { Box } from '@chakra-ui/react'

function App() {
 

  return (
    <Box bg={'blue.50'}>
    <AllRoutes/>
    </Box>
  )
}

export default App
