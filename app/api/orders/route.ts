import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    // Parse JSON directly from request body instead of FormData
    const orderData = await req.json();
    
    if (!orderData) {
      return NextResponse.json(
        { error: 'No order data provided' },
        { status: 400 }
      );
    }
    
    // Create the order in a transaction to ensure all related data is saved together
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          customerName: orderData.customerName,
          customerPhone: orderData.customerPhone,
          customerEmail: orderData.customerEmail || null,
          totalAmount: orderData.totalAmount,
          
          // Create shipping address
          shippingAddress: {
            create: {
              recipientName: orderData.shippingAddress.recipientName,
              phoneNumber: orderData.shippingAddress.phoneNumber,
              city: orderData.shippingAddress.city,
              district: orderData.shippingAddress.district || "Not specified",
              streetAddress: orderData.shippingAddress.streetAddress,
              landmark: orderData.shippingAddress.landmark || null, 
            }
          },
          
          // Create payment - adjusted for cash on delivery
          payment: {
            create: {
              status: "PENDING", // Changed to match frontend
              amount: orderData.payment.amount,
              paymentMethod: orderData.payment.paymentMethod,
              // These fields are likely empty for COD
              transactionCode: orderData.payment.transactionCode || null,
              transactionUuid: orderData.payment.transactionUuid || null,
              paymentProof: null // No payment proof for COD
            }
          },
          
          // Create order items
          orderItems: {
            createMany: {
              data: orderData.orderItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                imageUrl: item.imageUrl || null,
                size: item.size || null
              }))
            }
          }
        }
      });
      
      return newOrder;
    });
    
    return NextResponse.json({
      success: true,
      orderId: order.id
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}