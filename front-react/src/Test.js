import React from 'react';
import { useState } from 'react';

function Test(){
    const [count, setCount] = useState(0);

    function handleClick() {
      setCount(count + 1);
    }

    return(
        <div className="App">
        <p>test</p>
        <Button onClick={handleClick} count={count} />
        </div>
    )
}

function Button({ count, onClick }) {

    return(
        <button onClick={onClick}>
      Clicked {count} times
    </button>    
    )
}
export default Test;