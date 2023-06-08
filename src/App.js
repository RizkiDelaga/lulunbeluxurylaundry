import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import AdminRouter from './routers/AdminRouter';
import CustomerRouter from './routers/CustomerRouter';

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <AdminRouter />
          <CustomerRouter />
        </Provider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
