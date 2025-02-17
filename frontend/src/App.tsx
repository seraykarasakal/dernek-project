import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHaberler from "./pages/AdminHaberler";
import AdminHaberEkle from "./pages/AdminHaberEkle";
import AdminDuyurular from "./pages/AdminDuyurular";
import AdminDuyuruEkle from "./pages/AdminDuyuruEkle";
// Eksik import eklendi
function App() {
    return (
        <Router>
            <div className="container mt-3">
                <h1>Admin Panel</h1>
                <Routes>
                    <Route path="/admin/haberler" element={<AdminHaberler />} />
                    <Route path="/admin/haber-ekle" element={<AdminHaberEkle />} />
                    <Route path="/admin/duyurular" element={<AdminDuyurular />} />
                    <Route path="/admin/duyuru-ekle" element={<AdminDuyuruEkle />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
