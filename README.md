# المساعدة القانونية المغربية (Moroccan Legal Help)

A digital platform providing legal information, document generation, and consultation services tailored to Moroccan law.

## Overview

The Moroccan Legal Help application serves as a digital legal assistant for users seeking information about Moroccan law. The platform bridges the gap between legal complexity and everyday users by providing accessible legal guidance, document generation capabilities, and consultation services.

## Features

- **Legal Document Generation**: Create customized legal documents according to Moroccan law
- **Document Library**: Access a comprehensive collection of legal templates and documents
- **AI-Powered Legal Assistant**: Get intelligent recommendations for legal documents based on your needs
- **Legal Consultation Services**: Submit questions to receive personalized advice from legal experts
- **User Authentication**: Secure account management with personalized dashboards
- **Responsive Design**: Fully optimized for desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Authentication**: Next Auth
- **State Management**: React Context API
- **Icons**: React Icons
- **AI Integration**: n8n Chat for document recommendations

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/moroccan-law-app.git
cd moroccan-law-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_CHAT_WEBHOOK_URL=your_n8n_webhook_url
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Project Structure

- `/app` - Main application code using Next.js App Router
  - `/components` - Reusable UI components
  - `/styles` - CSS modules and global styles
  - `/context` - React Context providers
  - `/api` - API routes
  - `/auth` - Authentication pages and logic
  - `/data` - Static data files

## Deployment

This application can be easily deployed to Vercel:

```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or feedback, please reach out to: contact@moroccanlegalhelp.com