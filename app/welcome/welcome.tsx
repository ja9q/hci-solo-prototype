import { useState } from "react";
import type { Address, Payment } from "~/types";
import { addresses, payments } from "~/types";

import { OrderSettings } from "~/ordersettings";
import { RightPanel } from "~/rightpanel";
import { Modal } from "~/modal";

export function Welcome() {
  const [orderMode, setOrderMode] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [address, setAddress] = useState<Address>(addresses[0]);
  const [payment, setPayment] = useState<Payment>(payments[0]);
  const [shipping, setShipping] = useState(0);

  return (
    <>
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} setOrderMode={setOrderMode} setAddress={setAddress} setPayment={setPayment} />
    <header className="flex flex-col items-center min-w-max bg-gray-900 p-4 mb-5">
        <p className="leading-6 text-gray-200 text-xl text-center">Secure checkout</p>
    </header>
    <main className="flex  justify-center pb-4 gap-10 text-sm">
      <OrderSettings orderMode={orderMode}  setModalOpen={setModalOpen} setOrderMode={setOrderMode} address={address} payment={payment} setAddress={setAddress} setPayment={setPayment} setShipping={setShipping} shipping={shipping} />
      <RightPanel orderMode={orderMode}  setOrderMode={setOrderMode} address={address} payment={payment} />
    </main>
    </>
  );
}

