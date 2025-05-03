import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',  // Optional: Specify the base URL if necessary
});

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
    });

    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ success: true, response: aiResponse });
  } catch (error) {
    console.error('AI Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while contacting OpenAI.',
    });
  }
};
