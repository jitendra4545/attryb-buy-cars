import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Box, Button, Heading, Image, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export const HomePage = () => {
  const [Loading, setLoading] = useState(false)
  const [Data, setData] = useState([])
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const navigate = useNavigate()
  const getCarData = () => {
    setLoading(true)
    axios.get(`http://localhost:8456/dealer?filter=${filter}&order=${order}`)
      .then((res) => {
        setLoading(false)
        setData(res.data)
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    getCarData()
  }, [order, filter])

  const handleDelete = (id) => {
    console.log(id)
    setLoading(true)
    axios.delete(`http://localhost:8456/dealer/${id}`)
      .then((res) => {
        console.log(res.data)
        getCarData()
        setLoading(false)
      }).catch((err) => {
        setLoading(false)
        console.log(err)
      })

  }

  const handlePrice = (e) => {
    setOrder(e.target.value)
    setFilter("price")
  }

  // console.log(order)
  const handleMileage = (e) => {
    setFilter("mileage")
    setOrder(e.target.value)
  }

  const handleColor = (e) => {
    setFilter("colors")
    setOrder(e.target.value)
  }



  return (
    <Box>
      <Navbar />
      <Box w={{ base: "95%", md: "90%", lg: "90%" }} m='auto'>
        <Box p={'20px'} display={'flex'} gap='4'   >
          <Select onChange={handlePrice} w={{ base: "90%", md: "85%", lg: "60%" }} m='auto'>
            <option value="">Sort By Price</option>
            <option value="desc">High To Low</option>
            <option value="asc">Low To High</option>
          </Select>
          <Select onChange={handleMileage} w={{ base: "90%", md: "85%", lg: "60%" }} m='auto'>
            <option value="">Sort By Mileage</option>
            <option value="desc">High To Low</option>
            <option value="asc">Low To High</option>
          </Select>
          <Select onChange={handleColor} w={{ base: "90%", md: "85%", lg: "60%" }} m='auto'>
            <option value="">Select Color</option>
            <option value="red">red</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="teal">Teal</option>
            <option value="yellow">Yellow</option>
          </Select>
        </Box>
        {
          Data.length<=0 && <Heading textAlign={'center'}>No Data Found</Heading>
         }
         
        <Box display={'grid'} gap='4' gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }}>
          
        
         
          {   Data?.map((el, i) => {
              return <Box boxShadow={'lg'} p='20px' border={'1px solid blue'} key={i}>
                <Box display={'flex'} gap={'2'}>
                  <Box>
                    <Image w='400px' h='200px' src={el.oem_id?.image} />
                    <Text textAlign={'center'} fontWeight={'bold'} color='blue'>New</Text>
                  </Box>
                  <Box>
                    <Image w='400px' h='200px' src={el.image} />
                    <Text textAlign={'center'} fontWeight={'bold'} color='blue'>After Use</Text>
                  </Box>


                </Box>
                <Text fontWeight={'bold'} fontSize={'xl'}>{el.oem_id?.model_name} {"----"} Year : {el.oem_id?.model_year}</Text>
                <Text fontWeight={'bold'} fontSize={'xl'} >Price : {el.oem_id?.new_price}</Text>
                <Box gap='2' display={'flex'}>
                  <Text fontWeight={'bold'}>Available Colors : </Text>
                  {el.oem_id?.color.map((el) => {
                    return <Box h='20px' w='20px' borderRadius={'20px'} bg={el}>

                    </Box>
                  })}
                </Box>
                <Box display={'grid'}>
                  <Text fontWeight={'bold'}>Description</Text>
                  {el.desc?.map((el) => {
                    return <li>{el}</li>
                  })}
                </Box>
                <Box mt={'10px'} display={'flex'} gap='2'>
                  <Button w='100%' onClick={() => navigate(`/edit/${el._id}`)} color={'white'} bg={'green'}>EDIT</Button>
                  <Button w='100%' onClick={() => handleDelete(el._id)} color={'white'} bg={'red'} >DELETE</Button>
                  <Button w='100%' color={'white'} bg={'blue'}>VIEW</Button>
                </Box>
              </Box>
            })
          }
        </Box>
      </Box>
    </Box>
  )
}
