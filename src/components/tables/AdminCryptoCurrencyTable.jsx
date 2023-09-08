/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from 'react'
import { toast } from 'react-toastify'
import { GoPencil } from 'react-icons/go'
import { IoMdTrash } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import { useGlobalContext } from '../../context'
import { adminResetStateProperty, creditCryptoFundedUser, getCardDepositsActions, getCryptoDeposits, patchCardDepositAction } from '../../services/actions/admin.actions'



const AdminCryptoCurrencyTable = ({ data, showCardDeposit, setShowCardDeposit }) => {
    const dispatch = useDispatch()

    const { modals, updateModals } = useGlobalContext()
    const { adminRequestLoading, schoolFees_Details } = useSelector(state => state.admin)

    return (
        <div className="flex justify-between items-center w-full mt-5 overflow-x-auto scrollbar-3">
            <div className="flex flex-col w-full">
                <div className="space-y-1 w-full">
                    <Fragment>
                        <table className="w-full cursor-default">
                            <thead className="border bg-white rounded-md">
                                <tr>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 pl-4 py-3 text-left"
                                    >

                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-3 text-left"
                                    >
                                        Amount Paid (NGN)
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-3 text-left"
                                    >
                                        Amount To Pay ($USD)
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-3 text-left"
                                    >
                                        Amount (USD)
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-3 text-left"
                                    >
                                        Rate (NGN)
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-3 text-left"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-3 text-left"
                                    >
                                        Reference
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-3 text-left"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='border-b border-l border-r bg-white w-full'>
                                {data?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-[10px] text-gray-900 font-semibold pl-4 py-2 whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                                            N {item?.amountPaidInFiat ?? "0"}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                                            ${item?.amountToPay ?? ""}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                                            ${parseInt(item?.amount).toLocaleString('en-Us')}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                                            N {item?.fiat_rate ?? ""}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                                            {item?.created_at}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                                            {item?.transaction_ref}
                                        </td>
                                        {!item?.credited ? <td className="flex items-center space-x-5 text-sm py-2 text-gray-900 font-light whitespace-nowrap">

                                            {adminRequestLoading ? <button
                                                className='w-3/4 bg-indigo-300 text-white px-2 py-2 rounded-sm '>
                                                Processing

                                            </button>

                                                : <button
                                                    onClick={async () => {
                                                        var data = { id: item?.id }
                                                        

                                                        const response = await dispatch(creditCryptoFundedUser({ formData: data, toast }))
                                                        if (response.error == undefined) {
                                                            dispatch(getCryptoDeposits())
                                                        }
                                                    }}

                                                    className='w-3/4 bg-red-500 text-white px-2 py-2 rounded-sm '>
                                                    Credit user
                                                </button>}
                                        </td> : <button
                                            className='w-3/4 bg-indigo-500 text-white px-2 py-2 rounded-sm my-2'
                                        >
                                            PAID
                                        </button>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Fragment>
                </div>
            </div>
        </div >
    )
}

export default AdminCryptoCurrencyTable