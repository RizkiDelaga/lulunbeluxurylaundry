import { Route, Routes } from 'react-router';
import Home from '../pages/customer/Home/Home';

function CustomerRouter() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="galeri" element={<Home />} />
          <Route path="tentangKami" element={<Home />} />
          <Route path="strukPemesanan" element={<Home />} />

          <Route path="registrasi" element={<Home />} />
          <Route path="login" element={<Home />} />
          <Route path="ajukanLupaPassword" element={<Home />} />
          <Route path="validasiAkun" element={<Home />} />
          <Route path="ubahPassword" element={<Home />} />


          <Route path="areapelanggan" element={<Home />} />
          <Route path="areapelanggan/editProfil" element={<Home />} />
          <Route path="areapelanggan/ubahPassword" element={<Home />} />
          <Route path="areapelanggan/buatPesananBaru" element={<Home />} />
          <Route path="areapelanggan/detailPesanan" element={<Home />} />
          <Route path="areapelanggan/ratingDanReview" element={<Home />} />
        </Routes>
  );
}

export default CustomerRouter;
