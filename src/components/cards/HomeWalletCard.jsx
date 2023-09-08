import React from 'react'
import { useSelector } from 'react-redux'

import { appCountries } from '../../data'
import IconButton from '../buttons/IconButton'
import { useGlobalContext } from '../../context'


const HomeWalletCard = ({ config, updateConfig }) => {
    const { modalPages, updateModalPages } = useGlobalContext()

    const { dollarWallet, nairaWallet } = useSelector(state => state.user)

    return (
        <div
            onClick={() => {
                if (config.showCurrencySelect) {
                    updateConfig({ showCurrencySelect: false })
                }
            }}
            className="flex flex-col space-y-5 justify-between items-center h-[250px w-full rounded-xl bg-gradient-to-bl from-primary-light to-primary py-5 px-4 md:px-10">
            <h1 className='font-bold text-[30px] text-white font-spacegrotesk'>
                {config.currentCurrency === 'NGN' ? (
                    <span>&#8358; {nairaWallet ? Math.floor(nairaWallet?.accountBalance * 100) / 100 : '0.0'}</span>
                ) : (
                    <span>$ {dollarWallet ? Math.floor(dollarWallet?.amount * 100) / 100 : '0.0'}</span>
                )}
            </h1>

            <div className="flex justify-between items-center bg-white w-[220px] h-[50px] py-1 px-4 rounded-lg relative">
                {/* <p className='text-[12px]'>Account Balance</p> */}
                <p className='text-[18px] '>
                    {config.currentCurrency === 'NGN' ? (
                        <span>{nairaWallet ? Math.floor(nairaWallet?.accountBalance * 100) / 100 : '0.0'}</span>
                    ) : (
                        <span>{dollarWallet ? Math.floor(dollarWallet?.amount * 100) / 100 : '0.0'}</span>
                    )}
                </p>
                <div
                    onClick={() => {
                        updateConfig({ showCurrencySelect: true })
                    }}
                    className="rounded flex space-x-2 items-center border border-gray-200 shadow-lg h-[35px] px-2 bg-white"
                >
                    <img
                        alt="icon"
                        src={appCountries.find(e => e.title === config.currentCurrency).icon}
                    />

                    <p className='text-[12px]'>{appCountries.find(e => e.title === config.currentCurrency).title}</p>

                </div>

                {config.showCurrencySelect && (
                    <div className="absolute top-0 right-0 bg-white w-[100px] h-[100px] space-y-2 p-2 rounded-b rounded-tr overflow-y-auto scrollbar-4">
                        {appCountries.map((item, index) => (
                            <div
                                key={index}
                                className="flex space-x-2 items-center cursor-pointer"
                                onClick={() => {
                                    updateConfig({ showCurrencySelect: false })
                                    updateConfig({ currentCurrency: appCountries.find(e => e.title === item.title).title })
                                }}
                            >
                                <img
                                    alt="icon"
                                    src={item.icon}
                                />

                                <p className='text-[12px]'>{item.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between w-full">
                <IconButton
                    type={'submit'}
                    title={'Receive'}
                    width={'w-full md:w-[150px]'}
                    iconType={'icon-right'}
                    textColor={'text-white'}
                    classes={'py-4 text-[16px] rounded-xl bg-primary-light'}
                    handleClick={() => updateModalPages({ showReciveScreen: !modalPages.showReciveScreen })}
                />
                <IconButton
                    type={'submit'}
                    title={'Pay'}
                    width={'w-full md:w-[150px]'}
                    iconType={'icon-right'}
                    textColor={'text-white'}
                    classes={'py-4 text-[16px] rounded-xl bg-primary-light mt-5 md:mt-0'}
                    handleClick={() => updateModalPages({ showPaymentScreen: !modalPages.showPaymentScreen })}
                />
            </div>
        </div>
    )
}

export default HomeWalletCard