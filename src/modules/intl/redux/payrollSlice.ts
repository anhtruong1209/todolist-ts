import { createSlice } from "@reduxjs/toolkit"
import { TTTypePayroll } from "../../../models/auth"

const initState: TTTypePayroll = {
  payrollList: [],
}

const payrollSlice = createSlice({
  name: "payroll",
  initialState: initState,
  reducers: {
    setPayrollList: (state, action) => {
      state.payrollList = action.payload || []
    },
    addPayroll: (state, action) => {
      state.payrollList.unshift(action.payload)
      localStorage.setItem("payroll", JSON.stringify(state.payrollList))
    },
    deletePayroll: (state, action) => {
      localStorage.getItem("payroll")
      state.payrollList = state.payrollList.filter((item: any) => item.invoice !== action.payload)
      localStorage.setItem("payroll", JSON.stringify(state.payrollList))
    },
  },
})
export const { addPayroll, deletePayroll, setPayrollList } = payrollSlice.actions
export default payrollSlice.reducer
