import { useState, useEffect } from 'react';

export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

const PRICE_URL = 'https://interview.switcheo.com/prices.json';

export const usePrices = () => {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(PRICE_URL)
      .then((res) => res.json())
      .then((data: TokenPrice[]) => {
        // Filter unique tokens by currency and keep the latest price
        const uniquePrices = data.reduce<TokenPrice[]>((acc, curr) => {
          const existing = acc.find(p => p.currency === curr.currency);
          if (!existing || new Date(curr.date) > new Date(existing.date)) {
            if (existing) {
              const index = acc.indexOf(existing);
              acc[index] = curr;
            } else {
              acc.push(curr);
            }
          }
          return acc;
        }, []);
        setPrices(uniquePrices);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch prices:', err);
        setError('Failed to load currency data.');
        setLoading(false);
      });
  }, []);

  return { prices, loading, error };
};
