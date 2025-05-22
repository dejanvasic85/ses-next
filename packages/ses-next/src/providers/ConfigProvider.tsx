import { createContext } from 'react';

interface ConfigContextType {
  sanityProjectId: string;
  sanityDataset: string;
}

export const ConfigContext = createContext<ConfigContextType | null>(null);

interface ConfigProviderProps extends ConfigContextType {
  children: React.ReactNode;
}

export const ConfigProvider = ({ children, ...config }: ConfigProviderProps) => {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
