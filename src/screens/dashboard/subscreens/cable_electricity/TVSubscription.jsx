import { toast } from 'react-toastify'
import React, { useEffect, useReducer } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { useGlobalContext } from '../../../../context'
import { FormCablePlansInput, FormSelectInput, FormTextInput, HeaderText, IconButton, LoadingButtonOne } from '../../../../components'
import { userFetchCablePlans, userFetchNairaWalletBalance, userFetchUtilityServiceCategories, userFetchUtilityServiceCategoryProducts, userFetchUtilityServices, userGenerateCableSubscription } from '../../../../services/actions/user.actions'


const TVSubscription = () => {
	const dispatch = useDispatch()

	const { updateModalPages } = useGlobalContext()

	const { user } = useSelector(state => state.auth)
	const {
		utilityServiceCategoryProducts,
		cablePlans, nairaWallet, utilityServices,
		utilityServiceCategories, userRequestStatus,
	} = useSelector(state => state.user)

	const [config, updateConfig] = useReducer((prev, next) => {
		return { ...prev, ...next }
	}, {
		showDefault: true, showConfirmTransaction: false
	})
	const [formData, updateFormData] = useReducer((prev, next) => {
		return { ...prev, ...next }
	}, {
		vendors: [],
		billerName: '', number: '', amount: 0, balance: 0, description: 'cable', type: '', transaction_pin: ''
	})

	useEffect(() => {
		dispatch(userFetchUtilityServices())
		dispatch(userFetchNairaWalletBalance())
	}, [])

	useEffect(() => {
		if (utilityServices) {
			const index = utilityServices?.findIndex(service => service.identifier === 'CABLETV')

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

	useEffect(() => {
		if (formData.billerName) {
			const index = utilityServiceCategories?.findIndex(cat => cat.identifier === formData.billerName)

			updateFormData({ service_category_id: utilityServiceCategories[index]?._id })

			dispatch(userFetchUtilityServiceCategoryProducts({ category: utilityServiceCategories[index]?._id }))
		}
	}, [formData.billerName])


	useEffect(() => {
		if (nairaWallet) {
			updateFormData({ balance: nairaWallet?.availableBalance })
		}
	}, [nairaWallet])

	const handleChange = (e) => {
		updateFormData({ [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (user?.credentials?.user_transaction_pin !== formData.transaction_pin) return toast.error('Invalid transaction pin')
		console.log(formData)

		dispatch(userGenerateCableSubscription({ formData, toast, updateConfig }))
	}

	console.log(utilityServiceCategoryProducts)

	return (
		<div className="fixed h-screen z-20 bg-[#11111190] w-full backdrop-blur-sm flex justify-end">
			{config.showDefault && (
				<div className="w-full lg:w-[40%] h-full bg-gray-100 px-5 md:px-20 py-20 flex flex-col space-y-5">
					<BsArrowLeft
						size={20}
						className='cursor-pointer'
						onClick={() => updateModalPages({ showCableSubscriptionScreen: false })}
					/>

					<div className="space-y-2">
						<HeaderText
							text={'TV Subscription'}
							classes={'font-bold text-[20px] text-black'}
						/>
						<p className='text-[14px] hidden'></p>
					</div>

					<div className="flex flex-col w-full space-y-1">
						<FormSelectInput
							showLabel={false}
							name={'billerName'}
							label={'Cable TV brand'}
							handleChange={handleChange}
							classes={'py-4 rounded-xl mb-2'}
							items={formData.vendors}
						/>
						<FormCablePlansInput
							name={''}
							showLabel={false}
							items={utilityServiceCategoryProducts}
							handleChange={(e) => {
								const index = utilityServiceCategoryProducts?.findIndex(item => item.bundleCode === e.target.value)

								updateFormData({
									amount: utilityServiceCategoryProducts[index]?.amount,
									name: utilityServiceCategoryProducts[index]?.bundleCode,
									bundleCode: utilityServiceCategoryProducts[index]?.bundleCode,
								})
							}}
							label={'Subscription plan'}
							classes={'py-4 rounded-xl mb-2'}
						/>
						<FormTextInput
							name={'number'}
							padding={'py-4 px-5'}
							handleChange={handleChange}
							placeHolder={'Smart card number'}
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
								if (!formData.billerName) return toast.error('Cable provider is required')
								if (!formData.amount) return toast.error('Subscription plan is required')
								if (!formData.number) return toast.error('Smart card|IUC number is required')

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
							text={'Confirm Cable Subscription'}
							classes={'font-bold text-[20px] text-black'}
						/>
						<p className='text-[14px]'>Enter your transaction pin to confirm this transaction.</p>
					</div>

					<div className="flex flex-col w-full space-y-5">
						<form onSubmit={handleSubmit}>
							<FormTextInput
								name={'transaction_pin'}
								padding={'py-3 px-5'}
								placeHolder={'Enter pin'}
								handleChange={handleChange}
								classes={'text-[14px] placeholder:text-[14px] rounded-xl mb-2'}
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

export default TVSubscription