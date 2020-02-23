import React, { useState, useEffect } from 'react';
import '../css/HScroll.css';
import ReactDOM from "react-dom";

function H_scroll(props) {

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const formData  = new FormData();
    formData.append("searchterm", props.searchterm);
    const conf = {
      method: "post",
      body: formData,
    };
    fetch("/api/google/", conf)
    .then(response => {
      if (response.status !== 200) {
        console.log("something went wrong with fetching from google api");
      }
      return response.json();
    })
    .then(data => {
      props.SiriSetBackground(data['background']);
      setLinks(data['links']);
    });
  }, []);

      // Update the document title using the browser API
  var length = links.length
  var half =  Math.ceil(length/2)
  var part1 = links.slice(0, half)
  var part2 = links.slice(half, length + 1)

  var part1a = []
  var part1b = []
  for ( var count = 0, i = 0; i < part1.length; i++) {
    if (count === 0){
      part1a.push(i)
      count += 1
    } else if (count === 1){
      part1b.push(i)
      count += 1
    } else {
      count = 0
    }
  }

  var part2a = []
  var part2b = []
  for ( var count = 0, i = 0; i < part2.length; i++) {
    if (count === 0){
      part2a.push(i)
      count += 1
    } else if (count === 1){
      part2b.push(i)
      count += 1
    } else {
      count = 0
    }
  }

  return (
    <div id="main" className="disable-scrollbars">
      <div className="container">
        {part1.map((item, i) => {
          if (part1a.includes(i)) {
            return <img className="slow-3" src={item} alt="girl" key={i}/>
          } else if (part1b.includes(i)) {
            return <img className="slow-4" src={item} alt="girl" key={i}/>
          } else {
            return <img className="slow-5" src={item} alt="girl" key={i}/>
          }
        })}
      </div>

      <div className="container">
        {part2.map((item, i) => {
          if (part2a.includes(i)) {
            return <img className="slow-5" src={item} alt="girl" key={i}/>
          } else if (part2b.includes(i)) {
            return <img className="slow-4" src={item} alt="girl" key={i}/>
          } else {
            return <img className="slow-3" src={item} alt="girl" key={i}/>
          }
        })}
      </div>

    </div>
  );
}

export default H_scroll;
