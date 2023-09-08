import { createAsyncThunk } from "@reduxjs/toolkit"
import { addBlogItemRoute, creditCryptoFundedUserRoute, deleteBlogItemRoute, fetchBlogItemsRoute, fetchDashboardInfoRoute, fetchInternationalTransfersRoute, fetchUnverifiedUsersRoute, fetchUsersRoute, flutterwaveBalanceRoute, getAllCryptoDepositRoute, getCardDepositsRoute, getFailedTransactionRoute, getFincraBalanceRoute, getReferralFeeRoute, getSchoolFeesPaymentRoute, getSudoBalanceRoute, getTranasactionsFeeRoute, getTransactionsRoutes, getUserCountRoutes, getUserTransactionsRoute, patchCardDepositsRoute, patchFailedTransactionRoute, patchReferralFeeRoute, patchTransacationsFeeRoute, patchUsersRoute, updateBlogItemRoute, updateInternationalTransfersRoute, updateSchoolFeesStatusRoute, verifyUserAccountRoute } from "../routes/admin.routes"



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

export const adminFetchDashboardInfo = createAsyncThunk(
    'admin/adminFetchDashboardInfo',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchDashboardInfoRoute()

            console.log(data)

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
    async ({ formData, toast, updateModals }, { rejectWithValue }) => {
        try {
            const { data } = await patchReferralFeeRoute(formData)
            toast.success('Referral fee updated successfully')
            updateModals({ showAdminUpdateReferralFeeModal: false })
            return data
        } catch (error) {
            toast.warning('Referral fee failed to update')
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const getSchoolFeesPaymentAction = createAsyncThunk(
    'admin/getSchoolFeesPaymentAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getSchoolFeesPaymentRoute()
            return data['data']
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const adminFetchUnverifiedUsersAction = createAsyncThunk(
    'admin/adminFetchUnverifiedUsersAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchUnverifiedUsersRoute()

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const adminVerifyUserAccountAction = createAsyncThunk(
    'admin/adminVerifyUserAccountAction',
    async ({ formData, toast }, { rejectWithValue }) => {
        try {
            const { data } = await verifyUserAccountRoute(formData)

            console.log(data)
            if (formData['status'] == 'approved') {

                toast.success('Account verification successful.')
            } else {
                toast.success('Verification Rejected.')
            }

            return formData.profile_pkid
        } catch (error) {
            console.log(error)
            toast.warning('An error occured while verifying account.')
            return rejectWithValue(null)
        }
    }
)


export const updateSchoolFeesStatusAction = createAsyncThunk(
    'admin/updateSchoolFeesStatusAction',
    async ({ formData, toast }, { rejectWithValue }) => {
        try {
            const { data } = await updateSchoolFeesStatusRoute(formData)


            if (formData['status'] == 'APPROVED') {

                toast.success('Payment approved successful.')
            } else {
                toast.success('Payment was rejected Successfully')
            }

            return data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured reject payment')
            return rejectWithValue(null)
        }
    }
)



export const getSudoBalanceAction = createAsyncThunk(
    'admin/getSudoBalanceAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getSudoBalanceRoute()



            return data.data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)

export const getFincraBalanceAction = createAsyncThunk(
    'admin/getFincraBalanceAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getFincraBalanceRoute()



            return data['data']
        } catch (error) {
            // console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const flutterWaveBalanceAction = createAsyncThunk(
    'admin/flutterWaveBalanceAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await flutterwaveBalanceRoute()



            return data['data']
        } catch (error) {
            // console.log(error)
            return rejectWithValue(null)
        }
    }
)

export const getCardDepositsActions = createAsyncThunk(
    'admin/getCardDepositsActions',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getCardDepositsRoute()



            return data
        } catch (error) {

            return rejectWithValue(null)
        }
    }
)


export const patchCardDepositAction = createAsyncThunk(
    'admin/patchCardDepositAction',
    async ({ formData, toast }, { rejectWithValue }) => {
        try {
            const { data } = await patchCardDepositsRoute({ formData })
            toast.success("User credited successfully")



            return data
        } catch (error) {
            console.log(error);
            toast.warning("User wasn't credited")
            return rejectWithValue(null)
        }
    }
)

export const creditCryptoFundedUser = createAsyncThunk(
    'admin/creditCryptoFundedUser',
    async ({ formData, toast }, { rejectWithValue }) => {
        try {
    
            const { data } = await creditCryptoFundedUserRoute(formData)
            toast.success("User credited successfully")



            return data
        } catch (error) {

            toast.warning("User wasn't credited")
            return rejectWithValue(null)
        }
    }
)


export const getFailedTransactionAction = createAsyncThunk(
    'admin/getFailedTransactionAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getFailedTransactionRoute()
            return data
        } catch (error) {

            return rejectWithValue(null)
        }
    }
)


export const patchFailedTransactionAction = createAsyncThunk(
    'admin/patchFailedTransactionAction',
    async ({ formData, toast }, { rejectWithValue }) => {

        try {
            const { data } = await patchFailedTransactionRoute({ formData })

            toast.success("User debited successfully")

            return data
        } catch (error) {

            toast.warning("User wasn't debited")
            return rejectWithValue(null)
        }
    }
)



export const schoolFeesDetails = createAsyncThunk(
    'admin/schoolFeesDetails',
    async ({ data }, { rejectWithValue }) => {
        try {

            return data
        } catch (error) {

            return rejectWithValue(null)
        }
    }
)


export const fetchUsersActions = createAsyncThunk(
    'admin/fetchUsersActions',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchUsersRoute()
            return data.data
        } catch (error) {

            return rejectWithValue(null)
        }
    }
)

export const patchUserAction = createAsyncThunk(
    'admin/patchUserAction',
    async ({ formData, toast }, { rejectWithValue }) => {

        try {
            const { data } = await patchUsersRoute({ formData })
            if (formData['status'] == "deactivate") {

                toast.success("User deactivated successfully")
            }
            if (formData['status'] == "activate") {
                toast.success("User successfully activated")
            }

            if (formData['status'] == "admin") {
                toast.success("User successfully made an admin")
            }
            if (formData['status'] == "unadmin") {
                toast.success("User successfully removed from admin")
            }



            return data
        } catch (error) {
            console.log(error);
            toast.warning("Process failed")
            return rejectWithValue(null)
        }
    }
)

export const getUsersTransactionsAction = createAsyncThunk(
    'admin/getUsersTransactionsAction',
    async ({ formData }, { rejectWithValue }) => {

        try {
            const { data } = await getUserTransactionsRoute({ formData })

            return data.data
        } catch (error) {
            console.log(error);
            toast.warning("Process failed")
            return rejectWithValue(null)
        }
    }
)

export const fetchInternationalTransactionAction = createAsyncThunk(
    'admin/fetchInternationalTransactionAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchInternationalTransfersRoute()
            return data.data
        } catch (error) {

            return rejectWithValue(null)
        }
    }
)


export const adminFetchBlogItems = createAsyncThunk(
    'admin/adminFetchBlogItems',
    async (_, { rejectWithValue }) => {

        try {
            const { data } = await fetchBlogItemsRoute()

            return data.data
        } catch (error) {
            console.log(error);
            return rejectWithValue(null)
        }
    }
)


export const adminAddBlogItem = createAsyncThunk(
    'admin/adminAddBlogItem',
    async ({ formData, toast, updateModals }, { rejectWithValue }) => {

        try {
            const { data } = await addBlogItemRoute(formData)

            toast.success('Blog item added successfully')

            updateModals({ showAdminAddBlogModal: false })

            return data.data
        } catch (error) {
            console.log(error);
            toast.warning("An error occurred while adding blog item.")
            return rejectWithValue(null)
        }
    }
)


export const adminUpdateBlogItem = createAsyncThunk(
    'admin/adminUpdateBlogItem',
    async ({ formData, toast, updateModals }, { rejectWithValue }) => {

        try {
            const { data } = await updateBlogItemRoute(formData)

            toast.success('Blog item updated successfully')

            updateModals({ showAdminUpdateBlogItemModal: false })

            return data.data
        } catch (error) {
            console.log(error);
            toast.warning("An error occurred while updating blog item.")
            return rejectWithValue(null)
        }
    }
)


export const adminDeleteBlogItem = createAsyncThunk(
    'admin/adminDeleteBlogItem',
    async ({ formData, toast, updateModals }, { rejectWithValue }) => {

        try {
            await deleteBlogItemRoute(formData)

            toast.success('Blog item deleted successfully')

            updateModals({ showAdminDeleteBlogItemModal: false })

            return formData.pkid
        } catch (error) {
            console.log(error);
            toast.warning("An error occurred while deleting blog item.")
            return rejectWithValue(null)
        }
    }
)

export const updateInternatonalTransferAction = createAsyncThunk(
    'admin/updateInternatonalTransferAction',
    async ({ formData, toast }, { rejectWithValue }) => {

        try {
            const { data } = await updateInternationalTransfersRoute({ formData })
            if (formData['status'] == "approved") {
                toast.success("Payment was successful")
            }
            if (formData['status'] != "approved") {
                toast.success("Payment was rejected succesfully")
            }

            return data.data
        } catch (error) {
            console.log(error);
            toast.warning("Process failed")
            return rejectWithValue(null)
        }
    }
)

export const getCryptoDeposits = createAsyncThunk(
    'admin/getCryptoDeposits',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getAllCryptoDepositRoute()
            console.log(data)
            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)