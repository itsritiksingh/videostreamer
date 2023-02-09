import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import url from "../config";

interface solutionState {
  array: string,
  sum: string,
  solution: string
}

const initialState = {
  array: "[3, 34, 4, 12, 5, 2]",
  sum: "",
  solution: "[]"
} as solutionState

export const fetchSolution = createAsyncThunk(
  'solution',
  async ({array,sum} : solutionState) => {
    const request = await axios
    .post(`${url}/solve`, {
      array: array,
      sum: sum
    })
    return request.data;
  }
)

const solutionSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    updateFormData(state,action:PayloadAction<solutionState>){
      state = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchSolution.fulfilled, (state, action) => {
      state.solution = action.payload
    })
    builder.addCase(fetchSolution.rejected, (state, action) => {
      state.solution = "Error Fetching";
    })
  },
})

export const { updateFormData } = solutionSlice.actions
export default solutionSlice.reducer