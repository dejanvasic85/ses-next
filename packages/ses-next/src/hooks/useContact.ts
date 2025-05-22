import { useState } from 'react';
import { ContactFormData } from '@/types';

export function useContact() {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);

  const sendMessage = (data: ContactFormData): void => {
    setLoading(true);
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setMessageSent(true);
        setLoading(false);
      });
  };

  return {
    loading,
    messageSent,
    sendMessage,
  };
}
