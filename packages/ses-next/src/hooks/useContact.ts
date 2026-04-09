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
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) {
          console.error(`[useContact] Request failed ${res.status}:`, body);
          throw new Error(`Request failed: ${res.status}`);
        }
        return body;
      })
      .then(() => {
        setMessageSent(true);
      })
      .catch((err) => {
        console.error('[useContact] sendMessage error:', err);
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
