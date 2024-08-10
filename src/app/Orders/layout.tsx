"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ProfileLayout({
  children,
  cancel,
  currOrder,
  orders
}: {
  children: React.ReactNode;
  cancel: React.ReactNode;
  currOrder: React.ReactNode;
  orders: React.ReactNode;
}) {
  const router = useRouter();
  const check = Cookies.get('authToken');
  if(!check){
    router.push("/Login");
  }
  const [activeTab, setActiveTab] = useState('orders');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return(
    <>
    <div>{children}</div>
          <div className="card shadow-lg border-0 rounded-lg mb-5">
            <div className="card-body">
              <div className="d-flex justify-content-between border-bottom mb-3 pb-2">
                <button
                  className={`btn ${activeTab === 'currOrder' ? 'btn-primary text-white' : 'btn-outline-secondary'} rounded-pill px-3 py-2`}
                  onClick={() => handleTabClick('currOrder')}
                >
                  Current Orders
                </button>
                <button
                  className={`btn ${activeTab === 'orders' ? 'btn-primary text-white' : 'btn-outline-secondary'} rounded-pill px-3 py-2`}
                  onClick={() => handleTabClick('orders')}
                >
                  Orders
                </button>
                <button
                  className={`btn ${activeTab === 'cancel' ? 'btn-primary text-white' : 'btn-outline-secondary'} rounded-pill px-3 py-2`}
                  onClick={() => handleTabClick('cancel')}
                >
                  Cancelled Orders
                </button>
              </div>
              <div className="mt-3">
                {activeTab === 'currOrder' && <div>{currOrder}</div>}
                {activeTab === 'orders' && <div>{orders}</div>}
                {activeTab === 'cancel' && <div>{cancel}</div>}
              </div>
            </div>
          </div>
    </>
  );
}
