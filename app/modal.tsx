import type { ReactElement } from "react";
import { useState } from "react";
import type { Address, Payment, Preset } from "./types";
import { presets } from "./types";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (val: boolean)=>void;
    setOrderMode: (val:number)=>void
    setAddress: (val:Address)=>void
    setPayment: (val:Payment)=>void
}

export function Modal({modalOpen, setModalOpen, setOrderMode, setAddress, setPayment }: ModalProps) {
    const [preset, setPreset] = useState<Preset>(presets[0])

    function handleModalClick() {
        setAddress(preset.address)
        setPayment(preset.payment)
        setOrderMode(2)
        setModalOpen(false)
    }

    const options = presets.map((p, i) => { return (
            <tr className={`flow flow-row items-top ${p==preset && 'bg-orange-100'}`}  onClick={() => {setPreset(p)}}>
                <td className="pl-3"><input  id={`preset-${i}`} type="radio" name='preset' checked={p==preset} className=" w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" /></td>
                <td className="py-2">
                    <p className="font-bold p-0 m-0">{p.address.alias}</p>
                    <p className="p-0 m-0">{p.address.name}</p>
                    <p className="p-0 m-0">{p.address.address}</p>
                </td>
                <td className="py-2">
                    <p className="font-bold p-0 m-0">{p.payment.alias}</p>
                    <p className="p-0 m-0">{p.payment.name}</p>
                    <p className="p-0 m-0 italic">{p.payment.label}</p>
                </td>
            </tr>)})

    return (
        <>
        {modalOpen &&
        <>
        <div className="fixed inset-0 bg-black/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"  onClick={() => {setModalOpen(false)}} >
            <div className="flex py-50 justify-center text-sm">
            <div className=" w-220 rounded-lg bg-white  p-4 sm:p-6 sm:pb-4"  onClick={(e) => {e.stopPropagation();}}>
                <div className="flex justify-between">
                    <p className="font-bold text-lg mb-5">Use order profile</p>
                    <p className="cursor-pointer" onClick={()=>{setModalOpen(false)}}>✕</p>
                </div>
                <table className="w-205">
                {options}
                </table>
                <p  className="text-blue-800 cursor-pointer my-5">Add a new order profile</p>
                <div className="flex flex-row justify-end">
                    <button onClick={handleModalClick} className=" text-sm rounded-xl bg-amber-300 py-1 px-5 cursor-pointer hover:bg-amber-400">Use order profile</button>
                </div>
                
            </div>
            </div>
        </div>

        
            
        </>
        }
        
        </>
    );
}