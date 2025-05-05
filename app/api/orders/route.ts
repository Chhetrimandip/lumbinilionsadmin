// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
// import { uploadToCloudinary } from '@/lib/cloudinary'; // Assume you have this utility
//todo after asking

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const orderDataStr = formData.get('orderData') as string;
    const paymentProofFile = formData.get('paymentProof') as File;
    
    if (!orderDataStr) {
      return NextResponse.json(
        { error: 'No order data provided' },
        { status: 400 }
      );
    }
    
    // Parse the order data
    const orderData = JSON.parse(orderDataStr);
    
    // If there's a payment proof file, upload it
    {/*let paymentProofUrl = null;
    if (paymentProofFile) {
      paymentProofUrl = await uploadToCloudinary(paymentProofFile);
    }*/}//todo after asking not doing might be better blanxers system is commendable tho
    const paymentProofUrl = null;
    // since dont know what we will want to implement a little later/ todo
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
          
          // Create payment
          payment: {
            create: {
              status: "COMPLETED",
              amount: orderData.payment.amount,
              paymentMethod: orderData.payment.paymentMethod,
              transactionCode: orderData.payment.transactionCode || null,
              transactionUuid: orderData.payment.transactionUuid || null,
              paymentProof: paymentProofUrl
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
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}