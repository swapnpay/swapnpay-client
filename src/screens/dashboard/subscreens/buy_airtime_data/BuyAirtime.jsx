import { toast } from 'react-toastify'
import React, { useEffect, useReducer } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { useGlobalContext } from '../../../../context'
import { FormSelectInput, FormTextInput, HeaderText, IconButton, LoadingButtonOne } from '../../../../components'
import { userAirtimePurchase, userFetchNairaWalletBalance, userFetchUtilityServiceCategories, userFetchUtilityServices } from '../../../../services/actions/user.actions'


const BuyAirtime = () => {
	const dispatch = useDispatch()

	const { updateModalPages } = useGlobalContext()

	const { user } = useSelector(state => state.auth)
	const { nairaWallet, utilityServices, utilityServiceCategories, userRequestStatus } = useSelector(state => state.user)

	const [config, updateConfig] = useReducer((prev, next) => {
		return { ...prev, ...next }
	}, {
		showDefault: true, showConfirmTransaction: false
	})

	const [formData, updateFormData] = useReducer((prev, next) => {
		return { ...prev, ...next }
	}, {
		service_category_id: '', vendors: [], provider: '', name: "AIRTIME",
		balance: 0, type: 'AIRTIME', description: 'airtime', amount: 0, phone_number: '', transaction_pin: ''
	})

	useEffect(() => {
		dispatch(userFetchUtilityServices())
		dispatch(userFetchNairaWalletBalance())
	}, [])

	useEffect(() => {
		if (nairaWallet) {
			updateFormData({ balance: nairaWallet?.availableBalance })
		}
	}, [nairaWallet])

	useEffect(() => {
		if (utilityServices) {
			const index = utilityServices?.findIndex(service => service.identifier === 'AIRTIME')

			// updateFormData({ service_category_id: utilityServices[index]?._id })

			dispatch(userFetchUtilityServiceCategories({ category: utilityServices[index]?._id }))
		}

		if (utilityServiceCategories) {
			const vendors = []

			utilityServiceCategories?.forEach(cat => {
				vendors.push(cat.identifier)
			})

			updateFormData({ vendors })
		}
	}, [utilityServices?.length, utilityServiceCategories?.length])

	const handleChange = (e) => {
		updateFormData({ [e.target.name]: e.target.value })
	}
	// console.log(utilityServices)
	console.log(utilityServiceCategories)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (user?.credentials?.user_transaction_pin !== formData.transaction_pin) return toast.error('Invalid transaction pin')

		const index = utilityServiceCategories?.findIndex(cat => cat.identifier === formData.provider)

		updateFormData({ service_category_id: utilityServiceCategories[index]?._id })

		console.log(formData)
		dispatch(userAirtimePurchase({ formData, toast, updateConfig }))
	}


	return (
		<div className="fixed h-screen z-20 bg-[#11111190] w-full backdrop-blur-sm flex justify-end">
			{config.showDefault && (
				<div className="w-full lg:w-[40%] h-full bg-gray-100 px-5 md:px-20 py-20 flex flex-col space-y-5">
					<BsArrowLeft
						size={20}
						className='cursor-pointer'
						onClick={() => updateModalPages({ showBuyAirtimeScreen: false })}
					/>

					<div className="space-y-2">
						<HeaderText
							text={'Buy Airtime'}
							classes={'font-bold text-[20px] text-black'}
						/>
						<p className='text-[12px] hidden'></p>
					</div>

					<div className="flex flex-col w-full space-y-1">
						<FormSelectInput
							showLabel={false}
							name={'provider'}
							handleChange={handleChange}
							classes={'py-3 rounded-xl mb-2'}
							label={'Select network provider'}
							items={formData.vendors}
						/>
						<FormTextInput
							name={'phone_number'}
							padding={'py-3 px-5'}
							placeHolder={'Mobile number'}
							handleChange={handleChange}
							classes={'text-[12px] placeholder:text-[12px] rounded-xl mb-2'}
						/>
						<FormTextInput
							name={'amount'}
							padding={'py-3 px-5'}
							placeHolder={'Amount'}
							handleChange={handleChange}
							classes={'text-[12px] placeholder:text-[12px] rounded-xl mb-10'}
						/>

						<IconButton
							type={'submit'}
							title={'Confirm'}
							width={'w-full'}
							iconType={'icon-right'}
							textColor={'text-white'}
							classes={'py-4 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
							handleClick={() => {
								if (!formData.amount) return toast.error('Amount is required')
								if (!formData.phone_number) return toast.error('Phone number is required')

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
							text={'Confirm Airtime Purchase'}
							classes={'font-bold text-[20px] text-black'}
						/>
						<p className='text-[12px]'>Enter the your transaction pin to confirm this transaction.</p>
					</div>

					<div className="flex flex-col w-full space-y-5">
						<form onSubmit={handleSubmit}>
							<FormTextInput
								name={'transaction_pin'}
								padding={'py-3 px-5'}
								placeHolder={'Enter transaction pin'}
								handleChange={handleChange}
								classes={'text-[12px] placeholder:text-[12px] rounded-xl mb-2'}
							/>

							{userRequestStatus === 'PENDING' ? (<LoadingButtonOne
								loadingType={'one'}
								textColor={'text-white'}
								width={'w-full md:w-full'}
								classes={'text-[14px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}

							/>) : (<IconButton
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

export default BuyAirtime