'use client'
import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cart, addtocart, removefromcart, decreaseQuantity, totalitem, totalprice, clearcart } = useCartStore();
  const router = useRouter();
  
  // Add null checks and defaults
  const totalAmount = totalprice();
  const formattedTotal = (totalAmount || 0).toFixed(2);
  const itemCount = totalitem() || 0;
  
  // Track shipping information
  const [shippingData, setShippingData] = useState({
    recipientName: '',
    phoneNum: '',
    region: '',
    address: '',
    landmark: '',
    district: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData({
      ...shippingData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    const missingFields = [];
    if (!shippingData.recipientName) missingFields.push('Recipient name');
    if (!shippingData.phoneNum) missingFields.push('Phone number');
    if (!shippingData.region) missingFields.push('Region');
    if (!shippingData.address) missingFields.push('Address');
    if (!shippingData.email) missingFields.push('Email');
    
    if (missingFields.length > 0) {
      alert(`Please complete the following fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      // Calculate total with shipping
      const totalWithShipping = (parseFloat(formattedTotal) + 5).toFixed(2);
      
      // Prepare the order data
      const orderData = {
        customerName: shippingData.recipientName,
        customerPhone: shippingData.phoneNum,
        customerEmail: shippingData.email,
        totalAmount: totalWithShipping,
        
        // Shipping address details
        shippingAddress: {
          recipientName: shippingData.recipientName,
          phoneNumber: shippingData.phoneNum,
          city: shippingData.region,
          district: shippingData.district,
          streetAddress: shippingData.address,
          landmark: shippingData.landmark || ""
        },
        
        // Payment details
        payment: {
          status: "PENDING", // Changed to PENDING for COD
          amount: totalWithShipping,
          paymentMethod: "cash_on_delivery"
        },
        
        // Cart items
        orderItems: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          imageUrl: item.image
        }))
      };

      // Make the API call to save the data
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      
      const result = await response.json();
      alert('Your order has been placed successfully! We will contact you shortly to confirm your order.');
      clearcart();
      
      // Redirect to confirmation or home page
      router.push('/');
      
    } catch (error) {
      alert('There was a problem placing your order. Please try again.');
    }
  };
  
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4 flex flex-col items-center justify-center">
        <div className="bg-neutral-800 rounded-xl p-8 max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-['Bebas_Neue'] text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/shop" className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return ( 
    <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-['Bebas_Neue'] text-amber-500 mb-8">
          <span className="text-amber-500">|</span> YOUR CART
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-800 rounded-xl overflow-hidden mb-8">
              <div className="px-6 py-4 bg-amber-500 text-black font-['Bebas_Neue'] text-xl flex justify-between items-center">
                <span>Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <button 
                  onClick={clearcart}
                  className="text-sm bg-neutral-800 text-white px-3 py-1 rounded hover:bg-neutral-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-neutral-700">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4">
                    <div className="w-24 h-24 bg-neutral-700 rounded flex-shrink-0 relative">
                      <Image 
                        src={item.image || "/jersey.webp"}
                        alt={item.name || "Product"}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-white font-medium mb-1">{item.name || `Product #${item.id}`}</h3>
                      <p className="text-amber-500 font-bold">Rs{(item.price || 0).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center border border-neutral-600 rounded-lg mr-4">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-3 py-1 text-lg text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-white">{item.quantity}</span>
                        <button 
                          onClick={() => addtocart({
                            id: item.id,
                            price: item.price,
                            name: item.name,
                            image: item.image
                          })}
                          className="px-3 py-1 text-lg text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removefromcart(item.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Payment - Takes up 1 column */}
          <div className="lg:col-span-1">
            {/* Order Summary */}
            <div className="bg-neutral-800 rounded-xl overflow-hidden mb-8">
              <div className="px-6 py-4 bg-amber-500 text-black font-['Bebas_Neue'] text-xl">
                Order Summary
              </div>
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="text-white">Rs{formattedTotal}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Shipping:</span>
                  <span className="text-white">Rs5.00</span>
                </div>
                <div className="border-t border-neutral-700 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg text-white font-bold">Total:</span>
                    <span className="text-lg text-amber-500 font-bold">Rs{(parseFloat(formattedTotal) + 5).toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-white text-lg mb-4">Payment Method</h3>
                  
                  <div className="p-4 bg-neutral-700 rounded-lg flex items-center">
                    <input 
                      type="radio" 
                      id="payment-cash" 
                      name="payment" 
                      checked={true}
                      readOnly
                      className="mr-3"
                    />
                    <label htmlFor="payment-cash" className="text-white flex-grow">Cash on Delivery</label>
                  </div>
                  
                  <p className="text-gray-400 text-sm mt-3">
                    Pay with cash when your order is delivered to your address.
                  </p>
                </div>

                <button 
                  onClick={() => document.getElementById('shipping-form').scrollIntoView({behavior: 'smooth'})}
                  className="py-3 px-6 w-full text-center text-black bg-amber-500 hover:bg-amber-600 rounded-lg font-bold transition-colors block"
                >
                  Continue to Shipping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div id="shipping-form" className="bg-neutral-800 rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 bg-amber-500 text-black font-['Bebas_Neue'] text-xl">
            Shipping Information
          </div>
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white mb-2">Recipient Name</label>
              <input 
                type="text"
                name="recipientName"
                value={shippingData.recipientName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-amber-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Phone Number</label>
              <input 
                type="text"
                name="phoneNum"
                value={shippingData.phoneNum}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-amber-500"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Email Address</label>
              <input 
                type="email"
                name="email"
                value={shippingData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-amber-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Region/City</label>
              <input 
                type="text"
                name="region"
                value={shippingData.region}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-amber-500"
                placeholder="Enter your city or region"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Address</label>
              <input 
                type="text"
                name="address"
                value={shippingData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-amber-500"
                placeholder="Enter your street address"
              />
            </div>

            <div>
              <label className="block text-white mb-2">District</label>
              <input 
                type="text"
                name="district"
                value={shippingData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-amber-500"
                placeholder="Enter your district"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white mb-2">Landmark (Optional)</label>
              <input 
                type="text"
                name="landmark"
                value={shippingData.landmark}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-amber-500"
                placeholder="Nearby landmark to help with delivery"
              />
            </div>

            <div className="md:col-span-2">
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-400">Cash on Delivery Information</h3>
                    <p className="text-blue-300 text-sm mt-1">
                      Your order will be delivered to the address provided above. Payment will be collected upon delivery.
                      Our team might call you to confirm your order before shipping.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-4">
              <Link 
                href="/shop" 
                className="py-3 px-6 text-center text-white bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
              <button 
                type="submit" 
                className="py-3 px-10 rounded-lg font-bold text-black bg-amber-500 hover:bg-amber-600 transition-colors"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default CartPage;