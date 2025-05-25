import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes:localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes")):[], 
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;
      //add a check if paste already existed
      //
      state.pastes.push(paste);
      localStorage.setItem("pastes",
        JSON.stringify(state.pastes))
      toast("paste created successfully")
    },
    updateToPastes: (state,action) => {
        const paste = action.payload;
        //add a check if paste already existed
        const index = state.pastes.findIndex((p) => p.id === paste.id);
        if (index !== -1) {
          state.pastes[index] = paste;
          localStorage.setItem("pastes",
            JSON.stringify(state.pastes))
          toast.success("paste updated successfully")
        } else {
          toast.error("paste not found")
        }  
      
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success("all pastes deleted successfully")
      
    },
    removeFromPastes: (state,action) => {
      const pasteId = action.payload;
      //add a check if paste already existed
      const index = state.pastes.findIndex((p) => p.id === pasteId);
      if (index !== -1) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes",
          JSON.stringify(state.pastes))
        toast.success("paste deleted successfully")
      } else {
        toast.error("paste not found")
      }
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer