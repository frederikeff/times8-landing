// src/utils/beehiiv.ts
export async function addSubscriberToBeehiiv(email: string) {
    try {
      const response = await fetch(`https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Beehiiv API error:', error);
      throw error;
    }
  }