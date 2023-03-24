import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminRouter from './routers/AdminRouter';
import CustomerRouter from './routers/CustomerRouter';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AdminRouter />
        <CustomerRouter />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
