import type { APIRoute } from 'astro';
import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'OpenAI API is not configured'
      }),
      { 
        status: 500,
        headers
      }
    );
  }

  try {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          ...headers,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    const body = await request.json().catch(() => null);
    
    if (!body?.message || typeof body.message !== 'string') {
      return new Response(
        JSON.stringify({
          error: 'Invalid request body'
        }),
        { 
          status: 400,
          headers
        }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable legal assistant specializing in cryptocurrency and blockchain law. Provide accurate, up-to-date information about crypto regulations, compliance requirements, and legal considerations. If you're unsure about something, acknowledge the uncertainty and suggest consulting with a qualified legal professional."
        },
        {
          role: "user",
          content: body.message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return new Response(
      JSON.stringify({
        response: completion.choices[0].message.content
      }),
      { 
        status: 200,
        headers
      }
    );
  } catch (error) {
    console.error('Chat API Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return new Response(
      JSON.stringify({
        error: errorMessage
      }),
      { 
        status: 500,
        headers
      }
    );
  }
}