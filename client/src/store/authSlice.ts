import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import url from "../config";
import { loadState } from './localStorage';
export interface authState {
  id: string,
  firstname: string,
  lastname:string,
  email:string,
  loginmsg:string
  token?:string,
  signmsg:string
}

const persistedState = loadState();
const initialState = persistedState == undefined? {
  id: "",
  firstname: "",
  lastname:"",
  email:"",
  token:""
} as authState: persistedState.authReducer as authState;


export const signup =  createAsyncThunk(
    'signup',
    async (data:authState) => {
    const request = await axios
      .post(`${url}/users/signup`, data)
    return request.data;  
  });

export const login =  createAsyncThunk(
    'login',
    async (data:authState) => {
    const request = await axios
      .post(`${url}/users/login`, data)
    return request.data;  
  });
  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateFormData(state,action:PayloadAction<authState>){
      state = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state = action.payload
      state.signmsg = "Success";
      return state;
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.signmsg = "Error Fetching";
      return state;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state = action.payload
      state.loginmsg = "Success";
      return state;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loginmsg = "Error Fetching";
      return state;
    })
  },
})

export const { updateFormData } = authSlice.actions
export default authSlice.reducer