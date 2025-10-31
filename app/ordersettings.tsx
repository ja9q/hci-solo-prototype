import { AddressPanel } from "./addresspanel"
import { OrderPanel } from "./orderpanel"
import { PaymentPanel } from "./paymentpanel"
import type { Address, Payment } from "./types"

interface OrderSettingsProps {
    orderMode: number
    setOrderMode: (val: number)=>void
    setModalOpen: (val:boolean)=>void
    address: Address
    payment: Payment
    setAddress: (val: Address)=>void
    setPayment: (val: Payment)=>void
    shipping: number
    setShipping: (val:number)=>void
}


export function OrderSettings({orderMode, setModalOpen, setOrderMode, address, payment, setAddress, setPayment, shipping, setShipping}:OrderSettingsProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <AddressPanel orderMode={orderMode}  setModalOpen={setModalOpen} setOrderMode={setOrderMode} address={address} setAddress={setAddress} />
            <PaymentPanel orderMode={orderMode}  setModalOpen={setModalOpen} setOrderMode={setOrderMode} payment={payment} setPayment={setPayment} />
            <OrderPanel orderMode={orderMode} setOrderMode={setOrderMode} shipping={shipping} setShipping={setShipping} />
        </div>
    )
}