import React, { useEffect, useState } from 'react';
import { fetchCryptoPrices } from '../lib/api';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export default function CryptoPriceWidget() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricesData = async () => {
      try {
        setError(null);
        const data = await fetchCryptoPrices();
        setPrices(data);
      } catch (err) {
        setError('Failed to load prices');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPricesData();
    const interval = setInterval(fetchPricesData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Live Crypto Prices</h2>
        <div className="text-center py-4">Loading latest prices...</div>
      </div>
    );
  }

  if (error || prices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Live Crypto Prices</h2>
        <div className="text-center text-red-500 py-4">
          {error || 'Unable to load cryptocurrency prices'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Live Crypto Prices</h2>
      <div className="space-y-4">
        {prices.map((crypto) => (
          <div key={crypto.symbol} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <div>
              <span className="font-medium">{crypto.symbol}</span>
              <span className="text-sm text-gray-500 ml-2">{crypto.name}</span>
            </div>
            <div className="text-right">
              <div className="font-medium">
                ${crypto.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
              <div className={`text-sm ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-4 text-center">
        Data provided by CoinGecko • Updates every minute
      </div>
    </div>
  );
}