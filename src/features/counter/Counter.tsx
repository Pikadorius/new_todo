import React from "react";

type CounterType = {
  name: string;
};

const Counter = ({ name }: CounterType) => {
  return (
    <div>
      <h1>Hello! {name}</h1>
    </div>
  );
};

export default Counter;
