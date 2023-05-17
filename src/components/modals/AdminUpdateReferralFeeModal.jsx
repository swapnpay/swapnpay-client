import { toast } from 'react-toastify'
import React, { useReducer } from 'react'
import { useDispatch } from 'react-redux'

import ModalHeader from './ModalHeader'
import HeaderOne from '../text/HeaderOne'
import { useGlobalContext } from '../../context'


const AdminUpdateReferralFeeModal = () => {
    const dispatch = useDispatch()

    const { modals, updateModals } = useGlobalContext()

    const [formData, updateFormData] = useReducer((prev, next) => {
        return { ...prev, ...next }
    }, { departmentName: '' })

    const handleChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value.trim() })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.departmentName) return toast.error('Department name is required')
        // dispatch(createDepartment({ departmentName: formData.departmentName, toast, modals, updateModals }))
    }

    return (
        <div className="fixed grid h-screen z-20 bg-[#11111190] place-items-center w-full backdrop-blur-sm">
            <div className="bg-white w-[350px] md:w-[500px] px-[10px] md:px-[30px] py-[20px] ">
                <div className="flex justify-between">
                    <HeaderOne
                        semibold={true}
                        size={'text-[14px]'}
                        color={'text-primary'}
                        text={`Update Referral Fee`}
                    />

                    <ModalHeader
                        type={2}
                        modalHandler={() => updateModals({ showAdminUpdateReferralFeeModal: false })}
                    />
                </div>

                <form
                    className='py-4'
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            type="number"
                            name="fee"
                            placeholder="Referral Fee"
                            className="border border-gray-300 placeholder:text-[12px] text-[12px] rounded w-full h-5 px-5 py-5 mt-2 hover:outline-none focus:outline-none focus:border-gray-600 focus:ring-blue "
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-primary rounded text-white text-[12px] py-2 px-6 hover:translate-x-1 ease-in-out duration-700 transition-all focus:outline-none"
                    >
                        Update
                    </button>
                </form>

            </div>
        </div>
    )
}

export default AdminUpdateReferralFeeModal

