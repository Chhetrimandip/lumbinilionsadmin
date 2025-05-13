import { randomUUID } from "crypto";

export function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/&/g, '-and-')     // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')   // Remove all non-word characters
      .replace(/\-\-+/g, '-');    // Replace multiple - with single -
  }

/*
  fansdata type: object
FanView.tsx:23 fansdata value: Array(5)


/* The URI (Uniform Resource Identifier) in this context isn't exactly a link in the traditional sense of a web URL. In the code, the URI is actually a data URI scheme which is a way to embed data directly in a document.

Let me explain what's happening in the `downloadcsv` function:

1. The data URI scheme `data:text/plain;charset=utf-8,` is used to specify:
  - `data:` - This is a data URI
  - `text/plain` - The MIME type
  - `charset=utf-8` - Character encoding
  - `,` - Separator before the actual data

2. `encodeURIComponent(text)` ensures that special characters in your text are properly escaped so they don't break the data URI format.

If you don't encode the URI component:
- Special characters like spaces, newlines, and symbols would break the data URI
- Browsers might misinterpret parts of your data as URI syntax
- The file content could be corrupted or truncated

You should absolutely keep the `encodeURIComponent()` for proper and reliable functionality.

Always check the correctness of AI-generated responses.*/
// ...existing code...

export function downloadcsv(fansArray: {id:string, name:string, email:string, phone:string, score:number, time:number}[]) {
  // Helper function to escape CSV fields properly
  const escapeCSV = (field: any) => {
    const stringField = String(field);
    // If the field contains quotes, commas, or newlines, it needs to be quoted and quotes need to be escaped
    if (stringField.includes('"') || stringField.includes(',') || stringField.includes('\n')) {
      // Double any quotes in the field (CSV escape rule)
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  };

  // Create CSV header
  const header = 'id,name,email,phone,score,time';
  
  // Generate rows with proper escaping
  const rows = fansArray.map(fan => {
    return [
      escapeCSV(fan.id),
      escapeCSV(fan.name),
      escapeCSV(fan.email),
      escapeCSV(fan.phone),
      escapeCSV(fan.score),
      escapeCSV(fan.time)
    ].join(',');
  });
  
  // Join header and rows
  const csvString = `${header}\n${rows.join('\n')}`;
  
  // Create the download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  
  const element = document.createElement('a');
  element.setAttribute('href', url);
  // Add date to filename for better organization
  const date = new Date().toISOString().split('T')[0];
  element.setAttribute('download', `fans-export-${date}.csv`);
  
  element.style.display = 'none';
  document.body.appendChild(element);
  
  element.click();
  
  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(element);
}

export function downloadDetailedOrdersCsv(order: Order) {
  if (!order) return;
  
  const escapeCSV = (field: any) => {
    if (field === null || field === undefined) return '';
    
    const stringField = String(field);
    if (stringField.includes('"') || stringField.includes(',') || stringField.includes('\n')) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return dateString;
    }
  };
  
  let csvContent = '';
  
  // Order details
  csvContent += 'ORDER DETAILS\n';
  csvContent += 'Order ID,Status,Total Amount,Created Date,Updated Date\n';
  csvContent += `${escapeCSV(order.id)},${escapeCSV(order.status)},${escapeCSV(order.totalAmount)},${escapeCSV(formatDate(order.createdAt))},${escapeCSV(formatDate(order.updatedAt))}\n\n`;
  
  // Customer details
  csvContent += 'CUSTOMER DETAILS\n';
  csvContent += 'Name,Phone,Email\n';
  csvContent += `${escapeCSV(order.customerName)},${escapeCSV(order.customerPhone)},${escapeCSV(order.customerEmail || '')}\n\n`;
  
  // Shipping address if available
  if (order.ShippingAddress) {
    csvContent += 'SHIPPING ADDRESS\n';
    csvContent += 'Recipient,Phone,Street Address,City,District,Landmark\n';
    csvContent += `${escapeCSV(order.ShippingAddress.recipientName)},${escapeCSV(order.ShippingAddress.phoneNumber)},${escapeCSV(order.ShippingAddress.streetAddress)},${escapeCSV(order.ShippingAddress.city)},${escapeCSV(order.ShippingAddress.district)},${escapeCSV(order.ShippingAddress.landmark || '')}\n\n`;
  }
  
  // Payment details if available
  if (order.Payment) {
    csvContent += 'PAYMENT DETAILS\n';
    csvContent += 'Method,Status,Amount,Transaction Code,Transaction UUID\n';
    csvContent += `${escapeCSV(order.Payment.paymentMethod)},${escapeCSV(order.Payment.status)},${escapeCSV(order.Payment.amount)},${escapeCSV(order.Payment.transactionCode || '')},${escapeCSV(order.Payment.transactionUuid || '')}\n\n`;
  }
  
  // Order items
  if (order.OrderItem && order.OrderItem.length > 0) {
    csvContent += 'ORDER ITEMS\n';
    csvContent += 'Product ID,Name,Quantity,Size,Unit Price,Total Price\n';
    
    order.OrderItem.forEach(item => {
      csvContent += `${escapeCSV(item.productId)},${escapeCSV(item.name)},${escapeCSV(item.quantity)},${escapeCSV(item.size || '')},${escapeCSV(item.price)},${escapeCSV(Number(item.price) * item.quantity)}\n`;
    });
    csvContent += '\n';
  }
  
  // Create download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', `order-${order.id}-details.csv`);
  
  element.style.display = 'none';
  document.body.appendChild(element);
  
  element.click();
  
  window.URL.revokeObjectURL(url);
  document.body.removeChild(element);
}

export function downloadOrdersCSV(orders: Order[])  {
  if (!orders || orders.length === 0) return;

  // Helper function to escape CSV fields properly
  const escapeCSV = (field: any) => {
    if (field === null || field === undefined) return '';
    
    const stringField = String(field);
    if (stringField.includes('"') || stringField.includes(',') || stringField.includes('\n')) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  // Create CSV header
  const header = 'Order ID,Customer Name,Phone,Email,Status,Total Amount,Items Count,Created Date';
  
  // Generate rows with proper escaping
  const rows = orders.map(order => {
    return [
      escapeCSV(order.id),
      escapeCSV(order.customerName),
      escapeCSV(order.customerPhone),
      escapeCSV(order.customerEmail || ''),
      escapeCSV(order.status),
      escapeCSV(order.totalAmount),
      escapeCSV(order.OrderItem?.length || 0),
      escapeCSV(formatDate(order.createdAt))
    ].join(',');
  });
  
  // Join header and rows
  const csvString = `${header}\n${rows.join('\n')}`;
  
  // Create the download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  
  const element = document.createElement('a');
  element.setAttribute('href', url);
  // Add date to filename for better organization
  const date = new Date().toISOString().split('T')[0];
  element.setAttribute('download', `orders-export-${date}.csv`);
  
  element.style.display = 'none';
  document.body.appendChild(element);
  
  element.click();
  
  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(element);
};