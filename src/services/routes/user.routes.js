import { API } from "../config"


export const fetchDollarWalletBalanceRoute = () => API.get(`/wallets/get-dollar-wallet`)


export const fetchNairaWalletBalanceRoute = () => API.get(`/wallets/naira-balance`)


export const fetchTransactionsRoute = () => API.get(`/transactions/user-transactions`)


export const transferToSwapnPayUserRoute = (formData) => API.post(`/transactions/interwallet-transfer`, formData)


export const fetchBanksListRoute = () => API.get(`/transactions/bank-list`)


export const bankTransferRoute = (formData) => API.post(`/transactions/bank-withdrawal`, formData)


export const funcViaUSDTRoute = (formData) => API.post(`/transactions/crypto-payment-initialization`, formData)


export const schoolPaymentRoute = (formData) => API.post(`/administrator/pay-school-fees`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })


export const fetchDataBundlesRoute = (network) => API.get(`/utilities/data-bundles/${network}`)


export const airtimeDataPurchaseRoute = (formData) => API.post(`/utilities/airtime-data-purchase`, formData)


export const fetchCablePlansRoute = (cable) => API.get(`/utilities/cable-plans/${cable}`)


export const fetchSafeHavenServicesRoute = () => API.get(`/utilities/safehaven-services`)


export const fetchSafeHavenServiceCategoriesRoute = (category) => API.get(`/utilities/service-categories/${category}`)


export const fetchSafeHavenServiceCategoryProductsRoute = (category) => API.get(`/utilities/category-products/${category}`)


export const cableAndElectricitySubscriptionRoute = (formData) => API.post(`/utilities/electricity-cable`, formData)


export const electricityDiscosRoute = () => API.get(`/utilities/electricity-plans/aedc`)


export const fetchReferralsRoute = () => API.get(`/user/referral`)

export const userClaimReferralRoute = (formData) => API.post(`/user/referral`, formData)





export const getNairaWalletDetails = () => API.get('/wallets/get-naira-wallet')


export const receiveWithCard = (formData) => API.post('/transactions/flutterwave-card-charge', formData)


export const resetPasswordOtpRoute = (formData) => API.post('/user/forgot-password-otp', formData)


export const resetPinOtpRoute = (formData) => API.post('/user/receive-pin-reset-code', formData)


export const resetPinOtpVerification = (formData) => API.post('/user/pin-reset-verification', formData)


export const resetTransactionPin = (formData) => API.patch('/user/reset-transaction-pin', formData)


export const verifyPasswordOtpAndResetRoute = (formData) => API.post('/user/', formData)


export const iDverificationRoute = (formData) => API.put('/profiles/profile', formData, { headers: { "Content-Type": "multipart/form-data" } })


export const getConverstionRateRoute = () => API.get('/transactions/conversion-rate')


export const getTransactionFeeRoute = () => API.get('/administrator/transactions-fee')


export const generateQuoteRoute = (formData) => API.post('/transactions/generate-quote', formData)


export const swapCurrencyRoute = (formData) => API.post('/transactions/swap-currency', formData)


export const createVirtualCardRoute = (formData) => API.post('/cards/create-virtual-card', formData)


export const getUserCardsRoute = () => API.get('/cards/get-user-cards')


export const fetchBlogsRoute = () => API.get('/administrator/blogs/fetch-all')

export const verifyAccountDetails = (formData) => API.post('/transactions/bank-details-verification', formData)





