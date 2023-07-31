import React, { Fragment } from 'react'

import { useGlobalContext } from '../../context'
import Payments from '../../screens/dashboard/subscreens/pay/Payments'
import Receive from '../../screens/dashboard/subscreens/recieve/Receive'
import BuyData from '../../screens/dashboard/subscreens/buy_airtime_data/BuyData'
import BuyAirtime from '../../screens/dashboard/subscreens/buy_airtime_data/BuyAirtime'
import TVSubscription from '../../screens/dashboard/subscreens/cable_electricity/TVSubscription'
import SettingsChangePassword from '../../screens/dashboard/subscreens/settings/change_password/SettingsChangePassword'
import SettingsChangePin from '../../screens/dashboard/subscreens/settings/change_pin/SettingsChangePin'
import VerifyNIN from '../../screens/dashboard/subscreens/settings/identity_verification/VerifyNIN'
import VerifyBVN from '../../screens/dashboard/subscreens/settings/identity_verification/VerifyBVN'
import VerifyVotersCard from '../../screens/dashboard/subscreens/settings/identity_verification/VerifyVotersCard'
import VerifyDriversLicense from '../../screens/dashboard/subscreens/settings/identity_verification/VerifyDriversLicense'
import VerifyPassport from '../../screens/dashboard/subscreens/settings/identity_verification/VerifyPassport'
import ElectricityPayment from '../../screens/dashboard/subscreens/cable_electricity/ElectricityPayment'


const ModalPages = () => {
    const { modalPages } = useGlobalContext()
    

    return (
        <Fragment>
            {modalPages.showReciveScreen && (
                <Receive />
            )}

            
            {modalPages.showPaymentScreen && (
                <Payments />
            )}


            {modalPages.showBuyDataScreen && (
                <BuyData />
            )}


            {modalPages.showBuyAirtimeScreen && (
                <BuyAirtime />
            )}


            {modalPages.showCableSubscriptionScreen && (
                <TVSubscription />
            )}


            {modalPages.showElectricityPaymentScreen && (
                <ElectricityPayment />
            )}


            {modalPages.showChangePinScreen && (
                <SettingsChangePin />
            )}


            {modalPages.showChangePasswordScreen && (
                <SettingsChangePassword />
            )}


            {modalPages.showNinVerififcationScreen && (
                <VerifyNIN />
            )}


            {modalPages.showBvnVerififcationScreen && (
                <VerifyBVN />
            )}  


            {modalPages.showVoterCardVerififcationScreen && (
                <VerifyVotersCard />
            )}


            {modalPages.showDriverCardVerififcationScreen && (
                <VerifyDriversLicense />
            )}

            {modalPages.showInternationalPassportVerififcationScreen && (
                <VerifyPassport />
            )}
        </Fragment>
    )
}

export default ModalPages