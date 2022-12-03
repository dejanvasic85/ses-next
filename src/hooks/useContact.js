import { useState } from 'react';

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const sendMessage = (data) => {
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
