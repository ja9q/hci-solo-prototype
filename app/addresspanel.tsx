import type { Address } from "./types"
import { addresses } from "./types"

interface AddressPanelProps {
    orderMode: number
    setOrderMode: (val: number)=>void
    setModalOpen: (val:boolean)=>void
    address: Address
    setAddress: (val: Address)=>void
}

export function AddressPanel({orderMode, setOrderMode, setModalOpen, address, setAddress}:AddressPanelProps) {

    const options = addresses.map((a, i) => { return (
        <div className="flex flex-row items-center">
            <input  id={`address-${i}`} type="radio" checked={a==address} onChange={() => {{setAddress(a)}}} name="address" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
            <div className="ml-3 w-200">
            <label htmlFor={`address-${i}`}>
                <p className="font-bold p-0 m-0">{a.alias}</p>
                <p className="p-0 m-0">{a.name}</p>
                <p className="p-0 m-0">{a.address}</p>
                <p className="p-0 m-0">Phone number: {a.number}</p>
             </label>
                <p  className="text-blue-800 cursor-pointer p-0 m-0">Edit Address | Add delivery instructions </p></div>
           
        </div>)})

    return (
        <div className="bg-white w-250 p-5 ">
            {orderMode == 0 ? <>
                <span className="flex flex-row  mb-5 gap-5 items-end">
                    <p className="font-bold text-xl">Select a delivery address</p>
                    <p className="text-blue-800 cursor-pointer pb-1" onClick={()=>{setModalOpen(true)}} >Use order profile</p>
                </span>
                
                <div className="flex flex-col gap-5 border-1 mb-5 border-white border-t-gray-300">
                    <p className="font-bold text-lg pt-3 ">Delivery addresses (3)</p>
                    {options}
                    <p className="text-blue-800 cursor-pointer">Add a new delivery address</p>
                </div>
                <button onClick={()=>{setOrderMode(2)}} className=" rounded-xl bg-amber-300 py-1 px-5 cursor-pointer hover:bg-amber-400">{`Deliver to ${address.alias}`}</button>
                
            </> : <>
                <div className="flex flex-row justify-between">
                    <p className="font-bold text-xl">Delivering to {address.alias}</p> 
                    <p onClick={()=>{setOrderMode(0)}} className="text-blue-800 cursor-pointer">Change</p>
                </div>
                <p className="text-blue-800 cursor-pointer mt-5">Add delivery instructions</p>
            </>}
        </div>
    )
}