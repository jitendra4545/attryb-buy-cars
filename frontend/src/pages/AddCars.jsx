import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
// import { Form } from 'react-router-dom'

export const AddCars = () => {
    const [Loading, setLoading] = useState(false)
    const [AllCar, setAllcar] = useState([])
    const [oem_id, setoem_id] = useState("")
    // const [image, setimage] = useState("")
    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")
    const [Alldesc, setAlldesc] = useState([])
    const [price, setprice] = useState("")
    const [km, setkm] = useState("")
    const [major_scratch, setmajor_scratch] = useState("")
    const [original_paint, setoriginal_paint] = useState("")
    const [accident, setaccident] = useState("")
    const [prev_buyer, setprev_buyer] = useState("")
    const [registration_place, setregistration_place] = useState("")
const [s_data,setS_data]=useState([])
    const params = useParams()
    const id = params.id

    const navigate=useNavigate()


    const token = JSON.parse(localStorage.getItem("usertoken"))


    const getData = () => {
        setLoading(true)
        axios.get(`https://adorable-puce-gloves.cyclic.cloud/oem?q=`)
            .then((res) => {
                console.log(res)
                setAllcar(res.data)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }
    useEffect(() => {
        getData()
        if(id){
            getSingleData()
        }
    }, [])


    useEffect(()=>{
           if(id){
            settitle(s_data[0]?.title)
            setdesc(s_data[0]?.desc[0])
            setprice(s_data[0]?.price)
            setkm(s_data[0]?.km)
            setaccident(s_data[0]?.accident)
            setprev_buyer(s_data[0]?.prev_buyer)
            setregistration_place(s_data[0]?.registration_place)
           }
    },[Loading,s_data])


const getSingleData=()=>{
    setLoading(true)
    axios.get(`https://adorable-puce-gloves.cyclic.cloud/dealer/${id}`)
    .then((res)=>{
        console.log(res.data)
        setLoading(false)
        setS_data(res.data)
    }).catch((err)=>{
        console.log(err)
        setLoading(false)
    })
}



    const handleData = () => {
        if(registration_place==""||prev_buyer==""||accident==""||original_paint==""||major_scratch==""||km==""||price==""||title==""||oem_id==""){
            alert("fill all the fields")
        }else{
            setLoading(true)
            const formData = new FormData()
            formData.append("oem_id", oem_id)
            formData.append("title", title)
            formData.append("desc", Alldesc)
            formData.append("price", price)
            formData.append("km", km)
            formData.append("major_scratch", major_scratch)
            formData.append("original_paint", original_paint)
            formData.append("accident", accident)
          
            formData.append("prev_buyer", prev_buyer)
            formData.append("registration_place", registration_place)
    
          const payload={
            oem_id,title,desc:Alldesc,price,km,major_scratch,original_paint,accident,prev_buyer,registration_place
          }
    
    


            axios.post(`https://adorable-puce-gloves.cyclic.cloud/dealer/add`, payload,
                {
                    headers: {
                        'Authorization': `${token}`,
                    },
                })
                .then((res) => {
                    if(res.data?.msg=="Car Added Successfully"){
                        navigate("/")
                        alert(res.data.msg)
                    }else{
                        alert(res.data?.msg)
                    }
                    
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
    
        }
    
    
        
      
    }
const UpdateData=()=>{
    setLoading(true)
    const payload={
        title,desc:Alldesc,price,km,accident,prev_buyer,registration_place
    }
    axios.patch(`https://adorable-puce-gloves.cyclic.cloud/dealer/${id}`,payload,{
        headers: {
            'Authorization': `${token}`,
        }
    }) .then((res)=>{
        console.log(res)
        setLoading(false)
navigate('/')
    alert("Data Updated Successfully")
    }).catch((err)=>{
        console.log(err)
        setLoading(false)
    })
}



    const AddDesc = () => {

        setAlldesc([...Alldesc,desc])
        setdesc("")
    }

console.log(Alldesc)
if(Loading){
    return <Loader/>
}


    return (
        <Box>
            <Navbar />
            <Box p='10px'>
               
                <Heading textAlign={'center'} p='10px' color={'blue'} fontSize={'xl'}>ADD CAR DETAILS</Heading>
                <Box boxShadow={'xl'} bg={'cyan.100'} borderRadius={'15px'} p={{ base: "20px", md: "30px", lg: "45px" }} w={{ base: "70%", md: "50%", lg: "40%" }} m='auto'>

                    {
                        id ?
                            <FormControl>
                                <FormLabel >Select Model</FormLabel>
                                <Select disabled border={'1px solid blue'} onChange={(e) => setoem_id(e.target.value)} placeholder='Select Car Model'>
                                    {
                                        AllCar?.map((el, i) => {
                                            return <option value={el._id}>{el.model_name + " " + el.model_year}</option>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            :
                            <FormControl>
                                <FormLabel >Select Model</FormLabel>
                                <Select border={'1px solid blue'} onChange={(e) => setoem_id(e.target.value)} placeholder='Select Car Model'>
                                    {
                                        AllCar?.map((el, i) => {
                                            return <option value={el._id}>{el.model_name + " " + el.model_year}</option>
                                        })
                                    }
                                </Select>
                            </FormControl>
                    }
                    {/* {
                        id ?
                            <FormControl>
                                <FormLabel >Upload Image</FormLabel>
                                <Input disabled border={'1px solid blue'} type='file' onChange={(e) => setimage(e.target.files[0])} />
                            </FormControl>
                            :
                            <FormControl>
                                <FormLabel >Upload Image</FormLabel>
                                <Input border={'1px solid blue'} type='file' onChange={(e) => setimage(e.target.files[0])} />
                            </FormControl>
                    } */}
                    <FormControl>
                        <FormLabel >Title</FormLabel>
                        <Input value={title} border={'1px solid blue'} type='text' onChange={(e) => settitle(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Description</FormLabel>
                        <Input value={desc} border={'1px solid blue'} type='text' onChange={(e) => setdesc(e.target.value)} />
                    </FormControl>
                    <Box mt='20px' textAlign={'center'}>
                        <Button bg={'blue'} color={'white'} _hover={{ bg: "blue" }} w='100%' onClick={AddDesc} >Add Description</Button>
                    </Box>

                    {
                        Alldesc.length > 0 ?
                            Alldesc.map((el, i) => {
                                return <Box>
                                    <Text textAlign={'center'}>{i + 1}. {el}</Text>
                                </Box>
                            })
                            :
                            null
                    }


                    <FormControl>
                        <FormLabel >Price</FormLabel>
                        <Input value={price} border={'1px solid blue'} type='number' onChange={(e) => setprice(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Kilo Meter</FormLabel>
                        <Input value={km} border={'1px solid blue'} type='number' onChange={(e) => setkm(e.target.value)} />
                    </FormControl>
               {
                id? <FormControl>
                <FormLabel >Major Scratch</FormLabel>
                <Select disabled value={major_scratch} border={'1px solid blue'} onChange={(e) => setmajor_scratch(e.target.value)}>
                    <option value=""></option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </Select>
            </FormControl>
            :<FormControl>
            <FormLabel >Major Scratch</FormLabel>
            <Select value={major_scratch} border={'1px solid blue'} onChange={(e) => setmajor_scratch(e.target.value)}>
                <option value=""></option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
            </Select>
        </FormControl>
               }     
                  
                  
                  {
                    id?
<FormControl>
                        <FormLabel >Original Paint</FormLabel>
                        <Select disabled value={original_paint} border={'1px solid blue'} onChange={(e) => setoriginal_paint(e.target.value)}>
                            <option value=""></option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </Select>
                    </FormControl>
                    :
                    <FormControl>
                        <FormLabel >Original Paint</FormLabel>
                        <Select value={original_paint} border={'1px solid blue'} onChange={(e) => setoriginal_paint(e.target.value)}>
                            <option value=""></option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </Select>
                    </FormControl>
                  }  
                    <FormControl>
                        <FormLabel >No of Accident</FormLabel>
                        <Input value={accident} border={'1px solid blue'} type='number' onChange={(e) => setaccident(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Previous Buyer</FormLabel>
                        <Input value={prev_buyer} border={'1px solid blue'} type='number' onChange={(e) => setprev_buyer(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel >Registration Place</FormLabel>
                        <Input value={registration_place} border={'1px solid blue'} type='text' onChange={(e) => setregistration_place(e.target.value)} />
                    </FormControl>


                    <Box mt='20px' textAlign={'center'}>
                    {
                        id? 
<Button bg={'blue'} color={'white'} _hover={{ bg: "blue" }} w='100%' onClick={UpdateData} >UPDATE DATA</Button>
:
<Button bg={'blue'} color={'white'} _hover={{ bg: "blue" }} w='100%' onClick={handleData} >ADD DATA</Button>
                    }    

                    </Box>


                </Box>
                

            </Box>
        </Box>
    )
}
