import type { Address, Payment } from "./types"

interface OrderPanelProps {
    orderMode: number
    setOrderMode: (val: number)=>void
    address: Address
    payment: Payment
}

export function OrderPanel({orderMode, setOrderMode,}:OrderPanelProps) {
    return (<>
            {orderMode == 2 ? <> <div className="bg-white w-250 p-5">
                <p className="font-bold text-xl">Arriving Nov 15, 2025</p> 
                <p>If you order in the next 15 hours and 22 minutes</p> 
                <div className="flex flex-row mt-3 gap-5">
                    <div className="p-3 w-150 flex flex-row bg-gray-200">
                        <div className="flex-col mr-5">
                            <div className="w-40 h-40 bg-gray-50 mb-3" />
                            <div className="bg-white w-30 border-yellow-300 border-5 rounded-4xl flex flex-row justify-between px-3 py-2">
                                <div className='font-bold cursor-pointer'>-</div>
                                <div className='font-bold'>1</div>
                                <div className='font-bold cursor-pointer'>+</div>
                            </div>
                        </div>
                        
                        <div className="flex-col">
                            <p>Product Name</p>
                            <p className="font-bold">$0.00</p>
                            
                            <p className="mt-4 text-xs">Ships from Amazon.com</p>
                            <p className="mt-2 text-xs">Sold by Company</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="w-100 flex flex-row">
                            <input id='ship-1'  type="radio" checked name="address" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="ship-1" className="ml-3 w-100 flex flex-row justify-between">
                                <div>Shipping Option 1</div>
                                <div>FREE</div>
                            </label>
                        </div>
                        <div className="w-100 flex flex-row">
                            <input id='ship-2'  type="radio"  name="address" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="ship-2" className="ml-3 w-100 flex flex-row justify-between">
                                <div>Shipping Option 2</div>
                                <div>FREE</div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white w-250 p-5 center-items flex flex-row gap-7">
                <button onClick={()=>{setOrderMode(2)}} className="w-70 h-8 rounded-xl bg-amber-300 py-1 px-5 cursor-pointer hover:bg-amber-400">Place your order</button>
                <div>
                    <p className="text-xl font-bold">Order total: $0.00</p>
                    <p className="text-xs">By placing your order, you agree to Amazon's <a className="text-blue-800 cursor-pointer underline">privacy notice</a> and <a className="text-blue-800 cursor-pointer underline">conditions of use</a></p>
                </div>
            </div>
            </> : <div className="bg-white w-250 p-5">
                <div className="flex flex-row justify-between">
                    <p className="font-bold text-xl">Arriving Nov 15, 2025</p> 
                    <p onClick={()=>{setOrderMode(2)}} className="text-blue-800 cursor-pointer">Change</p>
                </div>
                <div className="flex flex-row gap-5 mt-3">
                    <div className="w-25 h-25 bg-gray-300" /> 
                    <p >Product Name</p>
                </div>
                
            </div>}
        </>
    )
}