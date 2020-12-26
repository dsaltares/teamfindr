import React, { createContext, useContext } from 'react';
import services from '../services';

type ServicesContextType = typeof services;

const ServiceContext = createContext<ServicesContextType>(services);

interface ServicesProviderProps {
  services?: typeof services;
}

const ServicesProvider: React.FC<ServicesProviderProps> = ({
  children,
  services: injectedServices,
}) => {
  return (
    <ServiceContext.Provider value={injectedServices || services}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => useContext(ServiceContext);

export default ServicesProvider;
