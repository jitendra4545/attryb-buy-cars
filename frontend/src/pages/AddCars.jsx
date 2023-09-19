import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
// import { Form } from 'react-router-dom'

export const AddCars = () => {
    const [Loading, setLoading] = useState(false)
    const [AllCar, setAllcar] = useState([])
    const [oem_id, setoem_id] = useState("")
    const [image, setimage] = useState("")
    const [title, settitle] = useState("")
    const [desc, setdesc] = useState([])
    const [price, setprice] = useState("")
    const [km, setkm] = useState("")
    const [major_scratch, setmajor_scratch] = useState("")
    const [original_paint, setoriginal_paint] = useState("")
    const [accident, setaccident] = useState("")
    const [prev_buyer, setprev_buyer] = useState("")
    const [registration_place, setregistration_place] = useState("")


    const token=JSON.parse(localStorage.getItem("usertoken"))

    console.log("sdfdsfdsf", oem_id, image,token)
    const getData = async () => {
        setLoading(true)
        axios.get(`http://localhost:8456/oem?q=`)
            .then((res) => {
                console.log(res)
                setAllcar(res.data)
                setLoading(false)
            }).catch(err => console.log(err))
    }
    useEffect(() => {
        getData()
    }, [])


    const handleSubmit = (e) => {
 e.preventDefault()

// const payload={
//     oem_id, title, desc, price, km, major_scratch, original_paint, accident, prev_buyer, registration_place, image
// }

axios.post(`http://localhost:8456/dealer/add`,payload,{
    
        headers: {
          'Authorization': `${token}` ,
          "Content-Type": "multipart/form-data",
},
    })
.then((res)=>{
    console.log(res)
}).catch(err=>console.log(err))



    }


    const handleData=()=>{
        

        
       
        // console.log("form",payload )
        const formData=new FormData()
        formData.append("oem_id",oem_id)
        formData.append("title",title)
        formData.append("desc",desc)
        formData.append("price",price)
        formData.append("km",km)
        formData.append("major_scratch",major_scratch)
        formData.append("original_paint",original_paint)
        formData.append("accident",accident)
        formData.append("image",image)
        formData.append("prev_buyer",prev_buyer)
        formData.append("registration_place",registration_place)
        axios.post(`http://localhost:8456/dealer/add`,formData,
        {
              headers: {
                  'Authorization': `${token}` ,
                  },
            })
        .then((res)=>{
            console.log(res)
        }).catch(err=>console.log(err))
        
    }


    return (
        <Box>
            <Navbar />
            <Box>
                <Box border={'2px solid green'} p={{ base: "20px", md: "30px", lg: "45px" }} w={{ base: "70%", md: "50%", lg: "40%" }} m='auto'>

                    <FormControl>
                        <FormLabel >Select Model</FormLabel>
                        <Select onChange={(e) => setoem_id(e.target.value)} placeholder='Select Car Model'>
                            {
                                AllCar?.map((el, i) => {
                                    return <option value={el._id}>{el.model_name + " " + el.model_year}</option>
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel >Upload Image</FormLabel>
                        <Input type='file' onChange={(e) => setimage(e.target.files[0])} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Title</FormLabel>
                        <Input type='text' onChange={(e) => settitle(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Description</FormLabel>
                        <Input type='text' onChange={(e) => setdesc(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Price</FormLabel>
                        <Input type='number' onChange={(e) => setprice(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Kilo Meter</FormLabel>
                        <Input type='number' onChange={(e) => setkm(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Major Scratch</FormLabel>
                        <Select onChange={(e) => setmajor_scratch(e.target.value)}>
                            <option value=""></option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel >Original Paint</FormLabel>
                        <Select onChange={(e) => setoriginal_paint(e.target.value)}>
                            <option value=""></option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel >No of Accident</FormLabel>
                        <Input type='number' onChange={(e) => setaccident(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Previous Buyer</FormLabel>
                        <Input type='number' onChange={(e) => setprev_buyer(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Registration Place</FormLabel>
                        <Input type='text' onChange={(e) => setregistration_place(e.target.value)} />
                    </FormControl>
                   
                   
                       
                        <Button onClick={handleData} >Submit</Button>
                   
                </Box>
                {/* <Box>
                    <form onSubmit={handleData} enctype="multipart/form-data" action="">
                        <input onChange={(e) => setimage(e.target.files[0])} type="file" />
                        <input type="Submit"  />
                    </form>
                </Box> */}

            </Box>
        </Box>
    )
}
