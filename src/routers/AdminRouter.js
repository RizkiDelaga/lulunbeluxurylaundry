import { Navigate, Route, Routes } from 'react-router';
import { Outlet } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import HomePage from '../pages/customer/HomePage/HomePage';
import PageStructure from '../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import CreateNewOrder from '../pages/administrator/orderMenu/CreateNewOrder/CreateNewOrder';
import RegisterNewAdministrator from '../pages/administrator/dashboardMenu/RegisterNewAdministrator/RegisterNewAdministrator';
import EditProfile from '../pages/administrator/dashboardMenu/EditProfile/EditProfile';
import ChangePassword from '../pages/administrator/dashboardMenu/ChangePassword/ChangePassword';
import EditAdministrators from '../pages/administrator/dashboardMenu/EditAdministrators/EditAdministrators';
import CreateNewEvents from '../pages/administrator/eventMenu/CreateNewEvents/CreateNewEvents';
import AddExpenses from '../pages/administrator/financeMenu/AddExpenses/AddExpenses';
import AddIncome from '../pages/administrator/financeMenu/AddIncome/AddIncome';
import RegisterNewCustomer from '../pages/administrator/customerMenu/NewCustomerRegistration/RegisterNewCustomer';
import GeneralInformation from '../pages/administrator/businessInformationMenu/GeneralInformation/GeneralInformation';
import ServiceType from '../pages/administrator/businessInformationMenu/ServiceType/ServiceType';
import ReasonsWhyChooseUs from '../pages/administrator/businessInformationMenu/ReasonsWhyChooseUs/ReasonsWhyChooseUs';
import Gallery from '../pages/administrator/businessInformationMenu/Gallery/Gallery';
import FrequentlyAskedQuestions from '../pages/administrator/businessInformationMenu/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import AboutUs from '../pages/administrator/businessInformationMenu/AboutUs/AboutUs';
import HowToOrder from '../pages/administrator/businessInformationMenu/HowToOrder/HowToOrder';
import PaymentMethod from '../pages/administrator/businessInformationMenu/PaymentMethod/PaymentMethod';
import LaundryType from '../pages/administrator/businessInformationMenu/LaundryType/LaundryType';
import LoginAdmin from '../pages/administrator/adminAuth/LoginAdmin/LoginAdmin';
import ForgotPasswordRequest from '../pages/administrator/adminAuth/ForgotPasswordRequest/ForgotPasswordRequest';
import AccountValidation from '../pages/administrator/adminAuth/AccountValidation/AccountValidation';
import ChangePasswordOnForgotPassword from '../pages/administrator/adminAuth/ChangePasswordOnForgotPassword/ChangePasswordOnForgotPassword';

function AdminRouter() {

  const HandleLoginSuccessfully = () => {
    if (localStorage.getItem("access_token_admin")) {
        return <Navigate to={-1} replace />
    }
    return <Outlet />;
  }

  const ProtectedAdminRoute = () => {
    if (localStorage.getItem("access_token_admin")) {
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
            <Route path="Admin/ValidasiAkun" element={<AccountValidation />} />
            <Route path="Admin/UbahPassword" element={<ChangePasswordOnForgotPassword />} />
          </Route>
          <Route element={<ProtectedAdminRoute />}>
            {/* Dashboard Menu Route */}
            <Route path="Dashboard" element={<PageStructure defaultMenu="dashboard"
                previousPage={[{
                  title: 'Title Name',
                  link: '/link',
                }]}
                currentPage={{
                  title: 'Title Name',
                  link: '/link',
                }} 
                directButton={{ value: 'Input', link: '/dashboard', secondaryColor: true }}
              />} />
            <Route path="Dashboard/EditProfil" element={<EditProfile />} />
            <Route path="Dashboard/UbahPassword" element={<ChangePassword />} />
            <Route path="Dashboard/RegistrasiAdministratorBaru" element={<RegisterNewAdministrator />} />
            <Route path="Dashboard/EditAdministrator" element={<EditAdministrators />} />

            {/* Order Menu Route */}
            <Route path="Pesanan" element={<HomePage />} />
            <Route path="Pesanan/BuatPesananBaru" element={<CreateNewOrder />} />
            <Route path="Pesanan/EditPesanan" element={<HomePage />} />
            <Route path="Pesanan/:id" element={<HomePage />} />
            <Route path="Pesanan/RatingDanReviewPelanggan" element={<HomePage />} />
            <Route path="Pesanan/DaftarPesanan" element={<HomePage />} />

            {/* Business Information Menu Route */}
            <Route path="InformasiBisnis" element={<HomePage />} />
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
            <Route path="Event" element={<HomePage />} />
            <Route path="Event/BuatEventBaru" element={<CreateNewEvents />} />
            <Route path="Event/EditEvent" element={<HomePage />} />
            
            {/* Finance Menu Route */}
            <Route path="Keuangan" element={<HomePage />} />
            <Route path="Keuangan/InputPemasukan" element={<AddIncome />} />
            <Route path="Keuangan/EditPemasukan" element={<HomePage />} />
            <Route path="Keuangan/InputPengeluaran" element={<AddExpenses />} />
            <Route path="Keuangan/Edit Pengeluaran" element={<HomePage />} />
            
            {/* Customer Menu Route */}
            <Route path="Pelanggan" element={<HomePage />} />
            <Route path="Pelanggan/RegistrasiPelangganBaru" element={<RegisterNewCustomer />} />
            <Route path="Pelanggan/EditInformasiPelanggan" element={<HomePage />} />
          </Route>
        </Routes>
  );
}

export default AdminRouter;
