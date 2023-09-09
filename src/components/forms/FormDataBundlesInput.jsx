import React from 'react'
import Label from '../text/Label'


const FormDataBundlesInput = ({ classes, name, handleChange, label, items, showLabel = true }) => {
    return (
        <div className="col-span-6 sm:col-span-3">
            {showLabel && (
                <Label text={label} />
            )}
            <select
                name={name}
                autoComplete={name}
                onChange={handleChange}
                className={`w-full py-2 px-3 border text-[12px] border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${classes}`}
            >
                <option className='text-[12px]'>{label}</option>
                {items?.map((item, index) => (
                    <option
                        key={index}
                        value={item.bundleCode}
                        className='text-[12px]'
                    >
                        {item?.bundleCode} - &#8358;{item?.amount}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FormDataBundlesInput
