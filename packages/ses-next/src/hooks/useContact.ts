import { useState } from 'react';
import { ContactFormData } from '@/types';

export function useContact() {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const sendMessage = (data: ContactFormData): void => {
    setLoading(true);
    setError(false);
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setMessageSent(true);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    error,
    loading,
    messageSent,
    sendMessage,
  };
}
