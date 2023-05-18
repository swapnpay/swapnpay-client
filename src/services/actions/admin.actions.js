import { createAsyncThunk } from "@reduxjs/toolkit"
import { getReferralFeeRoute, getTranasactionsFeeRoute, getTransactionsRoutes, getUserCountRoutes, patchReferralFeeRoute, patchTransacationsFeeRoute } from "../routes/admin.routes"


let USERFROMLS = localStorage.getItem('swapnpay-user') ? JSON.parse(localStorage.getItem('swapnpay-user')) : null




export const adminResetStateProperty = createAsyncThunk(
    'admin/adminResetStateProperty',
    async ({ key, value = null }, { rejectWithValue }) => {
        try {
            return { key, value }
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)

export const getUserCountAction = createAsyncThunk(
    'admin/getUserCountAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getUserCountRoutes()
            return data['data']
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)

export const getTransactionsAction = createAsyncThunk(
    'admin/getTransactionsAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getTransactionsRoutes()
            return data['data']
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)

export const getTransactionsFeeAction = createAsyncThunk(
    'admin/getTransactionsFeeAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getTranasactionsFeeRoute()
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)

export const patchTransactionsFeeAction = createAsyncThunk(
    'admin/patchTransactionsFeeAction',
    async ({ formData, toast, updateModals }, { rejectWithValue }) => {
        try {

            const { data } = await patchTransacationsFeeRoute(formData)
            toast.success('Transaction fee updated successfully')
            updateModals({ showAdminUpdateTransactionFeeModal: false })

            return data
        } catch (error) {
            toast.warning('Transaction fee failed to update')
            console.log(error)
            return rejectWithValue(null)
        }
    }
)
export const getReferralFeeAction = createAsyncThunk(
    'admin/getReferralFeeAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getReferralFeeRoute()
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)

export const patchReferralFeeAction = createAsyncThunk(
    'admin/patchReferralFeeAction',
    async ({ formData, toast }, { rejectWithValue }) => {
        try {
            const { data } = await patchReferralFeeRoute(formData)
            toast.sucess('Referral fee updated successfully')
            return data
        } catch (error) {
            toast.warning('Referral fee failed to update')
            console.log(error)
            return rejectWithValue(null)
        }
    }
)