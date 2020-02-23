import React, { useState, useEffect } from 'react';

function H_scroll() {

  const [links, setLinks] = useState(["1"]);

    // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
  fetch("/api/google/")
  .then(response => {
    if (response.status !== 200) {
      console.log("something went wrong wrti");
    }
    return response.json();
  })
  .then(data => {setLinks(data['success'])});
  });

  return (
    <div id="main" className="disable-scrollbars">
      Hello
      <div className="container">
        {links.map(item => <img src={item} alt="girl"/>)}

      </div>

    </div>
  );
}

export default H_scroll;
