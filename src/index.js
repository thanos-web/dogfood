import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app';
import store from './storage/store';
import './styles.css';
// import { AntApp } from './components/app-ant/index';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>

    </Provider>
);


