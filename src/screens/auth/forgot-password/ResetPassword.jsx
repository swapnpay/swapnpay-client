import { toast } from 'react-toastify'
import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AuthArt1 } from '../../../assets'
import { useGlobalContext } from '../../../context'
import { authResetPassword } from '../../../services/actions/auth.actions'
import { FormPasswordInput, FormTextInput, HeaderText, IconButton, LoadingButtonOne, LogoText, Modals } from '../../../components'
import { useEffect } from 'react'


const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { modals, updateModals } = useGlobalContext()
    const { forgotPassword, authRequestStatus } = useSelector(state => state.auth)

    const [config, updateConfig] = useReducer((prev, next) => {
        return { ...prev, ...next }
    }, {
        verifiedOTP: false,
    })

    const [formData, updateFormData] = useReducer((prev, next) => {
        return { ...prev, ...next }
    }, {
        forgot_password_otp: '', email: '',
        new_password: '', confirmPassword: '',
    })

    useEffect(() => {
        if (forgotPassword) {
            updateFormData({ email: forgotPassword?.email })
        }
    }, [forgotPassword])

    const handleChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateConfig({ verifiedOTP: true })
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()

        // updateModals({ showPasswordResetSuccessModal: true })
        console.log(formData)

        if (!formData.new_password) return toast.error('Password is required')
        if (!formData.confirmPassword) return toast.error('Confirm password is required')
        if (!formData.forgot_password_otp) return toast.error('OTP is required')
        if (formData.new_password !== formData.confirmPassword) return toast.error('Passwords do not match')
        if (formData.forgot_password_otp && isNaN(formData.forgot_password_otp)) return toast.error('Invalid OTP')

        dispatch(authResetPassword({ formData, toast, navigate }))
    }

    return (
        <div className='h-screen flex justify-between overflow-y-hidden font-lato relative'>
            <Modals />
            <div className="w-0 lg:w-[50%] h-full">
                <img
                    src={AuthArt1}
                    alt="auth__art"
                    className='w-full'
                />
            </div>

            {/* {!config.verifiedOTP && (
                <div className="w-full lg:w-[50%] h-full flex flex-col px-5 lg:px-28 py-5 lg:py-20 space-y-5">
                    <LogoText
                        size={'lg'}
                        color={'black'}
                    />
                    <HeaderText
                        classes={'text-[30px]'}
                        color={'text-black font-bold'}
                        text={'Verify OTP'}
                    />
                    <p className=''>Enter the 4-digit code sent to {forgotPassword?.email}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center space-x-5">
                            <FormTextInput
                                name={'otp'}
                                handleChange={handleChange}
                                classes={'text-[20px] placeholder:text-[20px] rounded-xl w-[60px] px-1 text-center'}
                            />
                            <FormTextInput
                                name={'otp'}
                                handleChange={handleChange}
                                classes={'text-[20px] placeholder:text-[20px] rounded-xl w-[60px] px-1 text-center'}
                            />
                            <FormTextInput
                                name={'otp'}
                                handleChange={handleChange}
                                classes={'text-[20px] placeholder:text-[20px] rounded-xl w-[60px] px-1 text-center'}
                            />
                            <FormTextInput
                                name={'otp'}
                                handleChange={handleChange}
                                classes={'text-[20px] placeholder:text-[20px] rounded-xl w-[60px] px-1 text-center'}
                            />
                        </div>

                        <div className="flex justify-start mt-2">
                            <p className='text-[12px]'>Request another OTP in <strong className='font-bold'>03:00sec</strong></p>
                        </div>


                        <div className="mt-10">
                            <IconButton
                                to={'#'}
                                type={'submit'}
                                title={'Proceed'}
                                iconType={'icon-right'}
                                textColor={'text-white'}
                                width={'w-full md:w-full'}
                                classes={'py-4 text-[14px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                            />
                        </div>
                    </form>
                </div>
            )} */}

            {/* {config.verifiedOTP && ( */}
            <div className="w-full lg:w-[50%] h-full flex flex-col px-5 lg:px-28 py-5 lg:py-20 space-y-5">
                <LogoText
                    size={'lg'}
                    color={'black'}
                />
                <HeaderText
                    classes={'text-[30px]'}
                    color={'text-black font-bold'}
                    text={'Create New Password'}
                />

                <form onSubmit={handlePasswordChange}>
                    <FormTextInput
                        placeHolder={'OTP'}
                        handleChange={handleChange}
                        name={'forgot_password_otp'}
                        classes={'text-[14px] placeholder:text-[12px] rounded-xl mb-5'}
                    />
                    <FormPasswordInput
                        name={'new_password'}
                        handleChange={handleChange}
                        placeHolder={'New password'}
                        classes={'text-[14px] placeholder:text-[14px] mb-5 rounded-xl pr-14'}
                    />

                    <FormPasswordInput
                        name={'confirmPassword'}
                        handleChange={handleChange}
                        placeHolder={'Confirm new password'}
                        classes={'text-[14px] placeholder:text-[14px] mb-5 rounded-xl pr-14'}
                    />

                    <div className="mt-10">
                        {authRequestStatus !== 'PENDING' ? (
                            <IconButton
                                to={'#'}
                                type={'submit'}
                                title={'Submit'}
                                textColor={'text-white'}
                                width={'w-full md:w-full'}
                                classes={'py-4 text-[14px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                            />
                        ) : (
                            <LoadingButtonOne
                                loadingType={'one'}
                                textColor={'text-white'}
                                width={'w-full md:w-full'}
                                classes={'text-[14px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                            />
                        )}
                    </div>
                </form>
            </div>
            {/* )} */}
        </div>
    )
}

export default ResetPassword