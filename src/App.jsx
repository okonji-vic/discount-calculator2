import React, { useEffect, useState } from "react";
import "./App.css"; // Linking the CSS file

export default function Discount() {
  return (
    <div className="app-container">
      <h1 className="header">Discount Calculator</h1>
      <Product />
    </div>
  );
}

function Product() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [notDiscountedPrice, setNotDiscountedPrice] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDay, setCurrentDay] = useState(new Date().toDateString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDay(new Date().toDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCalculate = () => {
    const numericPrice = parseFloat(price);
    const numericDiscount = parseFloat(discount);

    const calculatedPrice = numericPrice - (numericPrice * numericDiscount) / 100;

    if (calculatedPrice < 0) {
      setDiscountedPrice(null);
      setNotDiscountedPrice("Price cannot be negative.");
    } else if (isNaN(numericPrice)) {
      setDiscountedPrice(null);
      setNotDiscountedPrice("Please enter a valid price.");
    } else if (isNaN(numericDiscount)) {
      setDiscountedPrice(null);
      setNotDiscountedPrice("Please enter a valid discount.");
    } else {
      setDiscountedPrice(calculatedPrice.toFixed(2));
      setNotDiscountedPrice(null);
    }
  };

  return (
    <div className="calculator-container">
      <div className="input-container">
        <label>Price ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />
      </div>
      <div className="input-container">
        <label>Discount (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Enter discount"
        />
      </div>
      <button className="calculate-btn" onClick={handleCalculate}>
        Calculate Discount
      </button>
      {discountedPrice !== null && (
        <p className="result">Discounted Price: ${discountedPrice}</p>
      )}
      {notDiscountedPrice !== null && (
        <p className="error-message">{notDiscountedPrice}</p>
      )}
      <div className="footer">
        <span>{currentDay}</span>
        <span>{currentTime}</span>
      </div>
    </div>
  );
}

