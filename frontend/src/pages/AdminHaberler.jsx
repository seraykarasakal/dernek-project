import { useEffect, useState } from "react";

function AdminHaberler() {
    const [haberler, setHaberler] = useState([]);
    const [hata, setHata] = useState(null);

    useEffect(() => {
        fetch("http://localhost:9090/api/haberler")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("API isteği başarısız!");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Gelen veri:", data);
                setHaberler(data);
            })
            .catch((error) => {
                console.error("Hata:", error);
                setHata(error.message);
            });
    }, []);

    return (
        <div className="container">
            <h1>Admin Haberler Paneli</h1>
            {hata && <p style={{ color: "red" }}>Hata: {hata}</p>}
            <ul>
                {haberler.map((h) => (
                    <li key={h.id}>
                        {h.konu} - {h.icerik}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminHaberler;
