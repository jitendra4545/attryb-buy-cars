import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const userRegister=createAsyncThunk("userRegister",async(payload)=>{
    const res=await fetch("http://localhost:8456/user/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)

    })
    const result=await res.json()
    console.log("saddsaasd",result)
    alert(`${result.msg}`)
    return result
    
})



export const userLogin=createAsyncThunk("userLogin",async(payload)=>{
    try{
           let res=await fetch(`http://localhost:8456/user/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
           })
           let result=await res.json()
           alert(result.msg)
           console.log("token",result)
           return result
    }catch(err){
         console.log(err)
    }
})


export const AppDetails=createSlice({
    name:'AppDetails',
    initialState:{
        dealers:[],
        isAuth:false,
        loading:false,
        error:false,
        token:""
    },
    reducers:{
        [userRegister.pending]: (state) => {
            state.loading = true
        },
        [userRegister.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false
           
        },
        [userRegister.rejected]: (state) => {
            state.error = true
        }, 
        [userLogin.pending]: (state) => {
            state.loading = true
        },
        [userLogin.fulfilled]: (state, action) => {
            console.log("payload",action)
            state.loading = false
        //    state.token=action.payload
        },
        [userLogin.rejected]: (state) => {
            state.error = true
        }, 
    }
})


export default AppDetails.reducer