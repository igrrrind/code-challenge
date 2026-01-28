import { priceQuery } from '../client';

export const fetchPrices = async (): Promise<ITokenPrice[]> => {
  const response = await priceQuery.get<ITokenPrice[]>('/prices.json');
  const data = response.data;

  // Filter unique tokens by currency and keep the latest price
  return data.reduce<ITokenPrice[]>((acc, curr) => {
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
};
