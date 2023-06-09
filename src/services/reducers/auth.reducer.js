import { createSlice } from '@reduxjs/toolkit'

import { authActivateAccount, authForgotPassword, authGenerateUsername, authResetPassword, authUserLogin, authUserLogout, authUserSignup, authVerifyUserEmail } from '../actions/auth.actions';

const USERFROMLS = localStorage.getItem('swapnpay-user') ? JSON.parse(localStorage.getItem('swapnpay-user')) : null


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accountActivation: null,
        user: USERFROMLS ? USERFROMLS : null,
        userSignup: null,
        generatedUsername: null,
        forgotPassword: null,
        authLoading: false,
        authRequestStatus: null,
    },
    extraReducers: (builder) => {
        builder.addCase(authGenerateUsername.pending, (state, action) => {
            state.authLoading = true
        })
        builder.addCase(authGenerateUsername.fulfilled, (state, action) => {
            state.authLoading = false
            state.generatedUsername = action.payload
        })
        builder.addCase(authGenerateUsername.rejected, (state, action) => {
            state.authLoading = false
        })

        builder.addCase(authUserSignup.pending, (state, action) => {
            state.authLoading = true
            state.authRequestStatus = 'PENDING'
        })
        builder.addCase(authUserSignup.fulfilled, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = ''
            state.userSignup = action.payload
        })
        builder.addCase(authUserSignup.rejected, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = 'FAILED'
        })

        builder.addCase(authVerifyUserEmail.pending, (state, action) => {
            state.authLoading = true
            state.authRequestStatus = 'PENDING'
        })
        builder.addCase(authVerifyUserEmail.fulfilled, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = ''
            // state.userSignup = action.payload
        })
        builder.addCase(authVerifyUserEmail.rejected, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = 'FAILED'
        })

        builder.addCase(authActivateAccount.pending, (state, action) => {
            state.authLoading = true
            state.authRequestStatus = 'PENDING'
        })
        builder.addCase(authActivateAccount.fulfilled, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = ''
            // state.userSignup = action.payload
        })
        builder.addCase(authActivateAccount.rejected, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = 'FAILED'
        })



        builder.addCase(authUserLogin.pending, (state, action) => {
            state.authLoading = true
            state.authRequestStatus = 'PENDING'
        })
        builder.addCase(authUserLogin.fulfilled, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = ''
            if (action.payload.success) {
                state.user = action.payload
            } else {
                state.accountActivation = action.payload
            }
        })
        builder.addCase(authUserLogin.rejected, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = 'FAILED'
        })

        builder.addCase(authForgotPassword.pending, (state, action) => {
            state.authLoading = true
            state.authRequestStatus = 'PENDING'
        })
        builder.addCase(authForgotPassword.fulfilled, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = ''
            state.forgotPassword = action.payload
        })
        builder.addCase(authForgotPassword.rejected, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = 'FAILED'
        })

        builder.addCase(authResetPassword.pending, (state, action) => {
            state.authLoading = true
            state.authRequestStatus = 'PENDING'
        })
        builder.addCase(authResetPassword.fulfilled, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = ''
        })
        builder.addCase(authResetPassword.rejected, (state, action) => {
            state.authLoading = false
            state.authRequestStatus = 'FAILED'
        })

        builder.addCase(authUserLogout.pending, (state, action) => {
            state.authLoading = true
        })
        builder.addCase(authUserLogout.fulfilled, (state, action) => {
            state.authLoading = false
            state.user = action.payload
        })
        builder.addCase(authUserLogout.rejected, (state, action) => {
            state.authLoading = false
        })
    }
})


export default authSlice.reducer;