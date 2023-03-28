import { Navigate, Route, Routes } from 'react-router';
import { Outlet } from 'react-router-dom';
import CustomerLayout from '../layouts/CustomerLayout/CustomerLayout';
import HomePage from '../pages/customer/HomePage/HomePage';

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

  return (
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<HomePage />} />
          <Route path="galeri" element={<HomePage />} />
          <Route path="tentangKami" element={<HomePage />} />
          <Route path="strukPemesanan" element={<HomePage />} />

          <Route element={<HandleLoginSuccessfully />}>
            <Route path="registrasi" element={<HomePage />} />
            <Route path="login" element={<HomePage />} />
            <Route path="ajukanLupaPassword" element={<HomePage />} />
            <Route path="validasiAkun" element={<HomePage />} />
            <Route path="ubahPassword" element={<HomePage />} />
          </Route>

          <Route element={<ProtectedCustomerRoute />}>
            <Route path="areapelanggan" element={<HomePage />} />
            <Route path="areapelanggan/editProfil" element={<HomePage />} />
            <Route path="areapelanggan/ubahPassword" element={<HomePage />} />
            <Route path="areapelanggan/buatPesananBaru" element={<HomePage />} />
            <Route path="areapelanggan/detailPesanan" element={<HomePage />} />
            <Route path="areapelanggan/ratingDanReview" element={<HomePage />} />
          </Route>
        </Routes>
  );
}

export default CustomerRouter;
