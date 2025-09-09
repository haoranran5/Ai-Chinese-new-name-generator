"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContextType {
  isAnyPaymentProcessing: boolean;
  setPaymentProcessing: (processing: boolean) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [isAnyPaymentProcessing, setIsAnyPaymentProcessing] = useState(false);

  const setPaymentProcessing = (processing: boolean) => {
    setIsAnyPaymentProcessing(processing);
  };

  return (
    <PaymentContext.Provider value={{ isAnyPaymentProcessing, setPaymentProcessing }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}
