import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
name:'user',
initialState:{
availableData:[]
},
reducers:{
    updateData :(state, action)=>{
        state.availableData.find((item,index)=> {
            if(item.id == action.payload.id){
                let data =[ ...state.availableData]
                data.splice(index,1, action.payload)
                state.availableData =  [...data]
            } 
        })
    },
    addData:(state, action)=>{
        let data =[ ...state.availableData, action.payload]
        state.availableData =  [...data]
    },
    deleteData:(state,action)=>{
        state.availableData.find((item,index)=> {
            if(item.id == action.payload){
                let data =[ ...state.availableData]
                data.splice(index,1)
                state.availableData =  [...data]
            } 
        })
    }

}

})

export const { updateData,addData,deleteData } = userSlice.actions;
export default userSlice.reducer
