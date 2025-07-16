import React from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/index.css';

console.log("main.tsx loaded and rendering");

export const App = () => {
  return (
    <div data-testid="app-ready">
      <h1>Hello from Pruki!</h1>
    </div>
  );
};

// Only render the app if a root element exists (i.e., in a browser environment)
if (document.getElementById('root')) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
