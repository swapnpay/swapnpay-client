import React, { useReducer, useState, useEffect } from 'react'
import { BsArrowDownCircle } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'

import { FormCurrencyInput, HeaderText, IconButton, LoadingButtonOne } from '../../components'
import { parse } from 'postcss'
import { generateQuoteAction, getConversionRateAction } from '../../services/actions/user.actions'
import ConfirmTransactions from '../utils/confirm_transactions'


const Swap = () => {
	const [confirmTransactionState, setConfirmTransactionState] = useState(false)
	const [current, setCurrent] = useState(0)
	const [amountToReceive, setAmountToReceive] = useState(0)
	const { transactionsFee, nairaWallet, dollarWallet, conversionRate, customLoadingState } = useSelector(state => state.user)
	const { user, userRequestStatus } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const [formData, updateFormData] = useReducer((prev, next) => {
		return { ...prev, ...next }
	}, {
		source: current == 0 ? 'NGN' : 'USD', destination: current == 0 ? 'USD' : 'NGN', amount: 0
	})

	const handleChange = (e) => {
		updateFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) })



	}
	useEffect(() => {

		if (formData.source == 'NGN') {

			var statedAmount = parseFloat((1 / parseFloat(conversionRate?.buy)) * formData?.amount)
			var amount = parseFloat(statedAmount) - parseFloat(statedAmount * transactionsFee?.amount)
			setAmountToReceive(Math.floor(amount * 100) / 100)

		} else {
			var statedAmount = parseFloat(parseFloat(conversionRate?.sell) * formData?.amount)
			var amount = statedAmount - parseFloat(transactionsFee?.amount * statedAmount)
			setAmountToReceive(Math.floor(amount * 100) / 100)

		}


	}, [formData.source, formData.amount, amountToReceive])

	useEffect(() => {
		if (formData.source == 'NGN') {
			updateFormData({ ...formData, balance: parseFloat(nairaWallet?.accountBalance), rate: conversionRate?.sell })

		} else {
			updateFormData({ ...formData, balance: parseFloat(dollarWallet?.amount), rate: conversionRate?.sell })

		}
	}, [formData.amount])


	useEffect(() => {
		updateFormData({ ...formData, amountToReceive: amountToReceive, fee: (parseFloat(transactionsFee?.amount) * (formData.amount == undefined ? 1 : formData.amount)).toFixed(2) })

	}, [amountToReceive])

	useEffect(() => {
		dispatch(getConversionRateAction())
	}, [])






	return (
		<div className='pl-8 pr-8 pb-10 mt-20'>
			<div className="w-full lg:w-[40%] flex flex-col items-start space-y-5">
				{!confirmTransactionState && <div>
					<div className="flex flex-col items-start w-full">
						<HeaderText
							text={'Swap'}
							classes={'font-bold text-[20px]'}
						/>
						<p className="text-[12px]">Easily swap from one currency to another.</p>
					</div>

					<div className="flex flex-col justify-between space-y-4 items-start w-full h-[350px] rounded-xl bg-white px-4 py-6">
						<div className='w-full space-y-5'>
							<FormCurrencyInput
								name={'amount'}
								placeHolder={'Amount'}
								handleChange={handleChange}
								source={formData.source}
								updateFormData={updateFormData}
								setCurrent={setCurrent}
								classes={'mb-2 rounded-xl py-4 mb-10 border-primary'}
							/>
							<p className='text-[10px] italic'>Available Balance: {formData.source == 'NGN' ? `N${Math.floor(nairaWallet?.accountBalance * 100) / 100}` : `$ ${Math.floor(dollarWallet?.amount * 100) / 100}`}</p>

							<div className="flex justify-center w-full">
								<BsArrowDownCircle
									size={22}
								/>
							</div>


							<FormCurrencyInput
								value={amountToReceive}
								name={'amount'}
								placeHolder={'Amount'}
								handleChange={handleChange}
								source={formData.destination}
								updateFormData={updateFormData}
								setCurrent={setCurrent}
								classes={'mb-2 rounded-xl py-4 mb-10 border-primary'}
							/>
						</div>
						<p className='text-[10px] italic'>Transactions Fee: {(parseFloat(transactionsFee?.amount) * (formData.amount == undefined ? 1 : formData.amount)).toFixed(2)}</p>

						<div className="w-full space-y-2">
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
									title={'Proceed'}
									width={'w-full'}
									iconType={'icon-right'}
									textColor={'text-white'}
									classes={'py-4 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
									handleClick={async () => {

										if (formData.source == "NGN" && (formData.amount).toString().length > 3) {
											updateFormData({ ...formData, amountToReceive: amountToReceive })

											const response = await dispatch(generateQuoteAction({ formData }))

											if (response.error == undefined) {
												setConfirmTransactionState(true)
											}
										}
										if (formData.source == "USD") {
											updateFormData({ ...formData, amountToReceive: amountToReceive })

											const response = await dispatch(generateQuoteAction({ formData }))

											if (response.error == undefined) {
												setConfirmTransactionState(true)
											}
										}

										else {

											return;
										}


									}}
								/>

							)}
							<p className="text-[12px] font-semibold">Current price of dollar to Naira : {conversionRate?.sell} Naira</p>
							<p className="text-[12px] font-semibold">Current price of naira to Dollar : {1 / parseFloat(conversionRate?.buy)} USD</p>
						</div>
					</div>
				</div>}
			</div>

			{confirmTransactionState &&

				<div
					className="w-full"
				>

					<ConfirmTransactions

						formData={formData}
						updateFormData={updateFormData}
						handleChange={handleChange}
						confirmTransactionState={confirmTransactionState}
						setConfirmTransactionState={setConfirmTransactionState}
					/>

				</div>
			}
		</div>
	)
}

export default Swap