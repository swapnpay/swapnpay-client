import { API } from '../config'


export const authGenerateUsernameRoute = (formData) => API.post('/user/generate-username', formData)


export const authUserSignupRoute = (formData) => API.post('/user/register', formData)


export const authGenerateEmailVerificationOTPRoute = (formData) => API.post('/user/receive-email-verification-code', formData)


export const authEmailVerificationRoute = (formData) => API.post('/user/email-verification', formData)


export const authActivateAccountRoute = (formData) => API.post('/user/create-safehaven-customer', formData)


export const authUserLoginRoute = (formData) => API.post('/user/login', formData)



export const authUserLogOutRoute = (formData) => API.post('/user/logout', formData)


export const authForgotPasswordRoute = (formData) => API.post('/user/forgot-password-otp', formData)


export const authResetPasswordRoute = (formData) => API.post('/user/', formData)