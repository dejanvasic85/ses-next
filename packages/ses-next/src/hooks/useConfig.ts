import { ConfigContext } from '@/providers/ConfigProvider';

import { useContext } from 'react';

export const useConfig = () => {
  const config = useContext(ConfigContext);

  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  return config;
};
