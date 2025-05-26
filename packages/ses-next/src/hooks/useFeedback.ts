import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { FeedbackFormData } from '@/src/types';

const feedbackStorageKey = 'feature-feedback';

export function useFeedback() {
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackSent, setFeedbackSent] = useLocalStorage<boolean>('feature-feedback', false);

  const sendFeedback = (data: FeedbackFormData): void => {
    setLoading(true);
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setFeedbackSent(true);
        setLoading(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem(feedbackStorageKey, 'true');
        }
      });
  };

  return {
    loading,
    feedbackSent,
    sendFeedback,
  };
}
