import React, { useEffect, useState } from "react";

const UseStateHook = () => {
  let [a, setA] = useState(1);
  let [price, setPrice] = useState(100);
  let pr = 100;

  useEffect(() => {
    setPrice(pr * a);
  }, [a]);

  return (
    <div>
      <h1>Quantity: {a}</h1>
      <h1>Price: {price}</h1>
      <button onClick={() => setA(a + 1)}>Increment</button>
    </div>
  );
};

export default UseStateHook;
