import axios from 'axios';

export async function getChatAPIResponse(content) {
  try {
    const response = await axios.post('/api/chat', { content });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat data:', error);
    throw error;
  }
}
