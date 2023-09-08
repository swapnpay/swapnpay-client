import React, { useReducer, useState, useEffect, Fragment } from 'react'
import { IconLogoWhite } from '../../assets'
import { useSelector, useDispatch } from 'react-redux'
import IconImage from '../../components/images/IconImage'
import { FormSelectInput, FormTextInput, HeaderText, IconButton, LoadingButtonOne, TransactionConfirmationText } from '../../components'
import { createVirtualCardAction, getConversionRateAction } from '../../services/actions/user.actions'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'


const Cards = () => {
	const [config, updateConfig] = useReducer((prev, next) => {
		return { ...prev, ...next }
	}, {
		showCreateCard: false
	})
	const [formData, setFormData] = useState({})
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { transactionsFee, userCards, nairaWallet, dollarWallet, conversionRate, customLoadingState } = useSelector(state => state.user)
	const { user, userRequestStatus } = useSelector(state => state.auth)

	const handleChange = (e) => {

		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	useEffect(() => {
		dispatch(getConversionRateAction())
	}, [])

	return (
		<div className='pl-8 pr-8 pb-10 mt-20 flex flex-wrap-reverse justify-between items-start w-full'>
			{!config.showCreateCard && <div className="w-full lg:w-[60%] flex flex-col items-start space-y-5">
				<div className="flex flex-col items-start w-full">
					<HeaderText
						text={'Cards'}
						classes={'font-bold text-[20px]'}
					/>
					<p className="text-[12px]">Use SwapnPays virtual card to easily and securely make payment online.</p>
				</div>

				<div className="flex flex-col space-y-4 items-start w-full lg:w-[80%]">

					{userCards?.data?.data?.map((item, index) => (
						<div className={`w-full h-[180px] ${item?.currency == 'NGN' ? `bg-[url('/src/assets/images/card__bg__1.svg')]` : `bg-[url('/src/assets/images/card__bg__2.svg')]`} bg-cover rounded-lg flex flex-col justify-between px-4 py-8`}>
							<div className="flex justify-between">
								<div className='flex space-x-1'>
									<p className='text-[12px] text-white'>({item?.currency})</p>
									<p className='text-[12px] text-white'> Balance: {userCards?.balance[index]}</p>
								</div>
								<IconImage
									icon={IconLogoWhite}
								/>
							</div>
							<div className="flex flex-col space-y-1">
								<p className='text-[20px] font-semibold text-white'>{item?.maskedPan}</p>
								<div className='flex justify-between'>
									<p className='text-[12px] text-white'>{item?.customer?.name}</p>
									<p className='text-[12px] text-white'>{item?.expiryMonth} / {item?.expiryYear}</p>
								</div>
								{/* <div className='flex justify-between'>
									<p className='text-[12px] text-white'>Pin:</p>
									<p className='text-[12px] text-white'>Cvv {item?.expiryYear}</p>
								</div> */}
							</div>
						</div>
					))}

					{/* <div className="w-full h-[180px] bg-[url('/src/assets/images/card__bg__2.svg')] bg-cover rounded-lg flex flex-col justify-between px-4 py-8">
						<div className="flex justify-between">
							<p className='text-[12px] text-white'>Debit</p>
							<IconImage
								icon={IconLogoWhite}
							/>
						</div>
						<div className="flex flex-col space-y-1">
							<p className='text-[20px] font-semibold text-white'>5199 1110 4509 0264</p>
							<p className='text-[12px] text-white'>John Doe</p>
						</div>
					</div> */}
					{userCards?.data?.data.length < 3 && user?.credentials?.is_user_verified &&
						<IconButton
							type={'submit'}
							width={'w-full'}
							iconType={'icon-right'}
							textColor={'text-primary'}
							title={'Create new virtual card'}
							handleClick={() => {
								updateConfig({ showCreateCard: !config.showCreateCard })
							}}
							classes={'py-4 text-[14px] rounded-xl bg-white border border-primary'}
						/>}
				</div>
			</div>}

			{config.showCreateCard && (
				<div className="w-full lg:w-[40%] flex flex-col items-start space-y-5 mb-20">
					<button className='px-4 py-1 bg-primary text-white'
						onClick={() => {
							updateConfig({ showCreateCard: !config.showCreateCard })
						}}

					> Back </button>
					<HeaderText
						text={'Want a card for online transactions?'}
						classes={'font-bold text-[20px]'}
					/>

					<form onSubmit={(e) => {
						e.preventDefault()
					}}
						className='w-full'
					>
						<FormSelectInput
							name={'limit_interval'}
							showLabel={false}
							items={['daily', 'weekly', 'monthly', 'yearly']}
							label={'Select limit interval'}
							handleChange={handleChange}
							classes={'py-4 rounded-xl mb-5'}
						/>
						<FormTextInput
							name={'limit_amount'}
							padding={'py-4 px-5'}
							placeHolder={'Limit amount'}
							handleChange={handleChange}
							classes={'text-[14px] placeholder:text-[14px] rounded-xl mb-5 w-full'}
						/>
						<FormSelectInput
							name={'currency'}
							showLabel={false}
							items={['USD', 'NGN']}
							label={'Select currency'}
							handleChange={handleChange}
							classes={'py-4 rounded-xl mb-5'}
						/>
						{formData?.currency == 'NGN' ? `Balance : NGN ${Math.floor(nairaWallet?.availableBalance * 100) / 100}` : `Balance: $ ${Math.floor(dollarWallet?.amount * 100) / 100}`}
						<FormSelectInput
							name={'card_brand'}
							showLabel={false}
							items={['Verve', 'MasterCard', 'Visa']}
							label={'Card brand'}
							handleChange={handleChange}
							classes={'py-4 rounded-xl mb-5'}
						/>
						<FormTextInput
							name={'amount'}
							padding={'py-4 px-5'}
							placeHolder={'Amount you wish to fund'}
							handleChange={handleChange}
							classes={'text-[14px] placeholder:text-[14px] rounded-xl mb-5 w-full'}
						/>

						<TransactionConfirmationText type='debit' />




						{customLoadingState == true ? (

							<LoadingButtonOne
								loadingType={'one'}
								textColor={'text-white'}
								width={'w-full md:w-full'}
								classes={'text-[14px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
							/>
						) : (

							<IconButton
								type={'submit'}
								width={'w-full'}
								handleClick={async () => {
									const response = await dispatch(createVirtualCardAction({ formData }))

									if (response.error == undefined) {
										toast.success('Card was created successfully')
										window.location = '/dashboard'


									} else {
										toast.error('Card not created, try again later.')
									}

								}}
								iconType={'icon-right'}
								textColor={'text-white'}
								title={'Create new virtual card'}
								classes={'py-4 mt-10 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
							/>
						)}





					</form>
				</div>
			)}
		</div>
	)
}

export default Cards