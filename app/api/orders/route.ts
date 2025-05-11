import { NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch orders with related items and shipping addresses
    const orders = await prisma.order.findMany({
      include: {
        OrderItem: true,
        ShippingAddress: true,
        Payment: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.orderId || !body.status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }
    
    // Validate status is one of the allowed values
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Update the order status
    const updatedOrder = await prisma.order.update({
      where: {
        id: body.orderId
      },
      data: {
        status: body.status
      },
      include: {
        OrderItem: true,
        ShippingAddress: true,
        Payment: true
      }
    });
    
    return NextResponse.json({
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}