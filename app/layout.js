export const metadata = {
  title: "SEO Chatbot API",
  description: "API proxy for SEO Audit Chrome Extension"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

