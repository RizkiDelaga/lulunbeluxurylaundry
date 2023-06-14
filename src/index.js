import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/styles/video-react.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'video-react/dist/video-react.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F305C',
    },
    background: {
      light: '#f5f5f5',
      main: '#eeeeee',
    },
    neutral: {
      main: '#ffffff',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme} >
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
