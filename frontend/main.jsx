import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/normalize.css';
import {RouterProvider} from 'react-router-dom';
import store from './app/store'
import {Provider} from 'react-redux'
import router from "./router";
import {ContextProvider} from "./context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ContextProvider>
            <RouterProvider router={router}/>
        </ContextProvider>
    </Provider>
);
