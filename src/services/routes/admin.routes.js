import { API } from '../config'


export const getUserCountRoutes = () => API.get('/administrator/users-count')

export const getTransactionsRoutes = () => API.get('/administrator/transactions')

export const getReferralFeeRoute = () => API.get('/administrator/referral-fee')

export const patchReferralFeeRoute = (formData) => API.patch('/administrator/referral-fee', formData,)

export const getTranasactionsFeeRoute = () => API.get('/administrator/transactions-fee')

export const patchTransacationsFeeRoute = (formData) => API.patch('/administrator/transactions-fee', formData)

export const getSchoolFeesPaymentRoute = () => API.get('/administrator/pay-school-fees')

export const fetchUnverifiedUsersRoute = () => API.get('/administrator/unverified-users/fetch-all')

export const verifyUserAccountRoute = (formData) => API.patch('/administrator/verify-user', formData)

export const updateSchoolFeesStatusRoute = (formData) => API.patch('/administrator/school-fees-status', formData)

export const getFincraBalanceRoute = () => API.get('/administrator/fincra-balance')

export const getSudoBalanceRoute = () => API.get('/administrator/sudo-balance')

export const flutterwaveBalanceRoute = () => API.get('/administrator/flutterwave-balance')

export const getCardDepositsRoute = () => API.get('/administrator/card-deposits')

export const patchCardDepositsRoute = (formData) => API.patch('/administrator/card-deposits', formData)

export const getFailedTransactionRoute = () => API.get('/administrator/failed-transactions')

export const patchFailedTransactionRoute = (formData) => API.patch('/administrator/failed-transactions', formData)


export const fetchDashboardInfoRoute = () => API.get('/administrator/dashboard/fetch-info')

export const fetchUsersRoute = () => API.get('/administrator/admin-manage-users')

export const patchUsersRoute = (formData) => API.patch('/administrator/admin-manage-users', formData)

export const getUserTransactionsRoute = (formData) => API.post('/administrator/admin-manage-users', formData)

export const fetchInternationalTransfersRoute = () => API.get('/transactions/international-transfer')

export const updateInternationalTransfersRoute = (formData) => API.patch('/transactions/international-transfer', formData)

export const fetchBlogItemsRoute = () => API.get('/administrator/admin-blog')

export const addBlogItemRoute = (formData) => API.post('/administrator/admin-blog', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const updateBlogItemRoute = (formData) => API.patch('/administrator/admin-blog', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const deleteBlogItemRoute = (formData) => API.delete(`/administrator/admin-blog/${formData.pkid}`)

export const getAllCryptoDepositRoute = () => API.get('/administrator/crypto-deposit')
export const creditCryptoFundedUserRoute = (formData) => API.patch('/administrator/crypto-deposit', formData)





