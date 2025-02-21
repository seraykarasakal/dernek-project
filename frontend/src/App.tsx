import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHaberler from "./pages/AdminHaberler";
import AdminHaberEkle from "./pages/AdminHaberEkle";
import AdminDuyurular from "./pages/AdminDuyurular";
import AdminDuyuruEkle from "./pages/AdminDuyuruEkle";
import UserDashboard from "./pages/UserDashboard";
import UserHaberler from "./pages/UserHaberler";
import UserDuyurular from "./pages/UserDuyurular";
// Eksik import eklendi
function App() {
    return (
        <Router>
            <div className="container mt-3">
                <Routes>
                    <Route path="/admin/haberler" element={<AdminHaberler />} />
                    <Route path="/admin/haber-ekle" element={<AdminHaberEkle />} />
                    <Route path="/admin/duyurular" element={<AdminDuyurular />} />
                    <Route path="/admin/duyuru-ekle" element={<AdminDuyuruEkle />} />
                    <Route path="/" element={<UserDashboard />} />
                    <Route path="/user/haberler" element={<UserHaberler />} />
                    <Route path="/user/duyurular" element={<UserDuyurular />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
