import { useQuery } from '@tanstack/react-query';
import { fetchPrices } from '../services/prices.service';
import { API_CONFIG } from '../../common/config';

/**
 * Custom hook for prices using TanStack React Query.
 * This provides industry-standard caching, revalidation, and state management.
 */
export const usePrices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    staleTime: API_CONFIG.PRICES_STALE_TIME_MS,
  });
  
  return { 
    prices: data ?? [], 
    loading: isLoading, 
    error: error ? error.message : null 
  };
};
