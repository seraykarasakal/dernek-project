import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHaberler from "./pages/AdminHaberler";
import AdminHaberEkle from "./pages/AdminHaberEkle";

function App() {
    return (
        <Router>
            <div className="container mt-3">
                <h1>Admin Panel</h1>
                <Routes>
                    <Route path="/admin/haberler" element={<AdminHaberler />} />
                    <Route path="/admin/haber-ekle" element={<AdminHaberEkle />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
