import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const CustomLoader = () => {
  return (
    <div className="loader">
      <TailSpin type="TailSpin" color="#3f51b5" height={80} width={80} />
    </div>
  );
};

export default CustomLoader;