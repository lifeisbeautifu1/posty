import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <HashLoader color="#3b82f6" size={100} />
      {/* <div className="spinner"></div> */}
    </div>
  );
};

export default Spinner;
