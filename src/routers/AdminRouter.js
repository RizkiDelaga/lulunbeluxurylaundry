import { Navigate, Route, Routes } from 'react-router';
import { Outlet } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import HomePage from '../pages/customerPages/HomePage/HomePage';
import RegisterNewAdministrator from '../pages/administratorPages/dashboardMenu/RegisterNewAdministrator/RegisterNewAdministrator';
import EditProfile from '../pages/administratorPages/dashboardMenu/EditProfile/EditProfile';
import ChangePassword from '../pages/administratorPages/dashboardMenu/ChangePassword/ChangePassword';
import EditAdministrators from '../pages/administratorPages/dashboardMenu/EditAdministrators/EditAdministrators';
import CreateNewEvents from '../pages/administratorPages/eventMenu/CreateNewEvents/CreateNewEvents';
import AddExpenses from '../pages/administratorPages/financeMenu/AddExpenses/AddExpenses';
import AddIncome from '../pages/administratorPages/financeMenu/AddIncome/AddIncome';
import RegisterNewCustomer from '../pages/administratorPages/customerMenu/NewCustomerRegistration/RegisterNewCustomer';
import GeneralInformation from '../pages/administratorPages/businessInformationMenu/GeneralInformation/GeneralInformation';
import ServiceType from '../pages/administratorPages/businessInformationMenu/ServiceType/ServiceType';
import ReasonsWhyChooseUs from '../pages/administratorPages/businessInformationMenu/ReasonsWhyChooseUs/ReasonsWhyChooseUs';
import Gallery from '../pages/administratorPages/businessInformationMenu/Gallery/Gallery';
import FrequentlyAskedQuestions from '../pages/administratorPages/businessInformationMenu/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import AboutUs from '../pages/administratorPages/businessInformationMenu/AboutUs/AboutUs';
import HowToOrder from '../pages/administratorPages/businessInformationMenu/HowToOrder/HowToOrder';
import PaymentMethod from '../pages/administratorPages/businessInformationMenu/PaymentMethod/PaymentMethod';
import LaundryType from '../pages/administratorPages/businessInformationMenu/LaundryType/LaundryType';
import LoginAdmin from '../pages/administratorPages/adminAuth/LoginAdmin/LoginAdmin';
import AccountValidation from '../pages/administratorPages/adminAuth/AccountValidation/AccountValidation';
import DashboardMenu from '../pages/administratorPages/dashboardMenu/DashboardMenu';
import OrderMenu from '../pages/administratorPages/orderMenu/OrderMenu';
import BusinessInformationMenu from '../pages/administratorPages/businessInformationMenu/BusinessInformationMenu';
import EventMenu from '../pages/administratorPages/eventMenu/EventMenu';
import FinanceMenu from '../pages/administratorPages/financeMenu/FinanceMenu';
import CustomerMenu from '../pages/administratorPages/customerMenu/CustomerMenu';
import OrderDetails from '../pages/administratorPages/orderMenu/OrderDetails/OrderDetails';
import CustomerRatingsAndReviews from '../pages/administratorPages/orderMenu/CustomerRatingsAndReviews/CustomerRatingsAndReviews';
import OrderList from '../pages/administratorPages/orderMenu/OrderList/OrderList';
import ForgotPasswordRequest from '../pages/administratorPages/adminAuth/ForgotPassword/ForgotPasswordRequest/ForgotPasswordRequest';
import ChangePasswordOnForgotPassword from '../pages/administratorPages/adminAuth/ForgotPassword/ChangePasswordOnForgotPassword/ChangePasswordOnForgotPassword';
import FormOrderLaundry from '../pages/administratorPages/orderMenu/FormOrderLaundry/FormOrderLaundry';
import EditCustomerInformation from '../pages/administratorPages/customerMenu/EditCustomerInformation/EditCustomerInformation';
import EditIncome from '../pages/administratorPages/financeMenu/EditIncome/EditIncome';
import EditExpenses from '../pages/administratorPages/financeMenu/EditExpenses/EditExpenses';
import EditEvents from '../pages/administratorPages/eventMenu/EditEvents/EditEvents';

function AdminRouter() {

  const HandleLoginSuccessfully = () => {
    if (localStorage.getItem("access_token_admin")) {
        return <Navigate to={-1} replace />
    }
    return <Outlet />;
  }

  const ProtectedAdminRoute = () => {
    if (!localStorage.getItem("access_token_admin")) {
      return <Navigate to="/admin" replace />
    }
    return <AdminLayout />;
  }

  return (
        <Routes>
          <Route element={<HandleLoginSuccessfully />}>
            {/* Admin Authentication Route */}
            <Route path="Admin" element={<LoginAdmin />} />
            <Route path="Admin/LupaPassword" element={<ForgotPasswordRequest />} />
            <Route path="Admin/:typeOfUse/ValidasiAkun/:phoneNumber" element={<AccountValidation />} />
            <Route path="Admin/LupaPassword/UbahPassword/:phoneNumber/:verificationCode" element={<ChangePasswordOnForgotPassword />} />
          </Route>
          
          <Route element={<ProtectedAdminRoute />}>
            {/* Dashboard Menu Route */}
            <Route path="Dashboard" element={<DashboardMenu />} />
            <Route path="Dashboard/EditProfil" element={<EditProfile />} />
            <Route path="Dashboard/UbahPassword" element={<ChangePassword />} />
            <Route path="Dashboard/RegistrasiAdministratorBaru" element={<RegisterNewAdministrator />} />
            <Route path="Dashboard/EditAdministrator/:id" element={<EditAdministrators />} />

            {/* Order Menu Route */}
            <Route path="Pesanan" element={<OrderMenu />} />
            <Route path="Pesanan/:noPesanan" element={<OrderDetails />} />
            <Route path="Pesanan/FormulirPemesananLaundry" element={<FormOrderLaundry />} />
            <Route path="Pesanan/FormulirPemesananLaundry/:id" element={<FormOrderLaundry />} />
            <Route path="Pesanan/EditPesanan" element={<HomePage />} />
            <Route path="Pesanan/RatingDanReviewPelanggan" element={<CustomerRatingsAndReviews />} />
            <Route path="Pesanan/DaftarPesanan/:status" element={<OrderList />} />

            {/* Business Information Menu Route */}
            <Route path="InformasiBisnis" element={<BusinessInformationMenu />} />
            <Route path="InformasiBisnis/InformasiUmum" element={<GeneralInformation />} />
            <Route path="InformasiBisnis/JenisLaundry" element={<LaundryType />} />
            <Route path="InformasiBisnis/JenisLayanan" element={<ServiceType />} />
            <Route path="InformasiBisnis/TentangKami" element={<AboutUs />} />
            <Route path="InformasiBisnis/AlasanMengapaMemilihKami" element={<ReasonsWhyChooseUs />} />
            <Route path="InformasiBisnis/CaraPemesanan" element={<HowToOrder />} />
            <Route path="InformasiBisnis/Galeri" element={<Gallery />} />
            <Route path="InformasiBisnis/PertanyaanYangSerinDiAjukan" element={<FrequentlyAskedQuestions />} />
            <Route path="InformasiBisnis/MetodePembayaran" element={<PaymentMethod />} />
            
            {/* Events Menu Route */}
            <Route path="Event" element={<EventMenu />} />
            <Route path="Event/BuatEventBaru" element={<CreateNewEvents />} />
            <Route path="Event/EditEvent/:id" element={<EditEvents />} />
            
            {/* Finance Menu Route */}
            <Route path="Keuangan" element={<FinanceMenu />} />
            <Route path="Keuangan/InputPemasukan" element={<AddIncome />} />
            <Route path="Keuangan/EditPemasukan/:id" element={<EditIncome />} />
            <Route path="Keuangan/InputPengeluaran" element={<AddExpenses />} />
            <Route path="Keuangan/EditPengeluaran/:id" element={<EditExpenses />} />
            
            {/* Customer Menu Route */}
            <Route path="Pelanggan" element={<CustomerMenu />} />
            <Route path="Pelanggan/RegistrasiPelangganBaru" element={<RegisterNewCustomer />} />
            <Route path="Pelanggan/EditInformasiPelanggan/:id" element={<EditCustomerInformation />} />
          </Route>
        </Routes>
  );
}

export default AdminRouter;
