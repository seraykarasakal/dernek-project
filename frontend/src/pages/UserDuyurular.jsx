import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";

function UserDuyurular() {
    // Custom Hook'u kullanarak veriyi çekiyoruz
    const { data: duyurular, loading, error } = useFetch("http://localhost:9090/api/duyurular");
    const [seciliDuyuru, setSeciliDuyuru] = useState(null);
    const [show, setShow] = useState(false);

    // Modal Açma Fonksiyonu
    const handleShow = (duyuru) => {
        setSeciliDuyuru(duyuru);
        setShow(true);
    };

    // Modal Kapatma Fonksiyonu
    const handleClose = () => {
        setShow(false);
        setSeciliDuyuru(null);
    };

    // Header için butonlar
    const buttons = [{ label: "Haberler", variant: "primary", link: "/user/haberler" }];

    // Eğer veri yükleniyorsa veya hata varsa gösterelim
    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;

    return (
        <>
            <Header title="Duyurular" buttons={buttons} />
            <div className="container mt-4">
                <div className="row">
                    {duyurular.map((duyuru) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={duyuru.id}>
                            <Card className="shadow-sm h-100" style={{ borderRadius: "10px" }}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:9090/api/duyurular/uploads/${duyuru.resimUrl.split("/").pop()}`}
                                    alt="Duyuru Resmi"
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                        borderTopLeftRadius: "10px",
                                        borderTopRightRadius: "10px",
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{duyuru.konu}</Card.Title>
                                    <Card.Text style={{ maxHeight: "100px", overflow: "hidden" }}>{duyuru.icerik}</Card.Text>
                                    <Card.Text className="text-muted">{duyuru.gecerlilikTarihi}</Card.Text>
                                    <Button variant="outline-success" onClick={() => handleShow(duyuru)}>
                                        Detay
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Modal (Duyuru Detayı) */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{seciliDuyuru?.konu}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <strong>İçerik:</strong> {seciliDuyuru?.icerik}
                        </p>
                        {seciliDuyuru?.gecerlilikTarihi && (
                            <p>
                                <strong>Geçerlilik Tarihi:</strong> {seciliDuyuru?.gecerlilikTarihi}
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Kapat
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default UserDuyurular;
