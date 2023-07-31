import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

import IconImage from '../images/IconImage'


const ProfileCard = ({ classes, icon, label, title }) => {
    return (
        <div className={`
                ${classes}
                w-full flex justify-between items-center px-4 py-3 bg-white mt-2 rounded-md shadow-md cursor-pointer transition-all duration-500 ease-in-out hover:scale-x-[1.02]
            `}
        >
            <div className="flex items-center space-x-3">
                <IconImage
                    icon={icon}
                />
                <div className="flex flex-col items-start">
                    <p className="text-[14px] font-semibold">{title}</p>
                    <p className="text-[12px]">{label}</p>
                </div>
            </div>

            <IoIosArrowForward />
        </div>
    )
}

export default ProfileCard  