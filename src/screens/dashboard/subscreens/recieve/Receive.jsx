import React, { useReducer } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { FiChevronRight } from 'react-icons/fi'

import ReceiveViaCrypto from './ReceiveViaCrypto'
import { appReceiveTypes } from '../../../../data'
import { HeaderText } from '../../../../components'
import ReceiveViaUsername from './ReceiveViaUsername'
import { useGlobalContext } from '../../../../context'
import CryptoUSDTInfo from './crypto-screens/CryptoUSDTInfo'
import CryptoUSDCInfo from './crypto-screens/CryptoUSDCInfo'
import CryptoBUSDInfo from './crypto-screens/CryptoBUSDInfo'
import ReceiveViaBankTransfer from './ReceiveViaBankTransfer'
import IconImage from '../../../../components/images/IconImage'
import ReceiveViaCard from './ReceiveViaCard'


const Receive = () => {
	const { updateModalPages } = useGlobalContext()

	const [config, updateConfig] = useReducer((prev, next) => {
		return { ...prev, ...next }
	}, {
		showReceiveViaUsername: false, showReceiveViaCrypto: false,
		showUSDCInfo: false, showUSDTInfo: false, showBUSDInfo: false,
		showReceiveViaBankTransfer: false, showReceiveViaCard: false, showDefault: true,
	})

	return (
		<div className="fixed h-screen z-20 bg-[#11111190] w-full backdrop-blur-sm flex justify-end">
			{config.showDefault && (
				<div className="w-full lg:w-[40%] h-full bg-gray-100 px-5 md:px-20 py-20 flex flex-col space-y-5">
					<BsArrowLeft
						size={20}
						className='cursor-pointer'
						onClick={() => updateModalPages({ showReciveScreen: false, showUSDTInfo: false })}
					/>

					<div className="space-y-2">
						<HeaderText
							text={'Receive'}
							classes={'font-bold text-[20px] text-black'}
						/>
						<p className='text-[14px]'>Select how you would want to Recieve money to your swapnpay account.</p>
					</div>

					<div className="flex flex-col w-full">
						{appReceiveTypes.map((item, index) => (
							<div
								key={index}
								onClick={() => {
									if (item.type === 'USERNAME') {
										updateConfig({ showDefault: false, showReceiveViaUsername: true })
									}
									if (item.type === 'CRYPTO') {
										updateConfig({ showDefault: false, showReceiveViaCrypto: true })
									}
									if (item.type === 'TRANSFER') {
										updateConfig({ showDefault: false, showReceiveViaBankTransfer: true })
									}
									if (item.type === 'CARD') {
										updateConfig({ showDefault: false, showReceiveViaCard: true })
									}
								}}
								className='w-full mb-4 py-3 px-4 rounded-lg bg-white flex justify-between items-center cursor-pointer transition-all ease-in-out duration-500 hover:translate-x-1'
							>
								<div className="flex items-center space-x-3">
									<IconImage
										icon={item.icon}
									/>
									<div className="flex flex-col">
										<p className='text-[14px] font-bold'>{item.title}</p>
										<p className='text-[12px]'>{item.intro}</p>
									</div>
								</div>

								<FiChevronRight />
							</div>
						))}
					</div>
				</div>
			)}

			{config.showReceiveViaUsername && (
				<ReceiveViaUserna me
					updateConfig={updateConfig}
				/>
			)}

			{config.showReceiveViaCrypto && (
				<ReceiveViaCrypto
					updateConfig={updateConfig}
				/>
			)}

			{!config.showReceiveViaCrypto && config.showUSDTInfo && (
				<CryptoUSDTInfo
					updateConfig={updateConfig}
				/>
			)}

			{!config.showReceiveViaCrypto && config.showUSDCInfo && (
				<CryptoUSDCInfo
					updateConfig={updateConfig}
				/>
			)}

			{!config.showReceiveViaCrypto && config.showBUSDInfo && (
				<CryptoBUSDInfo
					updateConfig={updateConfig}
				/>
			)}

			{config.showReceiveViaBankTransfer && (
				<ReceiveViaBankTransfer
					updateConfig={updateConfig}
				/>
			)}
			{config.showReceiveViaCard && (
				<ReceiveViaCard
					updateConfig={updateConfig}
				/>
			)}
		</div>
	)
}

export default Receive