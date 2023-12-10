
import { useEffect, useState } from 'react';

export function useFetcher(apiUrl) {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        setApiData(responseData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [apiUrl]);

  return { apiData, loading, error };
}