import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./icecreamSlice";

export const IcecreamView = () => {
  const [input, setInput] = useState("");

  const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInput(parseInt(e.target.value));
  };

  return (
    <div>
      <h2>Number of ice creams - {numOfIcecreams}</h2>
      <button onClick={() => dispatch(ordered())}>Order ice cream</button>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={() => dispatch(restocked(input))}>
        Restock ice creams
      </button>
    </div>
  );
};
