import React, { createContext, useContext } from 'react';
import services from '@lib/services';

type ServicesContextType = typeof services;

const ServiceContext = createContext<ServicesContextType>(services);

interface ServicesProviderProps {
  services?: typeof services;
}

const ServicesProvider: React.FC<ServicesProviderProps> = ({
  children,
  services: injectedServices,
}) => (
    <ServiceContext.Provider value={injectedServices || services}>
      {children}
    </ServiceContext.Provider>
  );

export const useServices = () => useContext(ServiceContext);

export default ServicesProvider;
