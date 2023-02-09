import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import url from "../config";
import { RootState } from '.';
import { loadState } from './localStorage';

export interface videoState {
  videos: [{ id: string, name:string,duration:Number,path:string,thumbnail:string}],
  allvideosmsg: string,
  addvideomsg: string,
  fetchvideoMsg: string,
  selectedvideoId: string,
  editvideoMsg:string
}


const persistedState = loadState();
const initialState = persistedState == undefined ? {
  videos: [{}],
} as videoState : persistedState.videoReducer as videoState;

export const allvideos = createAsyncThunk(
  'allvideos',
  async (arg, { getState }) => {
    const state: RootState = getState() as RootState;
    const request = await axios
      .get(`${url}/video`)
    return request.data;
  });

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<videoState>) {
      state = action.payload
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allvideos.fulfilled, (state, action) => {
      state.videos = action.payload
      state.allvideosmsg = "Success";
      return state;
    })
    builder.addCase(allvideos.rejected, (state, action) => {
      state.allvideosmsg = "Error Fetching";
      return state;
    })
  },
})

export const { updateFormData } = videoSlice.actions
export default videoSlice.reducer

function getState() {
  throw new Error('Function not implemented.');
}
