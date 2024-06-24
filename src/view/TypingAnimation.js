import React, { useState, useEffect } from 'react';
import '../style/typing.css'; // Import your CSS file with animation styles

const TypingAnimation = ({ text }) => {
    const [typedText, setTypedText] = useState('');
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (index <= text.length) {
          setTypedText(text.substring(0, index));
          setIndex(prevIndex => prevIndex + 1);
        } else {
          setIndex(0);
          setTypedText('');
        }
      }, 100); // Adjust typing speed by changing the interval
  
      return () => clearInterval(interval);
    }, [index, text]);
  
    return (
      <div className="typing-animation">
        {typedText}
        <span className="cursor" />
      </div>
    );
  };
  
  export default TypingAnimation;
