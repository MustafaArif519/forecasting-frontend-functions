import Head from 'next/head';
import styles from '../styles/Home.module.css';

let url = "http://localhost:8000/asin_products/2/sales_velocity/";

let sales_velocities = [
  {
      "asin_id": "2",
      "date_prediction": "2024-06-04",
      "velocity_15_days": 7509.5,
      "velocity_30_days": 7326.4,
      "velocity_60_days": 6333.181818181818,
      "velocity_90_days": 6445.1578947368425,
      "velocity_180_days": 6055.864864864865,
      "velocity_custom_days": 5915.976190476191,
      "velocity_custom_days_period": 270
  }
];

let stock = [
  {
      "asin_id": "1",
      "date": "2024-06-04",
      "units_in_stock": 30000
  }
];

function getSalesVelocity(velocityPeriod){
  if(velocityPeriod === 15){
    return sales_velocities[0]["velocity_15_days"];
  }
  else if(velocityPeriod === 30){
    return sales_velocities[0]["velocity_30_days"];
  }
  else if(velocityPeriod === 60){
    return sales_velocities[0]["velocity_60_days"];
  }
  else if(velocityPeriod === 90){
    return sales_velocities[0]["velocity_90_days"];
  }
  else if(velocityPeriod === 180){
    return sales_velocities[0]["velocity_180_days"];
  }
  else if(velocityPeriod === sales_velocities[0]["velocity_custom_days_period"]){
    return sales_velocities[0]["velocity_custom_days"];
  }
  else{
    return -1;
  }
}

function calculateStockOutDates(velocity){
  let stockOutDate = new Date();
  let bufferOutDate = new Date();
  let buffer = 90;
  let currentStock = stock[0]["units_in_stock"];
  if(velocity === -1){
    return "Invalid velocity period";
  }
  let daysToStockOut = currentStock / velocity;

  stockOutDate.setDate(stockOutDate.getDate() + daysToStockOut);
  bufferOutDate.setDate(stockOutDate.getDate() + daysToStockOut - buffer);
  
  let today = new Date();
  stockOutDate = stockOutDate < today ? today : stockOutDate;
  bufferOutDate = bufferOutDate < today ? today : bufferOutDate;
  return {
    "stockOutDate": stockOutDate,
    "bufferOutDate": bufferOutDate
  };
}



function calculateWeightedVelocity(weights, velocities){
  let weightedVelocity = 0;
  for(let i = 0; i < weights.length; i++){
    weightedVelocity += weights[i] * velocities[i];
  }
  return weightedVelocity;
}

export default function Output() {
  let velocity = getSalesVelocity(15);
  let stockOutDates = calculateStockOutDates(velocity);
  let weights = [0.2, 0.3, 0.5];
  let velocities = [sales_velocities[0]["velocity_15_days"], sales_velocities[0]["velocity_30_days"],
   sales_velocities[0]["velocity_60_days"]];
  let weightedVelocity = calculateWeightedVelocity(weights, velocities);
  let weightedStockOutDates = calculateStockOutDates(weightedVelocity);
  return (
    <>
    <h1>Stock Out Dates for velocity: {velocity}</h1>
    Stock Out Date: <span />
      {stockOutDates["stockOutDate"].toDateString()}
      <br />
      Buffer Out Date: <span />
      {stockOutDates["bufferOutDate"].toDateString()}
      <h1>Weighted Stock Out Dates for velocity: {weightedVelocity}</h1>

        Stock Out Date: <span />

      {weightedStockOutDates["stockOutDate"].toDateString()}  
      <br />

      Buffer Out Date: <span />
      {weightedStockOutDates["bufferOutDate"].toDateString()}

      
    </>
  );
}
