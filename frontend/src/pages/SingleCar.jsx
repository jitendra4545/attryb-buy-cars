import { Box, Heading, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import axios from 'axios'

export const SingleCar = () => {
  const [Loading,setLoading]=useState(false)
  const [data,setdata]=useState([])
  const params=useParams()
  const id=params.id
    const getSingleData=()=>{
        setLoading(true)
        axios.get(`http://localhost:8456/dealer/${id}`)
        .then((res)=>{
            console.log(res.data)
            setLoading(false)
            setdata(res.data)
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
        })
    }
  

    useEffect(()=>{
  getSingleData()
    },[])



    return (
    <Box>
        <Navbar/>
        <Box w={{base:"95%",md:"93%",lg:"90%"}} margin={'auto'} >
            <Box>
                <Heading>Company Details</Heading>
                <Image src={data[0]?.oem_id.image} />
                <Text>Model Name : {data[0]?.oem_id.model_name}</Text>
                <Text>Model Year : {data[0]?.oem_id.model_year}</Text>
                <Text>Price : {data[0]?.oem_id.new_price}</Text>
                <Text>Max Speed : {data[0]?.oem_id.max_speed}</Text>
            </Box>
            <Box>
                 <Heading>Dealer Details</Heading>
                 <Image src={data[0]?.image} />
                 <Text>Title : {data[0]?.title}</Text>
                 <Text>Price : {data[0]?.price}</Text>
                 <Text>KM : {data[0]?.km}</Text>
                 <Text>Accident : {data[0]?.accident}</Text>
                 <Text>Previous Buyer : {data[0]?.prev_buyer}</Text>
                 <Text>Registration Place :{data[0]?.registration_place}</Text>
                 <Text>Major Scratch : {data[0]?.major_scratch}</Text>
                 <Text>Original Paint : {data[0]?.original_paint} </Text>
            </Box>
        </Box>
    </Box>
  )
}
