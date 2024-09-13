import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    jobList: [],
  },
  reducers: {
    updateJobList: (state, action) => {
      console.log('action.payload', action.payload)
      let tempObj = {
        title: 'Job_'+Math.random().toFixed(5),
        images: action.payload
      }
      let tempState =  [...state.jobList , tempObj]
      state.jobList = tempState;
    },
  },
});

export const { updateJobList } = appSlice.actions;

export const selectJobList = (state: any) => state.app.jobList;
export default appSlice.reducer;