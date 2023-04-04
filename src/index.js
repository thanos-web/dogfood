import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app';
import './styles.css';
// import { AntApp } from './components/app-ant/index';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>


);
// root.render(<StrictMode><AntApp/></StrictMode>);


