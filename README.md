# Fintech AI Chatbot

A modern, responsive AI chatbot interface for financial services, built with React and Tailwind CSS.

## Features

- Real-time chat interface with AI assistant
- Secure API key management
- Clean, responsive design
- Built with Vite + React

## Live Demo

[Deploy on Vercel](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL&env=VITE_OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key&project-name=fintech-chatbot&repository-name=fintech-chatbot)

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fintech-chatbot.git
   cd fintech-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the project root
   - Add your OpenAI API key:
     ```
     VITE_OPENAI_API_KEY=your-api-key-here
     ```
   - Get an API key from [OpenAI](https://platform.openai.com/api-keys)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Visit `http://localhost:5173`
   - The app will use the API key from your `.env.local` file

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Add your OpenAI API key in the environment variables
5. Deploy!

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key (starts with `sk-`) |

## Security Note

For production use, consider:
- Using a backend server to handle API calls
- Implementing rate limiting
- Using environment variables in your deployment platform

## License

MIT

---

Built with ❤️ for fintech applications
