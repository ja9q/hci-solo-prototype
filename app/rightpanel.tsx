import type { Address, Payment } from "./types"

interface RightPanelProps {
    orderMode: number
    setOrderMode: (val: number)=>void
    address: Address
    payment: Payment
}

export function RightPanel({orderMode, setOrderMode, address, payment}:RightPanelProps) {

    function handleOrderClick() {
        alert("Order placed! [END TASK]")
    }
    
    return (
        <div className="bg-white w-100 p-5 h-50">
            {orderMode == 0 && <button onClick={()=>{setOrderMode(2)}} className="w-90 rounded-xl bg-amber-300 p-1 cursor-pointer hover:bg-amber-400">Deliver to {address.alias}</button>}
            {orderMode == 1 && <button onClick={()=>{setOrderMode(2)}} className="w-90 rounded-xl bg-amber-300 p-1 cursor-pointer hover:bg-amber-400">Pay with {payment.alias}</button>}
            {orderMode == 2 && <button className="w-90 rounded-xl bg-amber-300 p-1 cursor-pointer hover:bg-amber-400" onClick={handleOrderClick}>Place your order</button>}            
            <div className="flex flex-col mt-5 w-90 pt-5 border-1 border-white border-t-gray-300 text-xs gap-1">
                <div className="flex w-90 flex-row justify-between">
                    <div>Items:</div>
                    <div>$0.00</div>
                </div>
                <div className="flex w-90 flex-row justify-between">
                    <div>Shipping & handling:</div>
                    <div>$0.00</div>
                </div>
                <div className="flex w-90 flex-row justify-between">
                    <div> Estimated tax to be collected:</div>
                    <div>$0.00</div>
                </div>
                <div className="flex w-90 flex-row justify-between text-lg font-bold">
                    <div> Order total:</div>
                    <div>$0.00</div>
                </div>
            </div>
        </div>
    )
}