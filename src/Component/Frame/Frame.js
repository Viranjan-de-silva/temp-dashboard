import React from 'react';
import './Frame.css'; // Import the separated CSS

const Frame = ({ children, style }) => {
  return (
    <div className="frame" style={style}>
      {children}
    </div>
  );
};

export default Frame;
