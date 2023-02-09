import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import url from "../config";
import { RootState } from '.';
import { loadState } from './localStorage';

export interface reportState {
    reports: [{ id: string, reportDate: string, userId: string, reportId: string }],
    allreportsmsg: "Error Fetching" | "Success";
    last7days: string[],
    tableformattedReport : {[key : string] : {[key:string] : {blogCount : number}}}
}


const persistedState = loadState();
const initialState = persistedState == undefined || persistedState.reportReducer == undefined ? {
    reports: [{}],
    tableformattedReport:{},
    last7days:[""]
} as reportState : persistedState.reportReducer as reportState;

export const allReportByDay = createAsyncThunk(
    'allReportByDay',
    async (date: string, { getState }) => {
        const state: RootState = getState() as RootState;
        const filter = {
            "where": {
                "reportDate": date
            }
        }
        const request = await axios
            .get(`${url}/reports`, { params: { filter }, headers: { 'Authorization': 'Bearer ' + state.authReducer.token } })
        return request.data;
    });

export const latestReports = createAsyncThunk(
    'latestReport',
    async (arg, { getState }) => {
        const state: RootState = getState() as RootState;

        const goBackDays = 7;        
        const today = new Date();
        const daysSorted = [];
        const queryDays = [];
        
        for (var i = 0; i < goBackDays; i++) {
            let newDate = new Date(today.setDate(today.getDate() - i));
            const datestring = new Date(newDate.toLocaleDateString("en-US")).toISOString();
            queryDays.push({"reportDate" : datestring});
            daysSorted.push(datestring);
        }
        const filter = {
            "where": {
                "or": queryDays
            }
        }

        const request = await axios
            .get(`${url}/reports`, { params: { filter }, headers: { 'Authorization': 'Bearer ' + state.authReducer.token } })
        return {data : request.data, days : daysSorted};
    });


const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        updateFormData(state, action: PayloadAction<reportState>) {
            state = action.payload
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(allReportByDay.fulfilled, (state, action) => {
            state.reports = action.payload;
            state.allreportsmsg = "Success";
            return state;
        })
        builder.addCase(allReportByDay.rejected, (state, action) => {
            state.allreportsmsg = "Error Fetching";
            return state;
        })
        builder.addCase(latestReports.fulfilled, (state, action) => {
            state.reports = action.payload.data;
            state.last7days =  action.payload.days;
            const tableformattedReport:{[key : string] : {[key:string] : {blogCount : number}}} = {};
            state.reports.forEach(i => {
                if(i.userId in tableformattedReport){
                    tableformattedReport[i.userId][i.reportDate].blogCount += 1;
                } else {
                    interface report {[key:string] : {blogCount : number}}
                    const reportDateObj:report = {}

                    state.last7days.forEach(j => (reportDateObj[j] = {blogCount : 0}))
                    tableformattedReport[i.userId] = reportDateObj
                    
                    tableformattedReport[i.userId][i.reportDate].blogCount += 1;
                }
            });
            state.tableformattedReport = tableformattedReport;
            console.log(Object.keys(state.tableformattedReport).map(i => ({ "userId": i, ...state.tableformattedReport[i] })))
            state.allreportsmsg = "Success";
            return state;
        })
        builder.addCase(latestReports.rejected, (state, action) => {
            state.allreportsmsg = "Error Fetching";
            return state;
        })
    },
})

export const { updateFormData } = reportSlice.actions
export default reportSlice.reducer