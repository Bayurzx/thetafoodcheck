'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { UserHealthData, AuthData } from '@/types';


interface HealthDataContextProps {
  healthData: UserHealthData | null;
  authData: AuthData | null;
  setHealthData: React.Dispatch<React.SetStateAction<UserHealthData | null>>;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData | null>>;
}

const HealthDataContext = createContext<HealthDataContextProps | undefined>(undefined);

export const HealthDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [healthData, setHealthData] = useState<UserHealthData | null>(null);
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user) {
        try {
          const userId = session.user.id; // Adjust this according to your session object structure

          // Fetch health data
          const healthQuery = JSON.stringify({ userId });
          const healthResponse = await fetch(`/api/db/health_data_db/health_data/findOne?dbQuery=${encodeURIComponent(healthQuery)}`);
          if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            setHealthData(healthData);
          }

          // Fetch auth data
          const authQuery = JSON.stringify({ providerId: userId });
          const authResponse = await fetch(`/api/db/users_db/users/findOne?dbQuery=${encodeURIComponent(authQuery)}`);
          if (authResponse.ok) {
            const authData = await authResponse.json();
            setAuthData(authData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [session, status]);

  return (
    <HealthDataContext.Provider value={{ healthData, authData, setHealthData, setAuthData }}>
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (context === undefined) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};
