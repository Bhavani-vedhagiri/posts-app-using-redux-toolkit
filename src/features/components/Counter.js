import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { increment, decrement,incrementByAmount } from '../reducers/counterSlice';
// useSelector - select specfic information
// useDispatch - mention the action is performed

function Counter() {
    const count = useSelector((state) => state.counter.count);
    const [incrementAllAmount, setIncrementAllAmount] = useState(0);
    const dispatch =  useDispatch();

  return (
    <section>
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
      <p>{count}</p>

      <input type='text' value={incrementAllAmount} onChange={(e)=>setIncrementAllAmount(e.target.value)}/>
      <br/>
      <button onClick={() => dispatch(incrementByAmount(Number(incrementAllAmount) || 0))}>add amount</button>



    </section>
  )
}

export default Counter
