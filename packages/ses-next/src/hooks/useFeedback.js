import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const feedbackStorageKey = 'feature-feedback';

export function useFeedback() {
  const [loading, setLoading] = useState(false);
  const [feedbackSent, setFeedbackSent] = useLocalStorage('feature-feedback', false);

  const sendFeedback = (data) => {
    setLoading(true);
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setFeedbackSent(true);
        setLoading(false);
        localStorage.setItem(feedbackStorageKey, true);
      });
  };

  return {
    loading,
    feedbackSent,
    sendFeedback,
  };
}
