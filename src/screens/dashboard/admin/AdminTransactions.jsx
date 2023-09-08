import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminFailedTransactionsTable from '../../../components/tables/AdminFailedTransactionsTable'
import AdminCardDepositTable from '../../../components/tables/AdminCardDepositTable'
import AdminCryptoCurrencyTable from '../../../components/tables/AdminCryptoCurrencyTable'
import { getCardDepositsActions, getCryptoDeposits, getFailedTransactionAction } from '../../../services/actions/admin.actions'


const AdminTransactions = () => {
    const dispatch = useDispatch()
    const { card_deposits, failed_transactions, crypto_deposits} = useSelector(state => state.admin)
    const [showCardDeposit, setShowCardDeposit] = useState(0)

    const data = [1, 2, 3, 4]
    useEffect(() => {
        dispatch(getCardDepositsActions())
        dispatch(getFailedTransactionAction())
        dispatch(getCryptoDeposits())
    }, [])

    return (
        <div className='pl-4 pr-4 pb-10 md:px-8 mt-20 flex flex-wrap justify-between items-start w-full'>
            <div className='flex justify-between w-full space-x-2 px-2 py-2'>
                <button className={`${showCardDeposit == 0 ? 'bg-indigo-300' : 'bg-primary text-white'} w-1/4  px-2 py-3`}

                    onClick={() => {
                        setShowCardDeposit(0)
                    }}
                >
                    Failed utility Transactions
                </button>

                <button
                    onClick={() => {
                        setShowCardDeposit(1)
                    }}

                    className={`${showCardDeposit == 1 ? 'bg-indigo-300 ' : 'bg-primary text-white'} w-1/4  px-2 py-3`}>
                    Failed card deposits
                </button>
                <button
                    onClick={() => {
                        setShowCardDeposit(2)
                    }}

                    className={`${showCardDeposit == 2 ? 'bg-indigo-300 ' : 'bg-primary text-white'} w-1/4  px-2 py-3`}>
                    Failed crypto deposits
                </button>

            </div>
            {showCardDeposit == 0 && <AdminFailedTransactionsTable data={failed_transactions} showCardDeposit={showCardDeposit} setShowCardDeposit={setShowCardDeposit} />}
            {showCardDeposit == 1 && <AdminCardDepositTable data={card_deposits} showCardDeposit={showCardDeposit} setShowCardDeposit={setShowCardDeposit} />}
            {showCardDeposit == 2 && <AdminCryptoCurrencyTable data={crypto_deposits} showCardDeposit={showCardDeposit} setShowCardDeposit={setShowCardDeposit} />}
        </div>
    )
}

export default AdminTransactions