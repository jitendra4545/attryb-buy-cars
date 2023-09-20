import { Box, Button, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export const SearchFunc = () => {
     const [Cars,setCars]=useState([])
    const [query, setquery] = useState("")
    console.log("sercah",Cars)

    const getData=async()=>{
 axios.get(`https://adorable-puce-gloves.cyclic.cloud/oem?q=${query}`)
 .then((res)=>{
    console.log(res)
    setCars(res.data)
 }).catch(err=>console.log(err))
    } 


    useEffect(()=>{
       getData()
    },[query])



  return (
    <div>
         <Box display={'flex'}>
    <Input onChange={(e)=>setquery(e.target.value)} placeholder='Enter Car Model With Year' />
      
    </Box>
    </div>
  )
}
