import React from 'react';
import '@/styles/globals.css';

const ArticleLoading = () => {
  return (
    <div className="text-loader" style={{ width: '100%' }}>
      <div className="line first-line"></div>
      <div className="line second-line"></div>
      <div className="line third-line"></div>
    </div>
  );
};

export default ArticleLoading;
