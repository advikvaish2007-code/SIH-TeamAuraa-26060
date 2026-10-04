'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { syncEngine } from '@/lib/db/sync';

interface AppContextType {
  isOnline: boolean;
  stationId: number;
  setStationId: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [stationId, setStationId] = useState(1); // Default to Maitri

  useEffect(() => {
    // Initial check
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      syncEngine.processQueue();
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AppContext.Provider value={{ isOnline, stationId, setStationId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProviders');
  }
  return context;
}
