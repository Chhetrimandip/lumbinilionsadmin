"use client"

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { downloadOrdersCSV, downloadDetailedOrdersCsv } from "@/lib/utils"; // Add these imports

// Define the Order type based on your Prisma schema
interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  size?: string;
  price: number;
  name: string;
  imageUrl?: string;
}

interface ShippingAddress {
  id: string;
  orderId: string;
  recipientName: string;
  phoneNumber: string;
  city: string;
  district: string;
  streetAddress: string;
  landmark?: string;
}

interface Payment {
  id: string;
  orderId: string;
  transactionCode?: string;
  transactionUuid?: string;
  status: 'COMPLETED' | 'FAILED';
  amount: number;
  paymentMethod: string;
  paymentProof?: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  OrderItem: OrderItem[];
  ShippingAddress?: ShippingAddress;
  Payment?: Payment;
}

export const OrdersView = ({ orders = [] }: { orders: Order[] }) => {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);
  const [isExporting, setIsExporting] = useState(false);
  // Update local orders when props change
  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  // Filter orders based on search term and status
  const filteredOrders = localOrders.filter(order => {
    const matchesSearch = 
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone?.includes(searchTerm) ||
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customerEmail && order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      currencyDisplay: 'narrowSymbol',
    }).format(amount).replace('रु', 'Rs.');
  };

  // Handle order selection
  const handleOrderClick = (order: Order) => {
    setActiveOrder(order);
    setUpdateError(null);
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle order status update
  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(true);
    setUpdateError(null);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update order status');
      }
      
      const data = await response.json();
      
      // Update local state to reflect the change
      setLocalOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? data.order : order
        )
      );
      
      // Update active order if it's the one being updated
      if (activeOrder?.id === orderId) {
        setActiveOrder(data.order);
      }
      
    } catch (error) {
      console.error('Error updating order status:', error);
      setUpdateError(error.message || 'Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };


  //handle bulk csv download
  const handleBulkExport = useCallback(() => {
  try {
    setIsExporting(true);
    downloadOrdersCSV(filteredOrders);
  } catch (error) {
    console.error('CSV export error:', error);
    alert('Failed to export orders. Please try again.');
  } finally {
    setIsExporting(false);
  }
}, [filteredOrders]);

const handleDetailedExport = useCallback((order) => {
  try {
    setIsExporting(true);
    downloadDetailedOrdersCsv(order);
  } catch (error) {
    console.error('CSV export error:', error);
    alert('Failed to export order details. Please try again.');
  } finally {
    setIsExporting(false);
  }
}, []);
  return (
    <div className="flex flex-col space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Status filter */}
          <select
            className="w-full md:w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          {/* Add Export CSV button */}
          <button 
            onClick={handleBulkExport}
            disabled={filteredOrders.length === 0 || isExporting}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filteredOrders.length === 0 || isExporting
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
            } flex items-center justify-center`}
          >
            {isExporting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Export All ({filteredOrders.length})
              </>
            )}
          </button>
        </div>
      </div>

      {/* Orders display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders list */}
        <div className="lg:col-span-1 border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h2 className="font-semibold">Orders List ({filteredOrders.length})</h2>
          </div>
          
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
              <div 
                key={order.id}
                className={`p-4 cursor-pointer transition hover:bg-gray-50 ${activeOrder?.id === order.id ? 'bg-blue-50' : ''}`}
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-500">#{order.id.substring(0, 8)}</span>
                    <h3 className="font-medium">{order.customerName}</h3>
                    <p className="text-sm text-gray-600">{order.customerPhone}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-semibold mt-1">{formatCurrency(order.totalAmount)}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(order.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-gray-500">
                No orders match your search criteria
              </div>
            )}
          </div>
        </div>
        
        {/* Order details */}
        <div className="lg:col-span-2 border rounded-lg">
          {activeOrder ? (
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold">Order #{activeOrder.id.substring(0, 8)}</h2>
                  <p className="text-sm text-gray-500">
                    Created on {format(new Date(activeOrder.createdAt), 'MMMM d, yyyy h:mm a')}
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(activeOrder.status)}`}>
                    {activeOrder.status}
                  </span>
                  
                      {/* Add Export Details button */}
                      <button
                        onClick={() => handleDetailedExport(activeOrder)}
                        disabled={isExporting}
                        className={`text-sm px-3 py-1 rounded-full font-medium flex items-center ${
                          isExporting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {isExporting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Exporting...
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            Export Details
                          </>
                        )}
                      </button>

                  {/* Status update dropdown */}
                  <div className="flex flex-col w-full md:w-auto">
                    <div className="flex items-center">
                      <select 
                        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                        value={activeOrder.status}
                        onChange={(e) => handleStatusUpdate(activeOrder.id, e.target.value)}
                        disabled={updatingStatus}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                      
                      {updatingStatus && (
                        <svg className="animate-spin h-5 w-5 ml-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                    </div>
                    
                    {updateError && (
                      <p className="text-xs text-red-500 mt-1">{updateError}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Order sections */}
              <div className="space-y-8">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><span className="font-medium">Name:</span> {activeOrder.customerName}</p>
                    <p><span className="font-medium">Phone:</span> {activeOrder.customerPhone}</p>
                    {activeOrder.customerEmail && (
                      <p><span className="font-medium">Email:</span> {activeOrder.customerEmail}</p>
                    )}
                  </div>
                </div>
                
                {/* Shipping Address */}
                {activeOrder.ShippingAddress && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><span className="font-medium">Recipient:</span> {activeOrder.ShippingAddress.recipientName}</p>
                      <p><span className="font-medium">Phone:</span> {activeOrder.ShippingAddress.phoneNumber}</p>
                      <p><span className="font-medium">Address:</span> {activeOrder.ShippingAddress.streetAddress}</p>
                      <p><span className="font-medium">District:</span> {activeOrder.ShippingAddress.district}</p>
                      <p><span className="font-medium">City:</span> {activeOrder.ShippingAddress.city}</p>
                      {activeOrder.ShippingAddress.landmark && (
                        <p><span className="font-medium">Landmark:</span> {activeOrder.ShippingAddress.landmark}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                  <div className="bg-gray-50 rounded-lg divide-y">
                    {activeOrder.OrderItem.map((item) => (
                      <div key={item.id} className="p-4 flex items-center">
                        {item.imageUrl && (
                          <div className="w-16 h-16 mr-4 bg-gray-200 rounded flex-shrink-0">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="text-sm text-gray-500">
                            <span>Qty: {item.quantity}</span>
                            {item.size && <span className="ml-2">Size: {item.size}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(item.price)}</p>
                          <p className="text-sm text-gray-500">Total: {formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Payment Information */}
                {activeOrder.Payment && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <span className="font-medium">Status:</span> 
                        <span className={activeOrder.Payment.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'}>
                          {activeOrder.Payment.status}
                        </span>
                      </p>
                      <p><span className="font-medium">Method:</span> {activeOrder.Payment.paymentMethod}</p>
                      <p><span className="font-medium">Amount:</span> {formatCurrency(activeOrder.Payment.amount)}</p>
                      {activeOrder.Payment.transactionCode && (
                        <p><span className="font-medium">Transaction Code:</span> {activeOrder.Payment.transactionCode}</p>
                      )}
                      {activeOrder.Payment.paymentProof && (
                        <div className="mt-2">
                          <p className="font-medium">Payment Proof:</p>
                          <a 
                            href={activeOrder.Payment.paymentProof} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Attachment
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Order Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between py-2">
                      <span>Subtotal</span>
                      <span>{formatCurrency(activeOrder.totalAmount)}</span>
                    </div>
                    <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
                      <span>Total</span>
                      <span>{formatCurrency(activeOrder.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};