import axios from 'axios';
import qs from 'qs'; // Important!

async function getZoomAccessToken() {
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await axios.post('https://zoom.us/oauth/token', 
    qs.stringify({ grant_type: 'account_credentials', account_id: process.env.ZOOM_ACCOUNT_ID }), 
    {
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );

  return response.data.access_token;
}

export default getZoomAccessToken