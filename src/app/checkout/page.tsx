'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useDiscountStore } from '@/store/discountStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice, getDiscountedTotal, clearCart } = useCartStore();
  const { discount } = useDiscountStore();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });
  
  // Form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Form stages
  const [checkoutStage, setCheckoutStage] = useState('cart'); // 'cart', 'shipping', 'payment', 'review'
  
  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0 && checkoutStage !== 'success') {
      router.push('/products');
    }
  }, [items.length, router, checkoutStage]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  // Validate form for current stage
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (checkoutStage === 'shipping') {
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.lastName) errors.lastName = 'Last name is required';
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
      }
      if (!formData.phone) errors.phone = 'Phone number is required';
      if (!formData.address) errors.address = 'Address is required';
      if (!formData.city) errors.city = 'City is required';
      if (!formData.state) errors.state = 'State is required';
      if (!formData.zipCode) errors.zipCode = 'ZIP code is required';
    }
    
    if (checkoutStage === 'payment') {
      if (!formData.cardName) errors.cardName = 'Name on card is required';
      if (!formData.cardNumber) {
        errors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Card number is invalid';
      }
      if (!formData.expiration) {
        errors.expiration = 'Expiration date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiration)) {
        errors.expiration = 'Use format MM/YY';
      }
      if (!formData.cvv) {
        errors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = 'CVV is invalid';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Move to next stage
  const handleContinue = () => {
    if (validateForm()) {
      if (checkoutStage === 'cart') setCheckoutStage('shipping');
      else if (checkoutStage === 'shipping') setCheckoutStage('payment');
      else if (checkoutStage === 'payment') setCheckoutStage('review');
    }
  };
  
  // Move to previous stage
  const handleBack = () => {
    if (checkoutStage === 'shipping') setCheckoutStage('cart');
    else if (checkoutStage === 'payment') setCheckoutStage('shipping');
    else if (checkoutStage === 'review') setCheckoutStage('payment');
  };
  
  // Submit order
  const handleSubmitOrder = () => {
    // In a real app, you would submit the order to your backend here
    // For now, we'll just simulate a successful order
    setCheckoutStage('success');
    clearCart();
  };
  
  // Calculate totals
  const subtotal = getTotalPrice();
  const discountAmount = discount > 0 ? (subtotal * (discount / 100)) : 0;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal - discountAmount + shipping + tax;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className="pt-20">
      <section className="py-12 bg-background relative">
        <div className="container mx-auto px-4">
          {/* Checkout Progress */}
          <div className="mb-8">
            <div className="flex justify-center">
              <ol className="flex items-center w-full max-w-3xl">
                {['cart', 'shipping', 'payment', 'review'].map((stage, index) => (
                  <li 
                    key={stage} 
                    className={`flex items-center ${
                      index !== 3 ? 'w-full' : ''
                    }`}
                  >
                    <span 
                      className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                        checkoutStage === stage || 
                        (checkoutStage === 'success' && stage === 'review') ||
                        ['shipping', 'payment', 'review'].includes(checkoutStage) && stage === 'cart' ||
                        ['payment', 'review'].includes(checkoutStage) && stage === 'shipping' ||
                        checkoutStage === 'review' && stage === 'payment'
                          ? 'bg-primary text-white border-primary'
                          : 'bg-background/50 text-text-secondary border-white/20'
                      }`}
                    >
                      {index + 1}
                    </span>
                    
                    <span 
                      className={`ml-2 text-sm ${
                        checkoutStage === stage ? 'text-primary font-bold' : 'text-text-secondary'
                      }`}
                    >
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </span>
                    
                    {index !== 3 && (
                      <div className="flex-1 ml-2 mr-2">
                        <div 
                          className={`h-0.5 ${
                            ['shipping', 'payment', 'review'].includes(checkoutStage) && index === 0 ||
                            ['payment', 'review'].includes(checkoutStage) && index === 1 ||
                            checkoutStage === 'review' && index === 2
                              ? 'bg-primary'
                              : 'bg-white/10'
                          }`}
                        ></div>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Cart Stage */}
              {checkoutStage === 'cart' && (
                <div className="card">
                  <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
                  
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-text-secondary mb-4">Your cart is empty</p>
                      <Link href="/products" passHref>
                        <button className="btn btn-primary">Shop Now</button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="divide-y divide-white/10">
                        {items.map((item) => (
                          <div key={`${item.id}-${item.caratSize}-${item.metalType}`} className="py-4 flex">
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-background/50">
                              <Image 
                                src={item.image} 
                                alt={item.name}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="ml-4 flex-grow">
                              <h3 className="font-bold">{item.name}</h3>
                              <div className="text-sm text-text-secondary">
                                <p>{item.caratSize} CT | {item.metalType}</p>
                              </div>
                              
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center">
                                  <button 
                                    className="h-8 w-8 rounded-l-lg bg-background/40 border border-white/10 flex items-center justify-center"
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    aria-label="Decrease quantity"
                                  >
                                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                    </svg>
                                  </button>
                                  <div className="h-8 w-10 bg-background/40 border-t border-b border-white/10 flex items-center justify-center">
                                    {item.quantity}
                                  </div>
                                  <button 
                                    className="h-8 w-8 rounded-r-lg bg-background/40 border border-white/10 flex items-center justify-center"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    aria-label="Increase quantity"
                                  >
                                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                  </button>
                                </div>
                                
                                <div className="font-bold">
                                  {formatCurrency(item.price * item.quantity)}
                                </div>
                                
                                <button 
                                  className="text-text-secondary hover:text-primary transition-colors"
                                  onClick={() => removeItem(item.id)}
                                  aria-label="Remove item"
                                >
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <Link href="/products" passHref>
                          <button className="btn btn-outline">
                            Continue Shopping
                          </button>
                        </Link>
                        
                        <button 
                          className="btn btn-primary"
                          onClick={handleContinue}
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {/* Shipping Stage */}
              {checkoutStage === 'shipping' && (
                <div className="card">
                  <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`input w-full ${formErrors.firstName ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.firstName}
                          aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
                        />
                        {formErrors.firstName && (
                          <p id="firstName-error" className="text-red-500 text-sm mt-1">
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`input w-full ${formErrors.lastName ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.lastName}
                          aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
                        />
                        {formErrors.lastName && (
                          <p id="lastName-error" className="text-red-500 text-sm mt-1">
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`input w-full ${formErrors.email ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="text-red-500 text-sm mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`input w-full ${formErrors.phone ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                        />
                        {formErrors.phone && (
                          <p id="phone-error" className="text-red-500 text-sm mt-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`input w-full ${formErrors.address ? 'border-red-500' : ''}`}
                        aria-invalid={!!formErrors.address}
                        aria-describedby={formErrors.address ? 'address-error' : undefined}
                      />
                      {formErrors.address && (
                        <p id="address-error" className="text-red-500 text-sm mt-1">
                          {formErrors.address}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`input w-full ${formErrors.city ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.city}
                          aria-describedby={formErrors.city ? 'city-error' : undefined}
                        />
                        {formErrors.city && (
                          <p id="city-error" className="text-red-500 text-sm mt-1">
                            {formErrors.city}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`input w-full ${formErrors.state ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.state}
                          aria-describedby={formErrors.state ? 'state-error' : undefined}
                        />
                        {formErrors.state && (
                          <p id="state-error" className="text-red-500 text-sm mt-1">
                            {formErrors.state}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={`input w-full ${formErrors.zipCode ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.zipCode}
                          aria-describedby={formErrors.zipCode ? 'zipCode-error' : undefined}
                        />
                        {formErrors.zipCode && (
                          <p id="zipCode-error" className="text-red-500 text-sm mt-1">
                            {formErrors.zipCode}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="input w-full"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </form>
                  
                  <div className="mt-8 flex justify-between">
                    <button 
                      className="btn btn-outline"
                      onClick={handleBack}
                    >
                      Back to Cart
                    </button>
                    
                    <button 
                      className="btn btn-primary"
                      onClick={handleContinue}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
              
              {/* Payment Stage */}
              {checkoutStage === 'payment' && (
                <div className="card">
                  <h1 className="text-2xl font-bold mb-6">Payment Information</h1>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`input w-full ${formErrors.cardName ? 'border-red-500' : ''}`}
                        aria-invalid={!!formErrors.cardName}
                        aria-describedby={formErrors.cardName ? 'cardName-error' : undefined}
                      />
                      {formErrors.cardName && (
                        <p id="cardName-error" className="text-red-500 text-sm mt-1">
                          {formErrors.cardName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className={`input w-full ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                        aria-invalid={!!formErrors.cardNumber}
                        aria-describedby={formErrors.cardNumber ? 'cardNumber-error' : undefined}
                      />
                      {formErrors.cardNumber && (
                        <p id="cardNumber-error" className="text-red-500 text-sm mt-1">
                          {formErrors.cardNumber}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiration" className="block text-sm font-medium mb-1">
                          Expiration Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          id="expiration"
                          name="expiration"
                          value={formData.expiration}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`input w-full ${formErrors.expiration ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.expiration}
                          aria-describedby={formErrors.expiration ? 'expiration-error' : undefined}
                        />
                        {formErrors.expiration && (
                          <p id="expiration-error" className="text-red-500 text-sm mt-1">
                            {formErrors.expiration}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          placeholder="XXX"
                          className={`input w-full ${formErrors.cvv ? 'border-red-500' : ''}`}
                          aria-invalid={!!formErrors.cvv}
                          aria-describedby={formErrors.cvv ? 'cvv-error' : undefined}
                        />
                        {formErrors.cvv && (
                          <p id="cvv-error" className="text-red-500 text-sm mt-1">
                            {formErrors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 border border-white/10 rounded-lg p-4 bg-primary/5">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="font-medium">Secure Payment</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-2">
                        Your payment information is encrypted and secure. We never store your full card details.
                      </p>
                    </div>
                  </form>
                  
                  <div className="mt-8 flex justify-between">
                    <button 
                      className="btn btn-outline"
                      onClick={handleBack}
                    >
                      Back to Shipping
                    </button>
                    
                    <button 
                      className="btn btn-primary"
                      onClick={handleContinue}
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}
              
              {/* Review Stage */}
              {checkoutStage === 'review' && (
                <div className="card">
                  <h1 className="text-2xl font-bold mb-6">Review Your Order</h1>
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold mb-2 flex items-center">
                        <span>Shipping Information</span>
                        <button 
                          className="ml-2 text-primary text-sm font-normal"
                          onClick={() => setCheckoutStage('shipping')}
                        >
                          Edit
                        </button>
                      </h2>
                      <div className="bg-background/40 rounded-lg p-4">
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                        <p>{formData.country}</p>
                        <p className="mt-2">{formData.email}</p>
                        <p>{formData.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-bold mb-2 flex items-center">
                        <span>Payment Information</span>
                        <button 
                          className="ml-2 text-primary text-sm font-normal"
                          onClick={() => setCheckoutStage('payment')}
                        >
                          Edit
                        </button>
                      </h2>
                      <div className="bg-background/40 rounded-lg p-4">
                        <p>{formData.cardName}</p>
                        <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                        <p>Expires {formData.expiration}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-bold mb-2 flex items-center">
                        <span>Order Items</span>
                        <button 
                          className="ml-2 text-primary text-sm font-normal"
                          onClick={() => setCheckoutStage('cart')}
                        >
                          Edit
                        </button>
                      </h2>
                      <div className="bg-background/40 rounded-lg p-4">
                        <ul className="divide-y divide-white/10">
                          {items.map((item) => (
                            <li key={`${item.id}-${item.caratSize}-${item.metalType}`} className="py-3 flex justify-between">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-text-secondary">
                                  {item.caratSize} CT | {item.metalType} | Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="font-bold">
                                {formatCurrency(item.price * item.quantity)}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button 
                      className="btn btn-outline"
                      onClick={handleBack}
                    >
                      Back to Payment
                    </button>
                    
                    <button 
                      className="btn btn-primary"
                      onClick={handleSubmitOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
              
              {/* Success Stage */}
              {checkoutStage === 'success' && (
                <div className="card text-center">
                  <svg className="h-16 w-16 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  
                  <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
                  <p className="text-text-secondary mb-6">
                    Thank you for your purchase. Your order has been confirmed.
                  </p>
                  
                  <div className="bg-background/40 rounded-lg p-4 mb-6 max-w-md mx-auto">
                    <p className="text-lg font-bold mb-1">Order #ABC123456</p>
                    <p className="text-text-secondary mb-4">
                      A confirmation email has been sent to {formData.email}
                    </p>
                    <div className="space-y-2 text-sm text-left">
                      <p>
                        <span className="text-text-secondary">Order Date:</span>{' '}
                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                      </p>
                      <p>
                        <span className="text-text-secondary">Estimated Delivery:</span>{' '}
                        <span className="font-medium">
                          {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </span>
                      </p>
                      <p>
                        <span className="text-text-secondary">Shipping Address:</span>{' '}
                        <span className="font-medium">
                          {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/" passHref>
                      <button className="btn btn-outline">
                        Return to Home
                      </button>
                    </Link>
                    <Link href="/products" passHref>
                      <button className="btn btn-primary">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>Discount ({discount}%)</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Shipping</span>
                    <span>Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tax (8%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary text-xl">{formatCurrency(total)}</span>
                  </div>
                </div>
                
                {checkoutStage === 'cart' && discount === 0 && (
                  <div className="bg-background/40 rounded-lg p-4 mb-4 border border-dashed border-white/20">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">Unlock a Discount!</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">
                      Play our Diamond Street game and save up to 50% on your order.
                    </p>
                    <Link href="/game" passHref>
                      <button className="btn btn-secondary btn-sm w-full">
                        Play Game
                      </button>
                    </Link>
                  </div>
                )}
                
                {checkoutStage === 'cart' && discount > 0 && (
                  <div className="bg-primary/5 rounded-lg p-4 mb-4 border border-primary/20">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">Discount Applied: {discount}% OFF</span>
                    </div>
                    <p className="text-sm mt-2">
                      You saved {formatCurrency(discountAmount)} with your game discount!
                    </p>
                  </div>
                )}
                
                <div className="bg-background/40 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Need Help?</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    If you have any questions about your order, please contact our customer service team.
                  </p>
                  <div className="flex items-center text-sm">
                    <svg className="h-4 w-4 mr-1.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <svg className="h-4 w-4 mr-1.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>support@diamondstuds.example.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
