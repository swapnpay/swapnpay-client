import React from 'react'
import { toast } from 'react-toastify'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { userTransferToSwapnPayUser } from '../../../../../services/actions/user.actions'
import { FormTextInput, HeaderText, IconButton, LoadingButtonOne } from '../../../../../components'


const ConfirmTransferToSwapnPayUser = ({ formData, handleChange, updateConfig }) => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { userRequestStatus } = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (user?.credentials?.user_transaction_pin !== formData.transaction_pin) return toast.error('Invalid transaction pin')

        dispatch(userTransferToSwapnPayUser({ formData, toast, updateConfig }))
    }

    return (
        <div className="w-full md:w-[40%] h-full bg-gray-100 px-6 lg:px-20 py-20 flex flex-col space-y-5">
            <BsArrowLeft
                size={20}
                className='cursor-pointer'
                onClick={() => updateConfig({ showDefault: false, showSendViaUsername: true, showConfirmTransferToSwapnPayUser: false })}
            />

            <div className="space-y-2">
                <HeaderText
                    text={'Confirm Transfer to SwapnPay User'}
                    classes={'font-bold text-[20px] text-black'}
                />
                <p className='text-[14px]'>Enter your transaction pin to confirm this transaction.</p>
            </div>

            <div className="flex flex-col w-full space-y-5">
                <form onSubmit={handleSubmit}>
                    <FormTextInput
                        padding={'py-3 px-5'}
                        name={'transaction_pin'}
                        handleChange={handleChange}
                        placeHolder={'Enter transaction pin'}
                        classes={'text-[14px] placeholder:text-[14px] rounded-xl mb-2'}
                    />

                    {userRequestStatus !== 'PENDING' ? (
                        <IconButton
                            type={'submit'}
                            title={'Confirm'}
                            width={'w-full'}
                            iconType={'icon-right'}
                            textColor={'text-white'}
                            classes={'py-4 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                        />
                    ) : (
                        <LoadingButtonOne
                            loadingType={'one'}
                            textColor={'text-white'}
                            width={'w-full md:w-full'}
                            classes={'text-[14px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                        />
                    )}
                </form>
            </div>
        </div>
    )
}

export default ConfirmTransferToSwapnPayUser