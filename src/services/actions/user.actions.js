import { createAsyncThunk } from "@reduxjs/toolkit"

import { createVirtualCardRoute, fetchBlogsRoute, fetchReferralsRoute, fetchSafeHavenServiceCategoriesRoute, fetchSafeHavenServiceCategoryProductsRoute, fetchSafeHavenServicesRoute, fetchTransactionsRoute, funcViaUSDTRoute, generateQuoteRoute, getConverstionRateRoute, getNairaWalletDetails, getTransactionFeeRoute, getUserCardsRoute, iDverificationRoute, receiveWithCard, resetPasswordOtpRoute, resetPinOtpRoute, resetPinOtpVerification, resetTransactionPin, swapCurrencyRoute, userClaimReferralRoute, verifyAccountDetails, verifyPasswordOtpAndResetRoute } from '../routes/user.routes'
import { airtimeDataPurchaseRoute, bankTransferRoute, cableAndElectricitySubscriptionRoute, electricityDiscosRoute, fetchBanksListRoute, fetchCablePlansRoute, fetchDataBundlesRoute, fetchDollarWalletBalanceRoute, fetchNairaWalletBalanceRoute, schoolPaymentRoute, transferToSwapnPayUserRoute } from "../routes/user.routes"


export const userFetchDollarWalletBalance = createAsyncThunk(
    'user/userFetchDollarWalletBalance',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchDollarWalletBalanceRoute()

            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userFetchNairaWalletBalance = createAsyncThunk(
    'user/userFetchNairaWalletBalance',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchNairaWalletBalanceRoute()
            return data.data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userFetchTransactions = createAsyncThunk(
    'user/userFetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchTransactionsRoute()
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userTransferToSwapnPayUser = createAsyncThunk(
    'user/userTransferToSwapnPayUser',
    async ({ formData, toast, updateConfig }, { rejectWithValue }) => {
        try {
            const { data } = await transferToSwapnPayUserRoute(formData)

            toast.success('Transaction successful')
            updateConfig({ showDefault: true, showSendViaUsername: false, showConfirmTransferToSwapnPayUser: false })

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured during interwallet transfer')
            return rejectWithValue(null)
        }
    }
)


export const userFetchBanksList = createAsyncThunk(
    'user/userFetchBanksList',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchBanksListRoute()

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userFundViaUSDT = createAsyncThunk(
    'user/userFundViaUSDT',
    async ({ formData, toast, updateConfig }, { rejectWithValue }) => {
        try {
            const { data } = await funcViaUSDTRoute(formData)

            toast.success('Address generated')
            // updateConfig({ showReceiveViaCrypto: false, showUSDCInfo: false, showDefault: false })

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured')
            return rejectWithValue(null)
        }
    }
)

export const resetUsdtData = createAsyncThunk(
    'user/resetUsdtData',
    async ({ data }, { rejectWithValue }) => {
        try {
            console.log(data);
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)




export const userBankTransfer = createAsyncThunk(
    'user/userBankTransfer',
    async ({ formData, toast, updateConfig }, { rejectWithValue }) => {
        try {
            const { data } = await bankTransferRoute(formData)

            toast.success('Transaction successful')
            updateConfig({ showDefault: true, showSendViaBankTransfer: false, showConfirmSchoolPaymentTransaction: false })

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured during bank transfer')
            return rejectWithValue(null)
        }
    }
)


export const userGenerateSchoolPayment = createAsyncThunk(
    'user/userGenerateSchoolPayment',
    async ({ formData, toast, updateConfig }, { rejectWithValue }) => {
        try {
            const { data } = await schoolPaymentRoute(formData)

            toast.success('Transaction successful')
            updateConfig({ showDefault: true, showSendViaBankTransfer: false, showConfirmSchoolPaymentTransaction: false })


            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured during school payment')
            return rejectWithValue(null)
        }
    }
)


export const userFetchDataBundles = createAsyncThunk(
    'user/userFetchDataBundles',
    async ({ network }, { rejectWithValue }) => {
        try {
            const { data } = await fetchDataBundlesRoute(network)

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userAirtimePurchase = createAsyncThunk(
    'user/userAirtimePurchase',
    async ({ formData, toast, updateConfig }, { rejectWithValue }) => {
        try {
            const { data } = await airtimeDataPurchaseRoute(formData)

            toast.success('Airtime purchase successful')
            updateConfig({ showDefault: true, showConfirmTransaction: false })

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured during airtime purchase')
            return rejectWithValue(null)
        }
    }
)


export const userFetchUtilityServices = createAsyncThunk(
    'user/userFetchUtilityServices',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchSafeHavenServicesRoute()

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userFetchUtilityServiceCategories = createAsyncThunk(
    'user/userFetchUtilityServiceCategories',
    async ({ category }, { rejectWithValue }) => {
        try {
            const { data } = await fetchSafeHavenServiceCategoriesRoute(category)

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userFetchUtilityServiceCategoryProducts = createAsyncThunk(
    'user/userFetchUtilityServiceCategoryProducts',
    async ({ category }, { rejectWithValue }) => {
        try {
            const { data } = await fetchSafeHavenServiceCategoryProductsRoute(category)

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userDataPurchase = createAsyncThunk(
    'user/userDataPurchase',
    async ({ formData, toast, updateConfig }, { rejectWithValue }) => {
        try {
            const { data } = await airtimeDataPurchaseRoute(formData)

            toast.success('Data plan purchase successful')
            updateConfig({ showDefault: true, showConfirmTransaction: false })

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured during data purchase')
            return rejectWithValue(null)
        }
    }
)


export const userFetchCablePlans = createAsyncThunk(
    'user/userFetchCablePlans',
    async ({ cable }, { rejectWithValue }) => {
        try {
            const { data } = await fetchCablePlansRoute(cable)

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userGenerateCableSubscription = createAsyncThunk(
    'user/userGenerateCableSubscription',
    async ({ formData, toast, updateConfig }, { rejectWithValue }) => {
        try {
            const { data } = await cableAndElectricitySubscriptionRoute(formData)

            toast.success('Cable subscription successful')
            updateConfig({ showDefault: true, showConfirmTransaction: false })

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured during cable subscription')
            return rejectWithValue(null)
        }
    }
)


export const userFetchElectricityDiscos = createAsyncThunk(
    'user/userFetchElectricityDiscos',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await electricityDiscosRoute()

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userGenerateElectricitySubscription = createAsyncThunk(
    'user/userGenerateElectricitySubscription',
    async ({ formData, toast, updateConfig }, { rejectWithValue }) => {
        try {
            const { data } = await cableAndElectricitySubscriptionRoute(formData)

            toast.success('Electricity subscription successful')
            updateConfig({ showDefault: true, showConfirmTransaction: false })

            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured during electricity subscription')
            return rejectWithValue(null)
        }
    }
)



export const userFetchReferrals = createAsyncThunk(
    'user/userFetchReferrals',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchReferralsRoute()

            console.log(data)

            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)

export const userClaimRefferals = createAsyncThunk(
    'user/userClaimRefferals',
    async ({ formData, toast }, { rejectWithValue }) => {
        try {
            const { data } = await userClaimReferralRoute(formData)

            toast.success('Reward claimed successfully')
            window.location = '/dashboard'

            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const userResetStateProperty = createAsyncThunk(
    'user/userResetStateProperty',
    async ({ key, value = null }, { rejectWithValue }) => {
        try {
            return { key, value }
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)





export const getNairaWallet = createAsyncThunk(
    'user/getNairaWallet',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getNairaWalletDetails()

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)

export const fundAccountWithCard = createAsyncThunk(
    'user/fundAccountWithCard',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await receiveWithCard(formData)

            const link = data['data']['data']['link']
            window.location = link;

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)

export const resetPasswordOtpAction = createAsyncThunk(
    'user/resetPasswordOtpAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await resetPasswordOtpRoute(formData)

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const resetPinOtpAction = createAsyncThunk(
    'user/resetPinOtpAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await resetPinOtpRoute(formData)

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const resetPinOtpVerificationAction = createAsyncThunk(
    'user/resetPinOtpVerificationAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await resetPinOtpVerification(formData)

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const resetTransactionPinAction = createAsyncThunk(
    'user/resetTransactionPinAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await resetTransactionPin(formData)

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const verifyPasswordOtpAndResetAction = createAsyncThunk(
    'user/verifyPasswordOtpAndResetAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await verifyPasswordOtpAndResetRoute(formData)

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const iDverificationAction = createAsyncThunk(
    'user/iDverificationAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await iDverificationRoute(formData)

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const getConversionRateAction = createAsyncThunk(
    'user/getConversionRateAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getConverstionRateRoute()

            return data['data']
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const getTransactionsFeeAction = createAsyncThunk(
    'user/getTransactionsFeeAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getTransactionFeeRoute()

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)

export const generateQuoteAction = createAsyncThunk(
    'user/generateQuoteAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await generateQuoteRoute(formData)

            return data['data']
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const swapCurrencyAction = createAsyncThunk(
    'user/swapCurrencyAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await swapCurrencyRoute(formData)

            return data['data']
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)



export const createVirtualCardAction = createAsyncThunk(
    'user/createVirtualCardAction',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const { data } = await createVirtualCardRoute(formData)

            return data['data']
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)

export const getUserCardsAction = createAsyncThunk(
    'user/getUserCardsAction',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getUserCardsRoute()

            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)

export const userFetchBlogItems = createAsyncThunk(
    'user/userFetchBlogItems',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchBlogsRoute()

            return data.data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)

export const bankDetailsVerifications = createAsyncThunk(
    'user/bankDetailsVerifications',
    async ({ formData }, { rejectWithValue }) => {
        try {
            console.log(formData);
            const { data } = await verifyAccountDetails(formData)
            console.log(data)

            return data.data
        } catch (error) {
            console.log(error)
            toast.warning('An error occured')
            return rejectWithValue(null)
        }
    }
)