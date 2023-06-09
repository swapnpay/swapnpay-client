import { IoIosArrowDown } from 'react-icons/io'
import React, { useEffect, useReducer, useState } from 'react'

import PhoneCountryCodes from '../../data/phoneContryCode.json'
import { appCurrencies } from '../../data'


const FormCurrencyInput = ({ classes, source, name, handleChange, placeHolder, updateFormData, setCurrent, value }) => {
    const [config, updateConfig] = useReducer((prev, next) => {
        return { ...prev, ...next }
    }, {
        showDropDown: false
    })
    const [currentCurrency, setCurrentCurrency] = useState({})

    useEffect(() => {
        setCurrentCurrency(appCurrencies.find(e => e.title === source))
        if (currentCurrency['title'] == 'NGN') {
            updateFormData({ source: 'NGN', destination: 'USD' })
        } else {
            updateFormData({ source: 'USD', destination: 'NGN' })
        }
    }, [source])

    return (
        <div className={`
                w-full flex items-center space-x-4 relative border border-gray-300 bg-white px-4
                ${classes}
            `}
        >
            <div
                onClick={() => updateConfig({ showDropDown: !config.showDropDown })}
                className="flex items-center space-x-2 cursor-pointer"
            >
                <img
                    alt=""
                    src={currentCurrency.icon}
                />
                <IoIosArrowDown />
            </div>

            <input
                value={value}
                name={name}
                type={"text"}
                onChange={handleChange}
                placeholder={placeHolder}
                className={`
                    border border-white placeholder:text-[14px] text-[14px] rounded w-full hover:outline-none focus:outline-none focus:border-white focus:ring-white
                `}
            />

            {config.showDropDown && (
                <div className="absolute left-0 top-0 w-[300px] max-h-[300px] bg-white flex flex-col space-y-3 overflow-y-auto scrollbar-4 px-6 py-4 rounded-b-xl shadow-lg">
                    {appCurrencies.map((country, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                updateConfig({ showDropDown: false })
                                updateFormData({ source: country.title })
                                console.log(currentCurrency, 'source');
                                setCurrentCurrency(appCurrencies.find(e => e.title === country.title))
                            }}
                            className='flex items-center space-x-3 cursor-pointer hover:scale-105 transition-all ease-in-out duration-500'
                        >
                            <img
                                alt=""
                                src={country.icon}
                            />
                            <p className='text-[14px]'>{country.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FormCurrencyInput