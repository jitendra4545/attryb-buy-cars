import { createSlice } from '@reduxjs/toolkit'




export const AppDetails=createSlice({
    name:'AppDetails',
    initialState:{
        dealers:[],
        isAuth:false,
        isLoading:false,
        isError:false,
        token:""
    },
    reducers:{

    }
})


export default AppDetails.reducer