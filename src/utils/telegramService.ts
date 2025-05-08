
// In a production environment, these values should come from environment variables
// and the API calls should be handled by a server-side function
// NEVER store API tokens directly in client-side code

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "YOUR_CHAT_ID";

interface OrderData {
  name: string;
  email: string;
  walletAddress: string;
  cryptoType: string;
  message: string;
  productName: string;
}

/**
 * Sends order data to a Telegram bot
 * In a real application, this should be handled by a server-side function
 * to keep your bot token secure
 */
export const sendOrderToTelegram = async (data: OrderData) => {
  // For demonstration purposes only - in a real app this should be handled server-side
  // This is a placeholder to show the concept
  console.log("Sending order to Telegram", data);
  
  const message = `
🔔 New Order Received!

Product: ${data.productName}
Name: ${data.name}
Email: ${data.email}
Crypto: ${data.cryptoType}
Wallet: ${data.walletAddress}
${data.message ? `Message: ${data.message}` : ''}
`;

  try {
    // In a real app, this would be a server-side API endpoint
    // that securely handles the Telegram API call
    const response = await mockTelegramApiCall(message);
    return response;
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    throw new Error("Failed to send message to Telegram");
  }
};

// This is a mock function that simulates the API call
// In a real app, you would use fetch to call your backend API
const mockTelegramApiCall = async (message: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log the message that would be sent to Telegram
  console.log("Telegram message content:", message);
  
  // Simulate successful response
  return { ok: true, result: { message_id: Date.now() } };
};
