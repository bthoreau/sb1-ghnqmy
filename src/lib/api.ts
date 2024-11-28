import axios from 'axios';

export async function fetchCryptoPrices() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24h_change=true'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }

    const data = await response.json();
    
    if (!data.bitcoin?.usd || !data.ethereum?.usd || !data.solana?.usd) {
      throw new Error('Invalid price data received');
    }
    
    return [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: data.bitcoin.usd || 0,
        change24h: data.bitcoin.usd_24h_change || 0
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: data.ethereum.usd || 0,
        change24h: data.ethereum.usd_24h_change || 0
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        price: data.solana.usd || 0,
        change24h: data.solana.usd_24h_change || 0
      }
    ];
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return [];
  }
}

export async function fetchNews(page = 1) {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=latest&page=${page - 1}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    
    if (!data.Data) {
      throw new Error('Invalid news data received');
    }

    // CryptoCompare returns 50 articles per page, we'll limit it to 10 per page
    const startIndex = (page - 1) * 10 % 50;
    const articles = data.Data.slice(startIndex, startIndex + 10).map(article => ({
      title: article.title,
      description: article.body,
      url: article.url,
      imageUrl: article.imageurl,
      publishedAt: new Date(article.published_on * 1000).toISOString(),
      source: {
        name: article.source
      }
    }));

    return {
      articles,
      totalResults: Math.min(data.Data.length * 5, 100) // Limit to 100 articles total (10 pages)
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      articles: [],
      totalResults: 0
    };
  }
}