import React, { useReducer, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { appTransactions, appTransactionsTypes } from '../../data'
import { HeaderText, HomeWalletCard, TransactionCard, TransactionTypeCard } from '../../components'
import { getConversionRateAction, getNairaWallet, getTransactionsFeeAction, getUserCardsAction, userFetchDollarWalletBalance, userFetchNairaWalletBalance, userFetchTransactions } from '../../services/actions/user.actions'


const Home = () => {
	const dispatch = useDispatch()

	const { transactions, usdtData } = useSelector(state => state.user)

	const [config, updateConfig] = useReducer((prev, next) => {
		return { ...prev, ...next }
	}, {
		currentCurrency: 'NGN', showCurrencySelect: false,
	})

	useEffect(() => {
		
		dispatch(userFetchTransactions())
		dispatch(getNairaWallet())
		dispatch(getConversionRateAction())
		dispatch(getTransactionsFeeAction())
		dispatch(userFetchDollarWalletBalance())
		dispatch(getUserCardsAction())
	}, [])

	useEffect(() => {
		if (config.currentCurrency === 'NGN') {
			dispatch(userFetchNairaWalletBalance())
		}
		if (config.currentCurrency === 'USD') {
			dispatch(userFetchDollarWalletBalance())
		}
	}, [config.currentCurrency])

	return (
		<div className='pl-4 pr-4 pb-10 md:px-8 mt-20 flex flex-wrap justify-between items-start w-full'>
			<div className="w-full lg:w-[45%] flex flex-col items-start space-y-10">
				<div className="flex flex-col items-start w-full">
					{/* <HeaderText
						text={'Wallet'}
						classes={'font-bold text-[20px]'}
					/> */}

					<HomeWalletCard
						config={config}
						updateConfig={updateConfig}
					/>
				</div>

				<div className="flex flex-col items-start w-full">
					<HeaderText
						text={'Transactions'}
						classes={'font-bold text-[20px]'}
					/>

					<div className="flex flex-col justify-between items-center w-full rounded-xl bg-white py-5 px-5 md:px-10 max-h-[400px] overflow-y-auto scrollbar-4">
						{transactions?.map((transaction, index) => (
							<TransactionCard
								key={index}
								transaction={transaction}
							/>
						))}
					</div>
				</div>
			</div>

			<div className="w-full lg:w-[45%] mt-10 lg:mt-0 flex flex-col items-start space-y-5">
				<div className="flex flex-wrap justify-between items-center ax-h-[400px] overflow-y-auto scrollbar-4">
					{appTransactionsTypes.map((item, index) => (
						<TransactionTypeCard
							key={index}
							item={item}
						/>
					))}
				</div>

				<div className="hidden lg:flex flex-col items-start w-full">
					<HeaderText
						text={'Announcements'}
						classes={'font-bold text-[20px]'}
					/>

					<div className="flex flex-col justify-between items-start h-[250px w-full rounded-xl bg-white py-5 px-10">
						<ul className='list-disc'>
							<li className='cursor-pointer py-3 border-b transition-all ease-in-out duration-500 hover:translate-x-1 text-[14px]'>Refer a friend and get 1$ today <span className='text-sky-500'>Read more</span></li>
							<li className='cursor-pointer py-3 border-b transition-all ease-in-out duration-500 hover:translate-x-1 text-[14px]'>Payment of tuition to commence in South Africa</li>
							<li className='cursor-pointer py-3 border-b transition-all ease-in-out duration-500 hover:translate-x-1 text-[14px]'>Payment of tuition to commence in Ukraine</li>
							<li className='cursor-pointer py-3 border-b transition-all ease-in-out duration-500 hover:translate-x-1 text-[14px]'>Payment of tuition to commence in South Africa</li>
							<li className='cursor-pointer py-3 border-b transition-all ease-in-out duration-500 hover:translate-x-1 text-[14px]'>Refer a friend and get 1$ today <span className='text-sky-500'>Read more</span></li>
							<li className='cursor-pointer py-3 border-b transition-all ease-in-out duration-500 hover:translate-x-1 text-[14px]'>Payment of tuition to commence in Ukraine</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home