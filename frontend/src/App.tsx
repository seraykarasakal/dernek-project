import { useEffect, useState } from "react";

function App() {
    const [haberler, setHaberler] = useState([]);
    const [hata, setHata] = useState(null);

    useEffect(() => {
        fetch("/api/haberler")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Bağlantı hatası");
                }
                return response.json();
            })
            .then((data) => setHaberler(data))
            .catch((error) => setHata(error.message));
    }, []);

    return (
        <div>
            <h1>Haberler</h1>
            {hata && <p style={{ color: "red" }}>Hata: {hata}</p>}
            <ul>
                {haberler.map((haber, index) => (
                    <li key={index}>
                        {haber.konu} - {haber.icerik}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
