import { createSlice } from '@reduxjs/toolkit'

import {
    userAirtimePurchase, userBankTransfer, userDataPurchase, userFetchBanksList, userFetchCablePlans,
    userFetchDataBundles, userFetchDollarWalletBalance, userFetchNairaWalletBalance, userGenerateSchoolPayment,
    userGenerateCableSubscription, userResetStateProperty, userTransferToSwapnPayUser, userFetchElectricityDiscos,
    userGenerateElectricitySubscription,
    getNairaWallet, resetPasswordOtpAction, resetPinOtpAction, resetTransactionPinAction, verifyPasswordOtpAndResetAction, iDverificationAction, userFetchTransactions, getConversionRateAction, getTransactionsFeeAction,
    generateQuoteAction, swapCurrencyAction, createVirtualCardAction, getUserCardsAction, userFetchReferrals, userClaimRefferals, fundAccountWithCard, userFetchBlogItems, userFundViaUSDT, resetUsdtData, bankDetailsVerifications
} from '../actions/user.actions'


const userSlice = createSlice({
    name: 'user',
    initialState: {
        blog: null,
        blogItems: null,
        banksList: null,
        cablePlans: null,
        dataBundles: null,
        electricityDiscos: null,
        nairaWallet: null,
        dollarWallet: null,
        newTransaction: null,
        stateValue: null,
        userRequestStatus: null,
        userRequestLoading: false,
        naira_wallet_details: null,
        transactions: null,
        resetPasswordOtpRequestLoading: null,
        resetPinOtpRequestLoading: null,
        resetTransactionPinLoading: null,
        verifyPasswordOtpAndResetLoading: null,
        idVerificationLoading: null,
        conversionRate: null,
        customLoadingState: false,
        transactionsFee: null,
        generatedQuote: null,
        userCards: null,
        usdtData:null,
        referrals: null,
        verified_account: null

    },
    extraReducers: (builder) => {
        builder.addCase(userFetchBlogItems.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchBlogItems.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.blogItems = action.payload
        })
        builder.addCase(userFetchBlogItems.rejected, (state, action) => {
            state.userRequestLoading = false
        })

        builder.addCase(userFetchDollarWalletBalance.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchDollarWalletBalance.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.dollarWallet = action.payload
        })
        builder.addCase(userFetchDollarWalletBalance.rejected, (state, action) => {
            state.userRequestLoading = false
        })

        builder.addCase(userFetchNairaWalletBalance.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchNairaWalletBalance.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.nairaWallet = action.payload
        })
        builder.addCase(userFetchNairaWalletBalance.rejected, (state, action) => {
            state.userRequestLoading = false
        })

        builder.addCase(userFetchTransactions.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchTransactions.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.transactions = action.payload
        })
        builder.addCase(userFetchTransactions.rejected, (state, action) => {
            state.userRequestLoading = false
        })



        builder.addCase(userTransferToSwapnPayUser.pending, (state, action) => {
            state.userRequestLoading = true
            state.userRequestStatus = 'PENDING'
        })
        builder.addCase(userTransferToSwapnPayUser.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'SUCCESS'
            state.newTransaction = action.payload
        })
        builder.addCase(userTransferToSwapnPayUser.rejected, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'FAILED'
        })

        builder.addCase(userFetchBanksList.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchBanksList.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.banksList = action.payload
        })
        builder.addCase(userFetchBanksList.rejected, (state, action) => {
            state.userRequestLoading = false
        })

        builder.addCase(userFundViaUSDT.pending, (state, action) => {
            state.userRequestLoading = true
            state.userRequestStatus = 'PENDING'
        })
        builder.addCase(userFundViaUSDT.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.usdtData = action.payload
            state.userRequestStatus = 'SUCCESS'
        })
        builder.addCase(userFundViaUSDT.rejected, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'FAILED'
        })

        builder.addCase(userBankTransfer.pending, (state, action) => {
            state.userRequestLoading = true
            state.userRequestStatus = 'PENDING'
        })
        builder.addCase(userBankTransfer.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'SUCCESS'
            state.newTransaction = action.payload
        })
        builder.addCase(userBankTransfer.rejected, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'FAILED'
        })

        builder.addCase(userGenerateSchoolPayment.pending, (state, action) => {
            state.userRequestLoading = true
            state.userRequestStatus = 'PENDING'
        })
        builder.addCase(userGenerateSchoolPayment.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'SUCCESS'
            state.newTransaction = action.payload
        })
        builder.addCase(userGenerateSchoolPayment.rejected, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'FAILED'
        })



        builder.addCase(userFetchDataBundles.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchDataBundles.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.dataBundles = action.payload
        })
        builder.addCase(userFetchDataBundles.rejected, (state, action) => {
            state.userRequestLoading = false
        })

        builder.addCase(userAirtimePurchase.pending, (state, action) => {
            state.userRequestLoading = true
            state.userRequestStatus = 'PENDING'
        })
        builder.addCase(userAirtimePurchase.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'SUCCESS'
            state.newTransaction = action.payload
        })
        builder.addCase(userAirtimePurchase.rejected, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'FAILED'
        })

        builder.addCase(userDataPurchase.pending, (state, action) => {
            state.userRequestLoading = true
            state.userRequestStatus = 'PENDING'
        })
        builder.addCase(userDataPurchase.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'SUCCESS'
            state.newTransaction = action.payload
        })
        builder.addCase(userDataPurchase.rejected, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'FAILED'
        })



        builder.addCase(userFetchCablePlans.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchCablePlans.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.cablePlans = action.payload
        })
        builder.addCase(userFetchCablePlans.rejected, (state, action) => {
            state.userRequestLoading = false
        })

        builder.addCase(userGenerateCableSubscription.pending, (state, action) => {
            state.userRequestLoading = true
            state.userRequestStatus = 'PENDING'
        })
        builder.addCase(userGenerateCableSubscription.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'SUCCESS'
            state.newTransaction = action.payload
        })
        builder.addCase(userGenerateCableSubscription.rejected, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'FAILED'
        })



        builder.addCase(userFetchElectricityDiscos.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchElectricityDiscos.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.electricityDiscos = action.payload
        })
        builder.addCase(userFetchElectricityDiscos.rejected, (state, action) => {
            state.userRequestLoading = false
        })

        builder.addCase(userGenerateElectricitySubscription.pending, (state, action) => {
            state.userRequestLoading = true
            state.userRequestStatus = 'PENDING'
        })
        builder.addCase(userGenerateElectricitySubscription.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'SUCCESS'
            state.newTransaction = action.payload
        })
        builder.addCase(userGenerateElectricitySubscription.rejected, (state, action) => {
            state.userRequestLoading = false
            state.userRequestStatus = 'FAILED'
        })



        builder.addCase(userFetchReferrals.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userFetchReferrals.fulfilled, (state, action) => {
            state.userRequestLoading = false
            state.referrals = action.payload
        })
        builder.addCase(userFetchReferrals.rejected, (state, action) => {
            state.userRequestLoading = false
        })



        builder.addCase(userResetStateProperty.rejected, (state, action) => {
            state.userRequestLoading = false
            state.authLoading = false
        }),

            builder.addCase(getNairaWallet.pending, (state, action) => {
                state.authLoading = true
            })
        builder.addCase(getNairaWallet.fulfilled, (state, action) => {
            // state.authLoading = false
            state.naira_wallet_details = action.payload
        })
        builder.addCase(getNairaWallet.rejected, (state, action) => {
            // state.authLoading = false
        }),

            builder.addCase(resetPasswordOtpAction.pending, (state, action) => {
                state.resetPasswordOtpRequestLoading = true

            })
        builder.addCase(resetPasswordOtpAction.fulfilled, (state, action) => {
            state.resetPasswordOtpRequestLoading = false
        })
        builder.addCase(resetPasswordOtpAction.rejected, (state, action) => {
            state.resetPasswordOtpRequestLoading = false
        }),

            builder.addCase(resetPinOtpAction.pending, (state, action) => {
                state.resetPinOtpRequestLoading = true
            })
        builder.addCase(resetPinOtpAction.fulfilled, (state, action) => {
            state.resetPinOtpRequestLoading = false
        })
        builder.addCase(resetPinOtpAction.rejected, (state, action) => {
            state.resetPinOtpRequestLoading = false
        }),

            builder.addCase(resetTransactionPinAction.pending, (state, action) => {
                state.resetTransactionPinLoading = true
            })
        builder.addCase(resetTransactionPinAction.fulfilled, (state, action) => {
            state.resetTransactionPinLoading = false
        })
        builder.addCase(resetTransactionPinAction.rejected, (state, action) => {
            state.resetTransactionPinLoading = false
        }),

            builder.addCase(verifyPasswordOtpAndResetAction.pending, (state, action) => {
                state.verifyPasswordOtpAndResetLoading = true
            })
        builder.addCase(verifyPasswordOtpAndResetAction.fulfilled, (state, action) => {
            state.verifyPasswordOtpAndResetLoading = false
        })
        builder.addCase(verifyPasswordOtpAndResetAction.rejected, (state, action) => {
            state.verifyPasswordOtpAndResetLoading = false
        }),

            builder.addCase(iDverificationAction.pending, (state, action) => {
                state.idVerificationLoading = true
            })
        builder.addCase(iDverificationAction.fulfilled, (state, action) => {
            state.idVerificationLoading = false
        })
        builder.addCase(iDverificationAction.rejected, (state, action) => {
            state.idVerificationLoading = false
        })

        builder.addCase(getConversionRateAction.pending, (state, action) => {
            state.conversionRate = null
        })
        builder.addCase(getConversionRateAction.fulfilled, (state, action) => {
            state.conversionRate = action.payload
        })
        builder.addCase(getConversionRateAction.rejected, (state, action) => {
            state.conversionRate = null
        })
        builder.addCase(getTransactionsFeeAction.pending, (state, action) => {
            state.transactionsFee = null
        })
        builder.addCase(getTransactionsFeeAction.fulfilled, (state, action) => {
            state.transactionsFee = action.payload
        })
        builder.addCase(getTransactionsFeeAction.rejected, (state, action) => {
            state.transactionsFee = null
        })
        builder.addCase(generateQuoteAction.pending, (state, action) => {
            state.customLoadingState = true
            state.generatedQuote = null
        })
        builder.addCase(generateQuoteAction.fulfilled, (state, action) => {
            state.customLoadingState = false
            state.generatedQuote = action.payload
        })
        builder.addCase(generateQuoteAction.rejected, (state, action) => {
            state.customLoadingState = false
            state.generatedQuote = null
        })
        builder.addCase(swapCurrencyAction.pending, (state, action) => {
            state.customLoadingState = true

        })
        builder.addCase(swapCurrencyAction.fulfilled, (state, action) => {
            state.customLoadingState = false

        })
        builder.addCase(swapCurrencyAction.rejected, (state, action) => {
            state.customLoadingState = false

        })

        builder.addCase(createVirtualCardAction.pending, (state, action) => {
            state.customLoadingState = true

        })
        builder.addCase(createVirtualCardAction.fulfilled, (state, action) => {
            state.customLoadingState = false

        })
        builder.addCase(createVirtualCardAction.rejected, (state, action) => {
            state.customLoadingState = false

        })

        builder.addCase(getUserCardsAction.pending, (state, action) => {
            state.userCards = null

        })
        builder.addCase(getUserCardsAction.fulfilled, (state, action) => {
            state.userCards = action.payload


        })
        builder.addCase(getUserCardsAction.rejected, (state, action) => {
            state.userCards = null

        })

        builder.addCase(userClaimRefferals.pending, (state, action) => {
            state.customLoadingState = true

        })
        builder.addCase(userClaimRefferals.fulfilled, (state, action) => {
            state.customLoadingState = false


        })
        builder.addCase(userClaimRefferals.rejected, (state, action) => {
            state.customLoadingState = false

        })

        builder.addCase(fundAccountWithCard.pending, (state, action) => {
            state.customLoadingState = true

        })
        builder.addCase(fundAccountWithCard.fulfilled, (state, action) => {
            state.customLoadingState = false


        })
        builder.addCase(fundAccountWithCard.rejected, (state, action) => {
            state.customLoadingState = false

        })


        builder.addCase(resetUsdtData.pending, (state, action) => {
            state.usdtData = null

        })
        builder.addCase(resetUsdtData.fulfilled, (state, action) => {
            state.usdtData = null


        })
        builder.addCase(resetUsdtData.rejected, (state, action) => {
            state.usdtData = null            
        })

        builder.addCase(bankDetailsVerifications.pending, (state, action) => {
            
            state.verified_account = null

        })
        builder.addCase(bankDetailsVerifications.fulfilled, (state, action) => {
            state.verified_account = action.payload


        })
        builder.addCase(bankDetailsVerifications.rejected, (state, action) => {
            state.verified_account = null            
        })




        builder.addCase(userResetStateProperty.pending, (state, action) => {
            state.userRequestLoading = true
        })
        builder.addCase(userResetStateProperty.fulfilled, (state, action) => {
            state.userRequestLoading = false
            if (action.payload.key === 'STATE-VALUE') {
                state.stateValue = action.payload.value
            }
            if (action.payload.key === 'BLOG') {
                state.blog = action.payload.value
            }
        })
    }
})


export default userSlice.reducer;