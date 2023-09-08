import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'

import { FormTextInput, HeaderText, IconButton, LoadingButtonOne } from '../../../../../components'
import { userFundViaUSDT } from '../../../../../services/actions/user.actions'


const CryptoUSDTInfo = ({ updateConfig }) => {
    const dispatch = useDispatch()

    const [amount, setAmount] = useState(0)

    const { userRequestStatus } = useSelector(state => state.user)

    return (
        <div className="w-full md:w-[40%] h-full bg-gray-100 px-6 lg:px-20 py-20 flex flex-col space-y-5">
            <BsArrowLeft
                size={20}
                className='cursor-pointer'
                onClick={() => updateConfig({ showDefault: false, showReceiveViaCrypto: true, showUSDTInfo: false, })}
            />

            <div className="space-y-2">
                <HeaderText
                    text={'USDT'}
                    classes={'font-bold text-[20px] text-black'}
                />
                <p className='text-[14px]'>Use the details below to receive your USDT token</p>
            </div>

            <div className="flex flex-col space-y-5">
                {/* <div className="mx-auto">
                    <img
                        alt="qrcode"
                        src={IconQRCode}
                        className='h-[150px]'
                    />
                </div> */}

                {/* <div
                    className='w-full mb-4 py-3 px-4 rounded-lg bg-white flex justify-between items-center cursor-pointer'
                >
                    <p className='text-[14px] font-bold' id='usdt-address'>0xfeebabe6b0418ec13b30aadf129f5dcdd4f70cea</p>

                    <FiCopy
                        onClick={() => {
                            const text = document.getElementById('usdt-address').textContent
                            navigator.clipboard.writeText(text)

                            toast.info('Copied!', { autoClose: 2000, theme: 'dark' })
                        }}
                        className='cursor-pointer'
                    />
                </div>

                <p className='text-[12px] mx-auto'>Minimum receivable: 20 USDT</p> */}

                <FormTextInput
                    type={'number'}
                    name={'receiver_username'}
                    padding={'py-3 px-5'}
                    placeHolder={'Amount'}
                    handleChange={(e) => {
                        console.log(e.target.value)
                        setAmount(parseInt(e.target.value))
                    }}
                    classes={'text-[12px] placeholder:text-[12px] rounded-xl mb-2'}
                />

                {userRequestStatus === "PENDING" ? (
                    <LoadingButtonOne
                        loadingType={'one'}
                        textColor={'text-white'}
                        width={'w-full md:w-full'}
                        classes={'text-[14px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                    />
                ) : (
                    <IconButton
                        type={'submit'}
                        title={'Confirm'}
                        width={'w-full'}
                        iconType={'icon-right'}
                        textColor={'text-white'}
                        classes={'py-4 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                        handleClick={() => {
                            dispatch(userFundViaUSDT({ formData: { amount }, toast, updateConfig }))

                            // updateConfig({ showDefault: false, showUSDCInfo: false, showConfirmTransaction: true })
                        }}
                    />
                )}

                {/* <div
                    className='w-full text-center mb-4 py-3 px-4 rounded-lg space-y-2 border border-red-500 flex flex-col justify-between items-center cursor-pointer'
                >
                    <HeaderText
                        text={'Warning!!!'}
                        classes={'font-bold text-[20px] text-black'}
                    />
                    <p className='text-[12px]'>Please send only USDT to this address, sending any other token to this address would result in permanent loss</p>
                    <p className='text-[12px]'>Always generate new transaction address before sending tokens</p>
                </div> */}
            </div>
        </div>
    )
}

export default CryptoUSDTInfo