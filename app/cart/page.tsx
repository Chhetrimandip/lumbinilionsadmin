'use client'
import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const CartPage = () => {
    const { cart, addtocart, removefromcart, decreaseQuantity, totalitem, totalprice, clearcart } = useCartStore();
    // Add null checks and defaults
    const totalAmount = totalprice();
    const formattedTotal = (totalAmount || 0).toFixed(2);
    const itemCount = totalitem() || 0;
    
    // Get search params for payment processing
    const searchParams = useSearchParams();
    const dataQuery = searchParams.get('data');
    const [paymentData, setPaymentData] = useState(null);
    const [paymentComplete, setPaymentComplete] = useState(false);

    // Payment form data for eSewa
    const [formData, setFormData] = useState({
        amount: "0.00",
        tax_amount: "0.00",
        total_amount: "0.00",
        transaction_uuid: uuidv4(),
        product_service_charge: "0.00",
        product_delivery_charge: "0.00",
        product_code: "EPAYTEST",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:3000/cart", // Change for production
        failure_url: "http://localhost:3000/cart",
        secret: "8gBm/:&EnhH.1/q",
        signature: ""
    });

    // Track shipping information
    const [shippingData, setShippingData] = useState({
        recipientName: '',
        phoneNum: '',
        region: '',
        address: '',
        landmark: '',
        image: null
    });

    // Generate signature for eSewa
    const generateSignature = (
        total_amount: string,
        transaction_uuid: string,
        product_code: string,
        secret: string
    ) => {
        // Create the string to hash in EXACTLY this format
        const signatureData = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
        
        // Use HMAC-SHA256 hashing
        const hash = CryptoJS.HmacSHA256(signatureData, secret);
        
        // Return Base64 encoded string
        return hash.toString(CryptoJS.enc.Base64);
    };

    // Handle data from eSewa response
    useEffect(() => {
        if (dataQuery) {
            try {
                const resData = atob(dataQuery);
                const resObject = JSON.parse(resData);
                setPaymentData(resObject);
                if (resObject.status === "COMPLETE") {
                    setPaymentComplete(true);
                }
            } catch (error) {
                console.error("Error parsing payment data:", error);
            }
        }
    }, [dataQuery]);

    // Update payment form data when cart total changes
    useEffect(() => {
        const newTotalAmount = totalAmount.toFixed(2);
        const newSignature = generateSignature(
            newTotalAmount,
            formData.transaction_uuid,
            formData.product_code,
            formData.secret
        );
        
        setFormData(prev => ({
            ...prev,
            amount: newTotalAmount,
            total_amount: newTotalAmount,
            signature: newSignature
        }));
    }, [totalAmount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingData({
            ...shippingData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setShippingData({
            ...shippingData,
            image: e.target.files[0]
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
        if (!paymentComplete && !shippingData.image) missingFields.push('Payment screenshot');

        if (missingFields.length > 0) {
            alert(`Please complete the following fields: ${missingFields.join(', ')}`);
            return;
        }

        // Create payment reference object
        const paymentRef = paymentData ? {
            transactionCode: paymentData.transaction_code,
            transactionUuid: paymentData.transaction_uuid,
            status: paymentData.status,
            amount: paymentData.total_amount
        } : null;

        // Create form data for submission
        const finalShipData = new FormData();
        finalShipData.append("recipientName", shippingData.recipientName);
        finalShipData.append("phoneNum", shippingData.phoneNum);
        finalShipData.append("region", shippingData.region);
        finalShipData.append("address", shippingData.address);
        finalShipData.append("landmark", shippingData.landmark || "");
        
        if (shippingData.image) {
            finalShipData.append("image", shippingData.image);
        }
        
        if (paymentRef) {
            finalShipData.append("paymentReference", JSON.stringify(paymentRef));
        }
        
        finalShipData.append("items", JSON.stringify(cart));

        // In a real app, you would submit this data to your backend
        console.log('Order submitted:', { shippingData, paymentRef, cart });
        alert('Your order has been placed successfully!');
        clearcart();
        // Redirect to confirmation page or home
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
                                                src={item.image || "/jersey.png"}
                                                alt={item.name || "Product"}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        
                                        <div className="flex-grow text-center sm:text-left">
                                            <h3 className="text-white font-medium mb-1">{item.name || `Product #${item.id}`}</h3>
                                            <p className="text-amber-500 font-bold">${(item.price || 0).toFixed(2)}</p>
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
                                    <span className="text-white">${formattedTotal}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-400">Shipping:</span>
                                    <span className="text-white">$5.00</span>
                                </div>
                                <div className="border-t border-neutral-700 pt-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-lg text-white font-bold">Total:</span>
                                        <span className="text-lg text-amber-500 font-bold">${(parseFloat(formattedTotal) + 5).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* eSewa Payment Form */}
                                <div className="mb-6">
                                    <h3 className="text-white text-lg mb-4">Payment Method</h3>
                                    
                                    {paymentData && paymentData.status === "COMPLETE" ? (
                                        <div className="bg-green-800/20 border border-green-600 rounded-lg p-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <h3 className="font-semibold text-green-400">Payment Successful!</h3>
                                                    <p className="text-green-300">Amount paid: Rs. {paymentData.total_amount}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" className="bg-neutral-700 rounded-lg p-4">
                                            <div className="mb-4">
                                                <span className="block text-gray-300 mb-1">Amount to pay:</span>
                                                <span className="text-xl text-amber-500 font-bold">Rs. {formData.total_amount}</span>
                                            </div>
                                            
                                            {/* Hidden form fields */}
                                            <input type="hidden" readOnly name="amount" value={formData.amount} />
                                            <input type="hidden" readOnly name="tax_amount" value={formData.tax_amount} />
                                            <input type="hidden" readOnly name="total_amount" value={formData.total_amount} />
                                            <input type="hidden" readOnly name="transaction_uuid" value={formData.transaction_uuid} />
                                            <input type="hidden" readOnly name="product_code" value={formData.product_code} />
                                            <input type="hidden" readOnly name="product_service_charge" value={formData.product_service_charge} />
                                            <input type="hidden" readOnly name="product_delivery_charge" value={formData.product_delivery_charge} />
                                            <input type="hidden" readOnly name="success_url" value={formData.success_url} />
                                            <input type="hidden" readOnly name="failure_url" value={formData.failure_url} />
                                            <input type="hidden" readOnly name="signed_field_names" value={formData.signed_field_names} />
                                            <input type="hidden" readOnly name="signature" value={formData.signature} />
                                            
                                            <button type="submit" className="w-full bg-[#60BB46] hover:bg-[#4da339] text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center transition-colors">
                                                <Image 
                                                    src="/esewa.jpg" 
                                                    alt="eSewa" 
                                                    width={24} 
                                                    height={24} 
                                                    className="mr-2"
                                                />
                                                Pay with eSewa
                                            </button>
                                        </form>
                                    )}
                                    
                                    <div className="mt-4 p-4 bg-neutral-700 rounded-lg flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            id="payment-cash" 
                                            name="payment" 
                                            checked={!paymentComplete}
                                            readOnly
                                            className="mr-3"
                                        />
                                        <label htmlFor="payment-cash" className="text-white cursor-pointer flex-grow">Cash on Delivery</label>
                                    </div>
                                </div>

                                {paymentComplete ? (
                                    <button 
                                        onClick={() => document.getElementById('shipping-form').scrollIntoView({behavior: 'smooth'})}
                                        className="py-3 px-6 w-full text-center text-black bg-amber-500 hover:bg-amber-600 rounded-lg font-bold transition-colors block"
                                    >
                                        Complete Shipping Details
                                    </button>
                                ) : (
                                    <div className="text-sm text-gray-400 text-center mt-2">
                                        Please complete payment to proceed with your order.
                                    </div>
                                )}
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
                        
                        {!paymentComplete && (
                            <div className="md:col-span-2">
                                <label className="block text-white mb-2">Upload Payment Screenshot</label>
                                <input 
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-amber-500"
                                />
                                <p className="text-gray-400 text-sm mt-1">
                                    Please upload a screenshot of your payment if not using eSewa.
                                </p>
                            </div>
                        )}

                        <div className="md:col-span-2 flex justify-end gap-4">
                            <Link 
                                href="/shop" 
                                className="py-3 px-6 text-center text-white bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
                            >
                                Continue Shopping
                            </Link>
                            <button 
                                type="submit" 
                                className={`py-3 px-10 rounded-lg font-bold transition-colors ${
                                    paymentComplete 
                                        ? "text-black bg-amber-500 hover:bg-amber-600" 
                                        : "text-gray-300 bg-neutral-600 cursor-not-allowed"
                                }`}
                                disabled={!paymentComplete && !shippingData.image}
                            >
                                Complete Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
 
export default CartPage;