import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { FiChevronRight } from 'react-icons/fi'

import { HeaderText } from '../../../../components'
import { appReceiveCryptoTypes } from '../../../../data'
import IconImage from '../../../../components/images/IconImage'


const ReceiveViaCrypto = ({ updateConfig }) => {
	return (
		<div className="w-full lg:w-[40%] h-full bg-gray-100 px-5 md:px-20 py-20 flex flex-col space-y-5">
			<BsArrowLeft
				size={20}
				className='cursor-pointer'
				onClick={() => updateConfig({ showDefault: true, showReceiveViaCrypto: false, showUSDCInfo: false })}
			/>

			<div className="space-y-2">
				<HeaderText
					text={'Receive crypto'}
					classes={'font-bold text-[20px] text-black'}
				/>
				<p className='text-[14px]'>Select which crypto token you want to receive.</p>
			</div>

			<div className="flex flex-col w-full">
				{appReceiveCryptoTypes.map((item, index) => (
					<div
						key={index}
						onClick={() => {
							if (item.type === 'USDT') {
								updateConfig({ showReceiveViaCrypto: false, showUSDTInfo: true, showUSDCInfo: false, showBUSDInfo: false })
							}
							// if (item.type === 'USDC') {
							// 	updateConfig({ showReceiveViaCrypto: false, showUSDTInfo: false, showUSDCInfo: true, showBUSDInfo: false })
							// }
							// if (item.type === 'BUSD') {
							// 	updateConfig({ showReceiveViaCrypto: false, showUSDTInfo: false, showUSDCInfo: false, showBUSDInfo: true })
							// }
						}}
						className='w-full mb-4 py-3 px-4 rounded-lg bg-white flex justify-between items-center cursor-pointer'
					>
						<div className="flex items-center space-x-3">
							<IconImage
								icon={item.icon}
								classes={''}
							/>
							<div className="flex flex-col">
								<p className='text-[14px] font-bold'>{item.title}</p>
								<p className='text-[12px]'>{item.address}</p>
							</div>
						</div>

						<FiChevronRight />
						{item.type !== 'USDT' && (
							<span className='bg-red-400 px-2 py-1 text-white text-[12px] rounded-md'>Coming soon</span>
						)}
					</div>
				))}

			</div>
		</div>
	)
}

export default ReceiveViaCrypto