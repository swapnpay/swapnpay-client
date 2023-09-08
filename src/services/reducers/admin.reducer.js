import { createSlice } from '@reduxjs/toolkit'
import { adminAddBlogItem, adminDeleteBlogItem, adminFetchBlogItems, adminFetchDashboardInfo, adminFetchUnverifiedUsersAction, adminResetStateProperty, adminUpdateBlogItem, adminVerifyUserAccountAction, creditCryptoFundedUser, fetchInternationalTransactionAction, fetchUsersActions, flutterWaveBalanceAction, getCardDepositsActions, getCryptoDeposits, getFailedTransactionAction, getFincraBalanceAction, getReferralFeeAction, getSchoolFeesPaymentAction, getSudoBalanceAction, getTransactionsAction, getTransactionsFeeAction, getUserCountAction, getUsersTransactionsAction, patchCardDepositAction, patchFailedTransactionAction, patchReferralFeeAction, patchTransactionsFeeAction, patchUserAction, schoolFeesDetails, updateInternatonalTransferAction, updateSchoolFeesStatusAction } from '../actions/admin.actions'


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        blogItems: null,
        dashboardInfo: null,
        currentData: null,
        adminRequestStatus: null,
        adminRequestLoading: false,
        users_count: null,
        transactions: null,
        referral_fee: null,
        transactions_fee: null,
        school_fees: null,
        schoolFees_Details: null,
        unverifiedUsers: null,
        fincra_balance: null,
        sudo_balance: null,
        flutterwave_balance: null,
        card_deposits: null,
        failed_transactions: null,
        manage_users: null,
        user_transactions: null,
        crypto_deposits: null,
        international_transactions: null
    },
    extraReducers: (builder) => {
        builder.addCase(adminFetchDashboardInfo.pending, (state, action) => {
            state.users_count = null
        })
        builder.addCase(adminFetchDashboardInfo.fulfilled, (state, action) => {
            state.dashboardInfo = action.payload
        })
        builder.addCase(adminFetchDashboardInfo.rejected, (state, action) => {
            state.users_count = null
        })

        builder.addCase(getUserCountAction.pending, (state, action) => {
            state.users_count = null
        })
        builder.addCase(getUserCountAction.fulfilled, (state, action) => {
            state.users_count = action.payload
            // if (action.payload.key === 'CurrentData') {
            //     state.currentData = action.payload.value
            // }
        })
        builder.addCase(getUserCountAction.rejected, (state, action) => {
            state.users_count = null
        })

        builder.addCase(getTransactionsAction.pending, (state, action) => {
            state.transactions = null
        })
        builder.addCase(getTransactionsAction.fulfilled, (state, action) => {
            state.transactions = action.payload

        })
        builder.addCase(getTransactionsAction.rejected, (state, action) => {
            state.transactions = null
        })

        builder.addCase(getTransactionsFeeAction.pending, (state, action) => {
            state.transactions_fee = null
        })
        builder.addCase(getTransactionsFeeAction.fulfilled, (state, action) => {
            state.transactions_fee = action.payload

        })

        builder.addCase(getTransactionsFeeAction.rejected, (state, action) => {
            state.transactions_fee = null
        })



        builder.addCase(patchTransactionsFeeAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(patchTransactionsFeeAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.transactions_fee = action.payload

        })

        builder.addCase(patchTransactionsFeeAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })




        builder.addCase(getReferralFeeAction.pending, (state, action) => {
            state.referral_fee = null
        })
        builder.addCase(getReferralFeeAction.fulfilled, (state, action) => {
            state.referral_fee = action.payload

        })
        builder.addCase(getReferralFeeAction.rejected, (state, action) => {
            state.referral_fee = null
        })



        builder.addCase(patchReferralFeeAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(patchReferralFeeAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.referral_fee = action.payload

        })
        builder.addCase(patchReferralFeeAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })

        builder.addCase(getSchoolFeesPaymentAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(getSchoolFeesPaymentAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.school_fees = action.payload

        })
        builder.addCase(getSchoolFeesPaymentAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })


        builder.addCase(schoolFeesDetails.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(schoolFeesDetails.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.schoolFees_Details = action.payload

        })
        builder.addCase(schoolFeesDetails.rejected, (state, action) => {
            state.adminRequestLoading = false
        })


        builder.addCase(adminFetchUnverifiedUsersAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(adminFetchUnverifiedUsersAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.unverifiedUsers = action.payload

        })
        builder.addCase(adminFetchUnverifiedUsersAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })

        builder.addCase(adminVerifyUserAccountAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(adminVerifyUserAccountAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.unverifiedUsers = state.unverifiedUsers.filter(user => user.pkid !== action.payload)

        })
        builder.addCase(adminVerifyUserAccountAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })


        builder.addCase(updateSchoolFeesStatusAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(updateSchoolFeesStatusAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            // state.unverifiedUsers = state.unverifiedUsers.filter(user => user.pkid !== action.payload)

        })
        builder.addCase(updateSchoolFeesStatusAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })

        //
        builder.addCase(getFincraBalanceAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(getFincraBalanceAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.fincra_balance = action.payload

        })
        builder.addCase(getFincraBalanceAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //

        //
        builder.addCase(getSudoBalanceAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(getSudoBalanceAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.sudo_balance = action.payload

        })
        builder.addCase(getSudoBalanceAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //

        //
        builder.addCase(flutterWaveBalanceAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(flutterWaveBalanceAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.flutterwave_balance = action.payload

        })
        builder.addCase(flutterWaveBalanceAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //

        //
        builder.addCase(getCardDepositsActions.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(getCardDepositsActions.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.card_deposits = action.payload

        })
        builder.addCase(getCardDepositsActions.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //
        builder.addCase(patchCardDepositAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(patchCardDepositAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            // state.card_deposits = action.payload

        })
        builder.addCase(patchCardDepositAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //
        //
        builder.addCase(getFailedTransactionAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(getFailedTransactionAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.failed_transactions = action.payload

        })
        builder.addCase(getFailedTransactionAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //

        //
        builder.addCase(patchFailedTransactionAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(patchFailedTransactionAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            // state.failed_transactions = action.payload

        })
        builder.addCase(patchFailedTransactionAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //
        //
        builder.addCase(fetchUsersActions.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(fetchUsersActions.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.manage_users = action.payload

        })
        builder.addCase(fetchUsersActions.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //

        //
        builder.addCase(patchUserAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(patchUserAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false

        })
        builder.addCase(patchUserAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //

        //
        builder.addCase(getUsersTransactionsAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(getUsersTransactionsAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.user_transactions = action.payload

        })
        builder.addCase(getUsersTransactionsAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //

        //
        builder.addCase(updateInternatonalTransferAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(updateInternatonalTransferAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false


        })
        builder.addCase(updateInternatonalTransferAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
        //

        //
        builder.addCase(fetchInternationalTransactionAction.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(fetchInternationalTransactionAction.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.international_transactions = action.payload

        })
        builder.addCase(fetchInternationalTransactionAction.rejected, (state, action) => {
            state.adminRequestLoading = false
        })



        builder.addCase(adminFetchBlogItems.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(adminFetchBlogItems.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.blogItems = action.payload

        })
        builder.addCase(adminFetchBlogItems.rejected, (state, action) => {
            state.adminRequestLoading = false
        })

        builder.addCase(adminAddBlogItem.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(adminAddBlogItem.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.blogItems = [action.payload, ...state.blogItems]

        })
        builder.addCase(adminAddBlogItem.rejected, (state, action) => {
            state.adminRequestLoading = false
        })

        builder.addCase(adminUpdateBlogItem.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(adminUpdateBlogItem.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            const index = state.blogItems.findIndex(blog => blog.pkid === action.payload.pkid)
            state.blogItems[index] = action.payload
        })
        builder.addCase(adminUpdateBlogItem.rejected, (state, action) => {
            state.adminRequestLoading = false
        })

        builder.addCase(adminDeleteBlogItem.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(adminDeleteBlogItem.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.blogItems = state.blogItems.filter(blog => blog.pkid !== action.payload)
        })
        builder.addCase(adminDeleteBlogItem.rejected, (state, action) => {
            state.adminRequestLoading = false
        })



        builder.addCase(adminResetStateProperty.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(adminResetStateProperty.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            if (action.payload.key === 'CurrentData') {
                state.currentData = action.payload.value
            }
        })
        builder.addCase(adminResetStateProperty.rejected, (state, action) => {
            state.adminRequestLoading = false
        })


        builder.addCase(getCryptoDeposits.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(getCryptoDeposits.fulfilled, (state, action) => {
            state.adminRequestLoading = false
            state.crypto_deposits = action.payload
        })
        builder.addCase(getCryptoDeposits.rejected, (state, action) => {
            state.adminRequestLoading = false
        })

        builder.addCase(creditCryptoFundedUser.pending, (state, action) => {
            state.adminRequestLoading = true
        })
        builder.addCase(creditCryptoFundedUser.fulfilled, (state, action) => {
            state.adminRequestLoading = false

        })
        builder.addCase(creditCryptoFundedUser.rejected, (state, action) => {
            state.adminRequestLoading = false
        })
    }
})


export default adminSlice.reducer;