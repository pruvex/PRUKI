import React from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/index.css';

console.log("main.tsx loaded and rendering");

const App = () => {
  return (
    <div data-testid="app-ready">
      <h1>Hello from Pruki!</h1>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
