import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>
    </StrictMode>
);