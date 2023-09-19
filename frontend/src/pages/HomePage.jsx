import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Box, Button, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export const HomePage = () => {
  const [Loading, setLoading] = useState(false)
  const [Data, setData] = useState([])
  
  const navigate=useNavigate()
  const getCarData = () => {
    setLoading(true)
    axios.get("http://localhost:8456/dealer/")
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
  }, [])

  const handleDelete=(id)=>{
      console.log(id)
      setLoading(true)
      axios.delete(`http://localhost:8456/dealer/${id}`)
      .then((res)=>{
        console.log(res.data)
        getCarData()
        setLoading(false)
      }).catch((err)=>{
        setLoading(false)
        console.log(err)
      })

  }




  return (
    <Box>
      <Navbar />
      <Box>
          <Box>
             {
               Data.map((el)=>{
                return <Box>
                   <Box display={'flex'}>
                    <Image w='10%' src={el.image} />
                    <Image w='10%' src={el.oem_id?.image} />
                   </Box>
                   <Text>{el.oem_id?.model_name}  Year : {el.oem_id?.model_year}</Text>
                   <Text>Price : {el.oem_id?.new_price}</Text>
                   <Box display={'flex'}>
                     <Text>Colors : </Text>
                    {el.oem_id?.color.map((el)=>{
                          return <Box h='20px' w='20px'borderRadius={'20px'} bg={el}>
                          
                          </Box>
                    })}
                    </Box>
                    <Box display={'grid'}>
                      {el.desc?.map((el)=>{
                        return <Text>{el}</Text>
                      })}
                      </Box>
                    <Box display={'flex'} gap='2'>
                      <Button onClick={()=>navigate(`/edit/${el._id}`)} color={'white'} bg={'green'}>EDIT</Button>
                      <Button onClick={()=>handleDelete(el._id)} color={'white'} bg={'red'} >DELETE</Button>
                      <Button color={'white'} bg={'blue'}>VIEW</Button>
                    </Box>
                  </Box>
               })
             }
          </Box>
      </Box>
    </Box>
  )
}
