import type { Payment } from "./types"
import { payments } from "./types"

interface PaymentPanelProps {
    orderMode: number
    setOrderMode: (val: number)=>void
    setModalOpen: (val:boolean)=>void
    payment: Payment
    setPayment: (val: Payment)=>void
}

export function PaymentPanel({orderMode, setModalOpen, setOrderMode, payment, setPayment}:PaymentPanelProps) {
    const options = payments.map((p, i) => { return (
        <tr id={`test-${i}`} onClick={() => {{setPayment(p)}}} className={`${(payment==p) ? ' bg-orange-100 ' : ''}`}>
            <td className="pl-5"><input  type="radio" checked={p==payment} onChange={() => {{setPayment(p)}}} name="payment" className="mt-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" /></td>
            <td className="w-13"><div className="mt-1 h-6 w-10 bg-gray-400"/></td>

            <td ><strong>{p.alias}</strong> <em>- ({p.label})</em></td>
            <td className={'py-3'}>{p.name}</td>
            <td>{p.expiry}</td>
        </tr>        
    )})

    return (
        <div className="bg-white w-250 p-5">
            {orderMode == 1 ? <>
                <span className="flex flex-row  mb-5 gap-5 items-end">
                    <p className="font-bold text-xl">Select a delivery address</p>
                    <p className="text-blue-800 cursor-pointer pb-1" onClick={()=>{setModalOpen(true)}}>Use order profile</p>
                </span>
                <div className="flex flex-col gap-5 border-1 border-gray-300 p-3 rounded-xl mb-5">
                    <p className="font-bold text-lg ">Your credit and debit cards</p>
                    <table>
                        <tr className="border-1 border-white border-b-gray-300 py-2  ">
                            <td className="font-normal text-gray-600"></td>
                            <td className="font-normal text-gray-600"></td>
                            <td className="font-normal text-gray-600"></td>
                            <td className="font-normal text-gray-600">Name on card</td>
                            <td className="font-normal text-gray-600">Expires on</td>
                        </tr>
                        <tr className="h-2"></tr>
                        {options}
                    </table>
                </div>
                <button onClick={()=>{setOrderMode(2)}} className=" rounded-xl bg-amber-300 py-1 px-5 cursor-pointer hover:bg-amber-400">{`Pay with ${payment.alias}`}</button>
            </> : <>
                <div className="flex flex-row justify-between">
                    <p className="font-bold text-xl">Paying with {payment.alias}</p> 
                    <p onClick={()=>{setOrderMode(1)}} className="text-blue-800 cursor-pointer">Change</p>
                </div>
                
                <p className="text-blue-800 cursor-pointer mt-5">Use a gift card, voucher, or promo code</p>
            </>} 
        </div>
    )
}