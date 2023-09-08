import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { appBeneficiaries } from '../../../../../data'
import { userFetchBanksList, bankDetailsVerifications } from '../../../../../services/actions/user.actions'
import { FormBankSelectInput, FormTextInput, HeaderText, IconButton, TransactionConfirmationText } from '../../../../../components'
import { verifyAccountDetails } from '../../../../../services/routes/user.routes'


const PayViaBankTransfer = ({ formData, updateFormData, handleChange, updateConfig }) => {
	const dispatch = useDispatch()
	const { verified_account } = useSelector(state => state.user)

	useEffect(() => {
		dispatch(userFetchBanksList());
	}, [])

	useEffect(() => {
		if (formData.account_number.length == 10) {
			const body = { account_number: formData.account_number, bank_code: formData.bankcode }
			console.log(body);
			dispatch(bankDetailsVerifications({ formData: body }))
		}

	}, [formData.account_number])

	const handleSubmit = (e) => {
		e.preventDefault()

		if (isNaN(formData.amount)) return toast.error('Invalid transaction amount')
		if (isNaN(formData.account_number)) return toast.error('Invalid account number')
		if (!formData.bankcode || !formData.account_number || !formData.amount) return toast.error('All fields are required')
		console.log(formData)

		updateConfig({ showDefault: false, showSendViaUsername: false, showSendViaBankTransfer: false, showConfirmBankTransfer: true })
	}

	return (
		<div className="w-full md:w-[40%] h-full bg-gray-100 px-6 md:px-20 py-16 flex flex-col space-y-5">
			<BsArrowLeft
				size={20}
				className='cursor-pointer'
				onClick={() => updateConfig({ showDefault: true, showSendViaUsername: false, showSendViaBankTransfer: false })}
			/>

			<div className="space-y-1">
				<HeaderText
					text={'Bank Transfer'}
					classes={'font-bold text-[20px] text-black'}
				/>
				<p className='text-[14px]'>Enter the details of the bank account your sending money to.</p>
			</div>

			<div className="flex flex-col w-full">
				<div className='mb-5'>
					<HeaderText
						family={'font-lato'}
						text={'Recent Beneficiaries'}
						classes={'font-bold text-[16px] text-black'}
					/>
					{/* <div className="flex space-x-4 items-center w-full">
						{appBeneficiaries.map((beneficiary, index) => (
							<div
								key={index}
								className="flex flex-col items-center"
							>
								<div
									className={`w-10 h-10 flex flex-col text-white text-[12px] font-bold justify-center rounded-full text-center ${index % 2 === 0 ? 'bg-slate-600' : 'bg-indigo-600'}`}
								>
									{beneficiary.initials}
								</div>
								<p className="text-[12px]">{beneficiary.name}</p>
							</div>
						))}
					</div> */}
				</div>
				<form onSubmit={handleSubmit}>
					<FormBankSelectInput

						bank={formData.bank}
						handleChange={(bank) => {
							updateFormData({ bank: bank.name, bankcode: bank.bankCode })
						}}
						classes={'py-3 px-5 rounded-xl mb-2'}
					/>
					<FormTextInput
						name={'account_number'}
						padding={'py-3 px-5'}
						placeHolder={'Account number'}
						handleChange={handleChange}
						classes={'text-[12px] placeholder:text-[12px] rounded-xl mb-2'}
					/>
					<FormTextInput
						name={'Account Name'}
						padding={'py-3 px-5'}
						placeHolder={verified_account?.data?.accountName ?? ""}
						handleChange={handleChange}
						disabled={true}
						classes={'text-[12px] placeholder:text-[12px] rounded-xl mb-2'}
					/>



					<FormTextInput
						name={'amount'}
						padding={'py-3 px-5'}
						placeHolder={'Amount'}
						handleChange={handleChange}
						classes={'text-[12px] placeholder:text-[12px] rounded-xl mb-2'}
					/>

					<TransactionConfirmationText />

					<IconButton
						type={'submit'}
						title={'Proceed'}
						width={'w-full'}
						iconType={'icon-right'}
						textColor={'text-white'}
						classes={'py-4 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
					// handleClick={() => }
					/>
				</form>
			</div>
		</div>
	)
}

export default PayViaBankTransfer