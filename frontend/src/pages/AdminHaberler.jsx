import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Header from "../components/Header";
function AdminHaberler() {
    const [haberler, setHaberler] = useState([]);
    const [hata, setHata] = useState(null);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [seciliHaber, setSeciliHaber] = useState(null);

    // Haberleri Fetch Et
    useEffect(() => {
        fetch("http://localhost:9090/api/haberler")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Bağlantı hatası");
                }
                return response.json();
            })
            .then((data) => setHaberler(data))
            .catch((error) => setHata(error.message));
    }, []);

    const buttons = [
        { label: "Duyurular", variant: "success", link: "/admin/duyurular" },
        { label: "Haber Ekle", variant: "primary", link: "/admin/haber-ekle" },
    ];
    // Modal Açma Fonksiyonu (Güncelleme)
    const handleShow = (haber) => {
        setSeciliHaber(haber);
        setShow(true);
    };

    // Modal Kapatma Fonksiyonu (Güncelleme)
    const handleClose = () => {
        setShow(false);
        setSeciliHaber(null);
    };

    // Güncelleme İşlemi
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!seciliHaber) return;

        fetch(`http://localhost:9090/api/haberler/${seciliHaber.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(seciliHaber),
        })
            .then((response) => response.json())
            .then((updatedHaber) => {
                setHaberler(haberler.map((haber) => (haber.id === updatedHaber.id ? updatedHaber : haber)));
                handleClose();
            })
            .catch((error) => setHata(error.message));
    };

    // Silme Modalını Açma
    const handleShowDelete = (haber) => {
        setSeciliHaber(haber);
        setShowDelete(true);
    };

    // Silme Modalını Kapatma
    const handleCloseDelete = () => {
        setShowDelete(false);
        setSeciliHaber(null);
    };

    // Silme İşlemi
    const handleDelete = () => {
        if (!seciliHaber) return;

        fetch(`http://localhost:9090/api/haberler/${seciliHaber.id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Haber silinemedi.");
                }
                setHaberler(haberler.filter((haber) => haber.id !== seciliHaber.id));
                handleCloseDelete();
            })
            .catch((error) => setHata(error.message));
    };

    return (
        <>
            <Header title="Admin Panel" subTitle="Haberler" buttons={buttons} />
            <div className="container mt-3">
                {hata && <p style={{ color: "red" }}>Hata: {hata}</p>}
                <div className="container">
                    <div className="row">
                        {haberler.map((haber) => (
                            <div key={haber.id} className=" col-md-6 col-lg-4 mb-4">
                                <div
                                    className="card shadow-sm "
                                    style={{
                                        width: "%40",
                                        height: "300px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{haber.konu}</h5>
                                        <p className="card-text">{haber.icerik}</p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between align-items-center border-0 bg-transparent">
                                        <small className="text-muted">{haber.gecerlilikTarihi}</small>
                                        <div className="d-flex gap-2">
                                            <Button variant="outline-primary" onClick={() => handleShow(haber)}>
                                                <i className="bi bi-pencil-fill"></i> Güncelle
                                            </Button>
                                            <Button variant="outline-danger" onClick={() => handleShowDelete(haber)}>
                                                <i className="bi bi-trash-fill"></i> Sil
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Güncelleme Modalı */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Haber Güncelle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {seciliHaber && (
                            <Form onSubmit={handleUpdate}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Konu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={seciliHaber.konu}
                                        onChange={(e) => setSeciliHaber({ ...seciliHaber, konu: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>İçerik</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={seciliHaber.icerik}
                                        onChange={(e) => setSeciliHaber({ ...seciliHaber, icerik: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Geçerlilik Tarihi</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={seciliHaber.gecerlilikTarihi}
                                        onChange={(e) =>
                                            setSeciliHaber({
                                                ...seciliHaber,
                                                gecerlilikTarihi: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Haber Linki</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={"http://localhost:9090/api/haberler/" + seciliHaber.id}
                                        onChange={(e) => setSeciliHaber({ ...seciliHaber, link: e.target.value })}
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Güncelle
                                </Button>
                            </Form>
                        )}
                    </Modal.Body>
                </Modal>

                {/* Silme Onay Modalı */}
                <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Haberi Sil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Bu haberi silmek istediğinizden emin misiniz?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            İptal
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Sil
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default AdminHaberler;
