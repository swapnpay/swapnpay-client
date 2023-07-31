import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts';

import { AdminOverviewCard } from '../../../components'
import { monthly_transaction_month_config } from '../../../middlewares';
import { adminFetchDashboardInfo } from '../../../services/actions/admin.actions';


const AdminDashboard = () => {
    const dispatch = useDispatch()

    const { dashboardInfo } = useSelector(state => state.admin)

    const [monthlyTransactions, setMonthlyTransactions] = useState([])

    useEffect(() => {
        dispatch(adminFetchDashboardInfo())
    }, [])

    useEffect(() => {
        if (dashboardInfo?.monthly_transactions) {

            const CONSTRUCT = dashboardInfo?.monthly_transactions?.map((item, index) => {
                // console.log(item)
                return {
                    ...item,
                    month_name: monthly_transaction_month_config(item.month)
                }
            })

            setMonthlyTransactions(CONSTRUCT)
        }
    }, [dashboardInfo])

    return (
        <div className='pl-4 pr-4 pb-10 md:px-8 mt-20 flex flex-wrap justify-between items-start w-full'>
            <div className="w-full flex flex-wrap justify-between items-center">
                {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                    <AdminOverviewCard
                        key={index}
                        item={item}
                    />
                ))}
            </div>

            <div className="bg-white mt-10">
                <LineChart width={1055} height={400} data={monthlyTransactions}>
                    {/* <CartesianGrid strokeDasharray="" /> */}
                    <XAxis dataKey="month_name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </div>
        </div>
    )
}

export default AdminDashboard