import { useState, useEffect } from 'react';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useApi<T>(fetcher: () => Promise<T>): UseApiState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const result = await fetcher();
                if (isMounted) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'An error occurred');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, loading, error };
}
