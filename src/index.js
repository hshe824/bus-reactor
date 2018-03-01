import React from 'react';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


const store = configureStore() 

// You can also pass in an initialState here
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


