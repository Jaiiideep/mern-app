import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import store from './store';
import { Provider } from 'react-redux';
import setupInterceptors from "./services/setupInterceptors";

import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

setupInterceptors(store);