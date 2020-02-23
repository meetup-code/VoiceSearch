import React, { useState } from 'react';

const Siri = () => {
  const [message, setMessage] = useState(
    ''
  );
  const [Display, setDisplay] = useState(
    'nothing'
  );
  function handleChange(e) {
    setMessage(e.target.value);
  };
  function handleClick(e) {
    setDisplay(message);
  };

  return (
    <div>
      <h1>{Display}</h1>
      <input type='input' placeholder='placeholder' onChange={handleChange}/>
      <input type='submit' onClick={handleClick}/>
    </div>
  );
};
export default Siri;
