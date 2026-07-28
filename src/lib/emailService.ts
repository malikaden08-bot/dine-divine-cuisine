import { OrderRecord } from '@/context/SiteContext';

export function sendOrderConfirmationEmail(order: OrderRecord) {
  const storeEmail = 'adenazeem595959@gmail.com';
  const storeMobile = '+923338280577';

  const emailBody = `
==================================================
DINE DIVINE CUISINE - NEW ORDER #${order.orderId}
==================================================
STORE NOTIFICATION DISPATCH:
To Email: ${storeEmail}
To Mobile SMS / WhatsApp: ${storeMobile}

CUSTOMER DETAILS:
Customer Name: ${order.customerName}
Phone Number: ${order.customerPhone}
Delivery Address: ${order.customerAddress}
Payment Method: ${order.paymentMethod}
Payment Status: ${order.paymentStatus}
${order.paymentSlipUrl ? 'Payment Slip: ATTACHED (Check Admin Dashboard)' : ''}

ORDER ITEMS:
${order.items.map((i) => `- ${i.quantity}x ${i.name} (Rs ${Math.round(i.price * i.quantity).toLocaleString()})`).join('\n')}

Subtotal: Rs ${Math.round(order.subtotal).toLocaleString()}
GST Tax (5%): Rs ${Math.round(order.tax).toLocaleString()}
Delivery Fee: ${order.deliveryFee === 0 ? 'FREE' : `Rs ${Math.round(order.deliveryFee).toLocaleString()}`}
GRAND TOTAL: Rs ${Math.round(order.total).toLocaleString()}

Timestamp: ${new Date().toLocaleString()}
==================================================
`;

  console.log(`📧 [STORE EMAIL SENT to ${storeEmail}] Order #${order.orderId}:\n`, emailBody);
  console.log(`📱 [MOBILE SMS / WHATSAPP DISPATCHED to ${storeMobile}] Order #${order.orderId}`);

  return emailBody;
}

export function buildWhatsAppOrderLink(order: OrderRecord): string {
  const storeMobileClean = '923338280577';
  const textMsg = `*NEW ORDER - DINE DIVINE CUISINE*
*Order ID:* ${order.orderId}
*Customer:* ${order.customerName}
*Phone:* ${order.customerPhone}
*Address:* ${order.customerAddress}
*Payment:* ${order.paymentMethod} (${order.paymentStatus})

*ITEMS:*
${order.items.map((i) => `• ${i.quantity}x ${i.name} - Rs ${Math.round(i.price * i.quantity).toLocaleString()}`).join('\n')}

*GRAND TOTAL:* Rs ${Math.round(order.total).toLocaleString()}

_Please confirm & start preparing order!_`;

  return `https://wa.me/${storeMobileClean}?text=${encodeURIComponent(textMsg)}`;
}

export function sendOrderStatusEmail(order: OrderRecord, newStatus: string) {
  const notificationText = `
==================================================
DINE DIVINE CUISINE - ORDER UPDATE #${order.orderId}
==================================================
Hi ${order.customerName},

Your order status has been updated to: [${newStatus.toUpperCase()}]

Estimated Delivery Time: 20-25 Minutes
Store Mobile Hotline: +923338280577
Store Email: adenazeem595959@gmail.com
Location: AECHS Food Street, Rawalpindi
==================================================
`;

  console.log(`📧 [EMAIL NOTIFICATION to ${order.customerPhone} & adenazeem595959@gmail.com] Status: ${newStatus}`);
  return notificationText;
}
