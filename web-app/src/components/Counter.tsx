import React from 'react';
import { auth } from '../store/hooks';

const Counter = () => {
  const counter = auth.useCounter();
  const increment = auth.useIncrement();
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: 'grey',
        color: 'white',
        width: 50,
        height: 50,
        alignContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => increment()}
    >
      {counter}
    </div>
  );
};

export default React.memo(Counter);
