import { toast } from 'react-toastify'
import React, { useEffect, useReducer } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { useGlobalContext } from '../../../../context'
import { FormElectricityDiscosInput, FormSelectInput, FormTextInput, HeaderText, IconButton, LoadingButtonOne } from '../../../../components'
import { userFetchElectricityDiscos, userFetchNairaWalletBalance, userFetchUtilityServiceCategories, userFetchUtilityServices, userGenerateElectricitySubscription } from '../../../../services/actions/user.actions'


const ElectricityPayment = () => {
    const dispatch = useDispatch()

    const { updateModalPages } = useGlobalContext()

    const { user } = useSelector(state => state.auth)
    const { electricityDiscos, nairaWallet, utilityServices, utilityServiceCategories, userRequestStatus } = useSelector(state => state.user)

    const [config, updateConfig] = useReducer((prev, next) => {
        return { ...prev, ...next }
    }, {
        showDefault: true, showConfirmTransaction: false
    })
    const [formData, updateFormData] = useReducer((prev, next) => {
        return { ...prev, ...next }
    }, {
        vendors: '', vendType: "", service_category_id: "",
        billerName: '', number: '', amount: 0, balance: 0, description: 'electricity', type: '', transaction_pin: ''
    })

    useEffect(() => {
        dispatch(userFetchUtilityServices())
        dispatch(userFetchNairaWalletBalance())
    }, [])

    useEffect(() => {
        if (utilityServices) {
            const index = utilityServices?.findIndex(service => service.identifier === 'UTILITY')

            // updateFormData({ service_category_id: utilityServices[index]?._id })

            dispatch(userFetchUtilityServiceCategories({ category: utilityServices[index]?._id }))
        }
    }, [utilityServices?.length, utilityServiceCategories?.length])

    useEffect(() => {
        if (nairaWallet) {
            updateFormData({ balance: nairaWallet?.availableBalance })
        }
    }, [nairaWallet])

    const handleChange = (e) => {
        if (e.target.name === 'amount') {
            return updateFormData({ amount: parseInt(e.target.value) })

        }
        updateFormData({ [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (user?.credentials?.user_transaction_pin !== formData.transaction_pin) return toast.error('Invalid transaction pin')
        console.log(formData)

        dispatch(userGenerateElectricitySubscription({ formData, toast, updateConfig }))
    }

    console.log(utilityServiceCategories)

    return (
        <div className="fixed h-screen z-20 bg-[#11111190] w-full backdrop-blur-sm flex justify-end">
            {config.showDefault && (
                <div className="w-full lg:w-[40%] h-full bg-gray-100 px-5 md:px-20 py-20 flex flex-col space-y-5">
                    <BsArrowLeft
                        size={20}
                        className='cursor-pointer'
                        onClick={() => updateModalPages({ showElectricityPaymentScreen: false })}
                    />

                    <div className="space-y-2">
                        <HeaderText
                            text={'Electricity Payment'}
                            classes={'font-bold text-[20px] text-black'}
                        />
                        <p className='text-[14px] hidden'></p>
                    </div>

                    <div className="flex flex-col w-full space-y-1">
                        <FormElectricityDiscosInput
                            name={''}
                            showLabel={false}
                            items={utilityServiceCategories}
                            handleChange={(e) => {
                                const index = utilityServiceCategories?.findIndex(item => item.name === e.target.value)

                                updateFormData({
                                    service_category_id: utilityServiceCategories[index]?._id,
                                })
                            }}
                            label={'Electricity Disco'}
                            classes={'py-4 rounded-xl mb-2'}
                        />
                        <FormSelectInput
                            name={'vendType'}
                            showLabel={false}
                            handleChange={handleChange}
                            classes={'py-3 rounded-xl mb-2'}
                            label={'Meter Type'}
                            items={['PREPAID', 'POSTPAID']}
                        />
                        <FormTextInput
                            name={'number'}
                            padding={'py-4 px-5'}
                            handleChange={handleChange}
                            placeHolder={'Meter number'}
                            classes={'text-[14px] placeholder:text-[14px] rounded-xl mb-2'}
                        />
                        <FormTextInput
                            name={'amount'}
                            padding={'py-4 px-5'}
                            handleChange={handleChange}
                            placeHolder={'Amount'}
                            classes={'text-[14px] placeholder:text-[14px] rounded-xl mb-10'}
                        />

                        <IconButton
                            type={'submit'}
                            title={'Confirm'}
                            width={'w-full'}
                            iconType={'icon-right'}
                            textColor={'text-white'}
                            classes={'py-4 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                            handleClick={() => {
                                if (isNaN(formData.amount)) return toast.error('Invalid amount')
                                if (!formData.amount) return toast.error('Amount is required')
                                if (!formData.number) return toast.error('Meter number is required')
                                if (!formData.vendType) return toast.error('Electricity provider is required')

                                updateConfig({ showDefault: false, showConfirmTransaction: true })
                            }}
                        />
                    </div>
                </div>
            )}

            {config.showConfirmTransaction && (
                <div className="w-full lg:w-[40%] h-full bg-gray-100 px-5 md:px-20 py-20 flex flex-col space-y-5">
                    <BsArrowLeft
                        size={20}
                        className='cursor-pointer'
                        onClick={() => updateConfig({ showDefault: true, showConfirmTransaction: false })}
                    />

                    <div className="space-y-2">
                        <HeaderText
                            text={'Confirm Electricity Subscription'}
                            classes={'font-bold text-[20px] text-black'}
                        />
                        <p className='text-[14px]'>Enter your transaction pin to confirm this transaction.</p>
                    </div>

                    <div className="flex flex-col w-full space-y-5">
                        <form onSubmit={handleSubmit}>
                            <FormTextInput
                                name={'transaction_pin'}
                                padding={'py-3 px-5'}
                                placeHolder={'Enter Pin'}
                                handleChange={handleChange}
                                classes={'text-[14px] placeholder:text-[14px] rounded-xl mb-2'}
                            />

                            {userRequestStatus === 'PENDING' ? (<LoadingButtonOne
                                loadingType={'one'}
                                textColor={'text-white'}
                                width={'w-full md:w-full'}
                                classes={'text-[14px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}

                            />) :
                                (<IconButton
                                    type={'submit'}
                                    title={'Confirm'}
                                    width={'w-full'}
                                    iconType={'icon-right'}
                                    textColor={'text-white'}
                                    classes={'py-4 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
                                />)}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ElectricityPayment
