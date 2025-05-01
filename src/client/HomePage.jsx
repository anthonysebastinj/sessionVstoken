import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple home page.</p>
      <p>Use the navigation links to explore the app.</p>
      <ul>
        <li><a href="/session">Session Auth</a></li>
        <li><a href="/jwt">JWT Auth</a></li>
      </ul>
    </div>
  );
};

export default HomePage;
