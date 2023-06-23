import { Navigate, Route, Routes } from 'react-router';
import CustomerLayout from '../layouts/CustomerLayout/CustomerLayout';
import HomePage from '../pages/customerPages/HomePage/HomePage';
import AboutUs from '../pages/customerPages/AboutUs/AboutUs';
import LoginCustomer from '../pages/customerPages/customerAuth/LoginCustomer/LoginCustomer';
import Gallery from '../pages/customerPages/Gallery/Gallery';
import DigitalReceipt from '../pages/customerPages/DigitalReceipt/DigitalReceipt';
import CustomerArea from '../pages/customerPages/customerArea/CustomerArea';
import RatingAndReview from '../pages/customerPages/customerArea/RatingAndReview/RatingAndReview';
import ChangePassword from '../pages/customerPages/customerArea/ChangePassword/ChangePassword';
import EditProfile from '../pages/customerPages/customerArea/EditProfile/EditProfile';
import OrderDetails from '../pages/customerPages/customerArea/OrderDetails/OrderDetails';

import RegisterAccount from '../pages/customerPages/customerAuth/RegisterCustomer/RegisterAccount/RegisterAccount';
import CompleteRegistration from '../pages/customerPages/customerAuth/RegisterCustomer/CompleteRegistration/CompleteRegistration';
import ForgotPasswordRequest from '../pages/customerPages/customerAuth/forgotPassword/ForgotPasswordRequest/ForgotPasswordRequest';
import ChangePasswordOnForgotPassword from '../pages/customerPages/customerAuth/forgotPassword/ChangePasswordOnForgotPassword/ChangePasswordOnForgotPassword';
import AccountValidation from '../pages/customerPages/customerAuth/AccountValidation/AccountValidation';
import FormOrderLaundry from '../pages/customerPages/customerArea/FormOrderLaundry/FormOrderLaundry';

function CustomerRouter() {

  const HandleLoginSuccessfully = () => {
    if (localStorage.getItem("access_token")) {
        return <Navigate to={-1} replace />
    }
    return <CustomerLayout />;
  }

  const ProtectedCustomerRoute = () => {
    if (!localStorage.getItem("access_token")) {
      return <Navigate to="/login" replace />
    }
    return <CustomerLayout />;
  }

  const PublicCustomerRoute = () => {

    return <CustomerLayout />;
    
  }

  return (
        <Routes>
          {/* Public Route */}
          <Route element={<PublicCustomerRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="Galeri" element={<Gallery />} />
            <Route path="TentangKami" element={<AboutUs />} />
            <Route path="StrukPemesanan/:noPesanan" element={<DigitalReceipt />} />
          </Route>

          <Route element={<HandleLoginSuccessfully />}>
            <Route path="Login" element={<LoginCustomer />} />
            <Route path=":typeOfUse/ValidasiAkun/:phoneNumber" element={<AccountValidation />} />

            <Route path="Registrasi" element={<RegisterAccount />} />
            <Route path="Registrasi/:phoneNumber/:verificationCode" element={<CompleteRegistration />} />

            <Route path="LupaPassword" element={<ForgotPasswordRequest />} />
            <Route path="LupaPassword/UbahPassword/:phoneNumber/:verificationCode" element={<ChangePasswordOnForgotPassword />} />
          </Route>

          <Route element={<ProtectedCustomerRoute />}>
            <Route path="AreaPelanggan" element={<CustomerArea />} />
            <Route path="AreaPelanggan/:noPesanan" element={<OrderDetails />} />
            <Route path="AreaPelanggan/EditProfil" element={<EditProfile />} />
            <Route path="AreaPelanggan/UbahPassword" element={<ChangePassword />} />
            <Route path="AreaPelanggan/FormulirPemesananLaundry" element={<FormOrderLaundry />} />
            <Route path="AreaPelanggan/FormulirPemesananLaundry/:id" element={<FormOrderLaundry />} />
            <Route path="AreaPelanggan/RatingDanReview/:idPesanan/:noPesanan" element={<RatingAndReview />} />
          </Route>
        </Routes>
  );
}

export default CustomerRouter;
