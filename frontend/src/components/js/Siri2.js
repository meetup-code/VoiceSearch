import HScroll from './HScroll';
import React, { useState } from 'react';


const Siri = () => {

  const [question, setQuestion] = useState(
    ''
  );

  const [display, setDisplay] = useState(
    ''
  );

  const [searching, setSearching] = useState(
  true
  );

  const [background, setBackground] = useState(
  ''
  );


  function handleSetBackground(e) {
    setBackground(e);
  }


  async function handleClick(e) {
    setQuestion('What can I do for you?');
    setDisplay('');
    await speak('What can I do for you?');
    recognition.start();
    console.log('Ready for voice command.')
  };

  // speech recognition api

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  // var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
  // var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var message = event.results[last][0].transcript;
  console.log(message);
  setDisplay(message + '.');
  setSearching(false);
  console.log('Confidence: ' + event.results[0][0].confidence);
  speak('You want, ' + message + '.');
  }

  recognition.onspeechend = function() {
  recognition.stop();
  setQuestion('');
  }

  recognition.onerror = function(event) {
  setDisplay('Error occurred in recognition: ' + event.error);
  }

  // speech recognition api

  // speech synthesis
  var voices = [];

  function populateVoiceList() {
      voices = window.speechSynthesis.getVoices();
  }
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function speak(words){
    return new Promise(resolve => {
      if (window.speechSynthesis.speaking) {
          console.error('speechSynthesis.speaking');
          resolve();
      }
      var utterThis = new SpeechSynthesisUtterance(words);
      utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend');
          resolve();
      }
      utterThis.onerror = function (event) {
          console.error('SpeechSynthesisUtterance.onerror');
          resolve();
      }
      utterThis.voice = voices[0];
      window.speechSynthesis.speak(utterThis);
    });
  }
  // speech synthesis
  var backgroundDiv = <div className="background" ></div>
  if (background !== ''){
    backgroundDiv = <div className="background" style={{backgroundImage: `url(${background})`,backgroundSize:"cover",filter:'blur(10px)'}}></div>
  }
  if (searching) {
    return (
      <div id="header" className="App-header" >
        <div className="background"></div>
        <div>
          {question}
          <h1>{display}</h1>
          <button onClick={handleClick}>Start</button>
        </div>
      </div>
    );
  } else {
    return (
      <div id="header" className="App-header">
        {backgroundDiv}
        <HScroll searchterm={display} SiriSetBackground={handleSetBackground}/>
      </div>
    );
  }

};
export default Siri;
