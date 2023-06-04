import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import AdminRouter from './routers/AdminRouter';
import CustomerRouter from './routers/CustomerRouter';
import axios from 'axios';

function App() {
  // React.useEffect(() => {
  //   handleGetBusinessInformation();
  // }, []);

  // const handleGetBusinessInformation = async () => {
  //   try {
  //     const res = await axios({
  //       method: 'GET',
  //       url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/infoumum',
  //     });
  //     console.log('Response GET Data Laundry Type');
  //     console.log(res);
  //     localStorage.setItem('Business-Information', JSON.stringify(res.data.data[0]));
  //     // setBusinessInformation(res.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
