import { Navigate, Route, Routes } from 'react-router';
import { Outlet } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import HomePage from '../pages/customer/HomePage/HomePage';

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
            <Route path="Admin" element={<HomePage />} />
            <Route path="LupaPassword" element={<HomePage />} />
            <Route path="ValidasiAkun" element={<HomePage />} />
            <Route path="UbahPassword" element={<HomePage />} />
          </Route>
          <Route element={<ProtectedAdminRoute />}>
            {/* Dashboard Menu Route */}
            <Route path="Dashboard" element={<HomePage />} />
            <Route path="Dashboard/EditProfil" element={<HomePage />} />
            <Route path="Dashboard/UbahPassword" element={<HomePage />} />
            <Route path="Dashboard/RegistrasiAdministratorBaru" element={<HomePage />} />
            <Route path="Dashboard/EditAdministrator" element={<HomePage />} />

            {/* Order Menu Route */}
            <Route path="Pesanan" element={<HomePage />} />
            <Route path="Pesanan/BuatPesananBaru" element={<HomePage />} />
            <Route path="Pesanan/EditPesanan" element={<HomePage />} />
            <Route path="Pesanan/DetailPesanan" element={<HomePage />} />
            <Route path="Pesanan/RatingDanReviewPelanggan" element={<HomePage />} />
            <Route path="Pesanan/DaftarPesanan" element={<HomePage />} />

            {/* Business Information Menu Route */}
            <Route path="InformasiBisnis" element={<HomePage />} />
            <Route path="InformasiBisnis/InformasiUmum" element={<HomePage />} />
            <Route path="InformasiBisnis/JenisLaundry" element={<HomePage />} />
            <Route path="InformasiBisnis/JenisLayanan" element={<HomePage />} />
            <Route path="InformasiBisnis/TentangKami" element={<HomePage />} />
            <Route path="InformasiBisnis/AlasanMengapaMemilihKami" element={<HomePage />} />
            <Route path="InformasiBisnis/CaraPemesanan" element={<HomePage />} />
            <Route path="InformasiBisnis/Galeri" element={<HomePage />} />
            <Route path="InformasiBisnis/PertanyaanYangSerinDiAjukan" element={<HomePage />} />
            <Route path="InformasiBisnis/MetodePembayaran" element={<HomePage />} />
            
            {/* Events Menu Route */}
            <Route path="Event" element={<HomePage />} />
            <Route path="Event/BuatEventBaru" element={<HomePage />} />
            <Route path="Event/EditEvent" element={<HomePage />} />
            
            {/* Finance Menu Route */}
            <Route path="Keuangan" element={<HomePage />} />
            <Route path="Keuangan/TambahPemasukan" element={<HomePage />} />
            <Route path="Keuangan/EditPemasukan" element={<HomePage />} />
            <Route path="Keuangan/InputPengeluaran" element={<HomePage />} />
            <Route path="Keuangan/Edit Pengeluaran" element={<HomePage />} />
            
            {/* Customer Menu Route */}
            <Route path="Pelanggan" element={<HomePage />} />
            <Route path="Pelanggan/RegistrasiPelangganBaru" element={<HomePage />} />
            <Route path="Pelanggan/EditInformasiPelanggan" element={<HomePage />} />
          </Route>
        </Routes>
  );
}

export default AdminRouter;
