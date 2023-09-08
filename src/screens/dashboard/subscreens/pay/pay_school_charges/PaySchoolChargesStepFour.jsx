import React from 'react'
import { toast } from 'react-toastify'
import { BsArrowLeft } from 'react-icons/bs'

import { FormCurrencyInput, HeaderText, IconButton, TransactionConfirmationText } from '../../../../../components'


const PaySchoolChargesStepFour = ({ formData, updateFormData, handleChange, updateConfig }) => {
	const handleSubmit = (e) => {
		e.preventDefault()

		if (!formData.amount) return toast.error('Amount is required')
		console.log(formData)

		updateConfig({ showDefault: false, showPaySchoolDuesStepOne: false, showPaySchoolDuesStepTwo: false, showPaySchoolDuesStepThree: false, showPaySchoolDuesStepFour: false, showConfirmSchoolPaymentTransaction: true })
	}

	return (
		<div className="w-full md:w-[40%] h-full bg-gray-100 px-6 lg:px-20 py-20 flex flex-col space-y-5">
			<BsArrowLeft
				size={20}
				className='cursor-pointer'
				onClick={() => updateConfig({ showDefault: false, showPaySchoolDuesStepThree: true, showPaySchoolDuesStepFour: false })}
			/>

			<div className="space-y-2">
				<HeaderText
					text={'Tuition Fee'}
					classes={'font-bold text-[20px] text-black'}
				/>
				<p className='text-[14px]'>Easily and securely pay your Tuition on SwapnPay.</p>
			</div>

			<div className="flex flex-col w-full">
				<form onSubmit={handleSubmit}>
					<FormCurrencyInput
						source={"NGN"}
						name={'amount'}
						placeHolder={'Amount'}
						handleChange={handleChange}
						updateConfig={updateConfig}
						currency={formData.currency}
						updateFormData={updateFormData}
						classes={'mb-2 rounded-xl py-4 mb-10'}
					/>

					<TransactionConfirmationText />
					<IconButton
						type={'submit'}
						title={'Proceed'}
						width={'w-full'}
						iconType={'icon-right'}
						textColor={'text-white'}
						classes={'py-4 text-[16px] rounded-xl bg-gradient-to-r from-primary to-primary-light'}
					// handleClick={() => updateConfig({ showDefault: false, showPaySchoolDuesStepOne: false, showPaySchoolDuesStepTwo: false, showPaySchoolDuesStepThree: false, showPaySchoolDuesStepFour: false, showConfirmTransaction: true })}
					/>
				</form>
			</div>
		</div>
	)
}

export default PaySchoolChargesStepFour