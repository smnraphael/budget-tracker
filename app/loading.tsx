import React from 'react';

const Loading = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-100'>
      <div
        className='spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4'
        role='status'
      ></div>
    </div>
  );
};

export default Loading;
