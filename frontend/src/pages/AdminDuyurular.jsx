import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Header from "../components/Header";

function AdminDuyurular() {
    const [duyurular, setDuyurular] = useState([]);
    const [hata, setHata] = useState(null);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [seciliDuyuru, setSeciliDuyuru] = useState(null);

    // Duyuruları Fetch Et
    useEffect(() => {
        fetch("http://localhost:9090/api/duyurular")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Bağlantı hatası");
                }
                return response.json();
            })
            .then((data) => setDuyurular(data))
            .catch((error) => setHata(error.message));
    }, []);

    const buttons = [
        { label: "Haberler", variant: "primary", link: "/admin/haberler" },
        { label: "Duyuru Ekle", variant: "success", link: "/admin/duyuru-ekle" },
    ];

    // Güncelleme Modalını Aç
    const handleShow = (duyuru) => {
        setSeciliDuyuru(duyuru);
        setShow(true);
    };

    // Güncelleme Modalını Kapat
    const handleClose = () => {
        setShow(false);
        setSeciliDuyuru(null);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!seciliDuyuru) return;

        // Eğer yeni resim seçilmemişse, eski resmi koru
        const updatedDuyuru = {
            ...seciliDuyuru,
            resimUrl: seciliDuyuru.resimUrl ? seciliDuyuru.resimUrl : seciliDuyuru.eskiResimUrl,
        };

        fetch(`http://localhost:9090/api/duyurular/${seciliDuyuru.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedDuyuru),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Güncelleme başarısız! HTTP Status: ${response.status}`);
                }
                return response.json();
            })
            .then((updatedDuyuru) => {
                setDuyurular(duyurular.map((duyuru) => (duyuru.id === updatedDuyuru.id ? updatedDuyuru : duyuru)));
                handleClose();
            })
            .catch((error) => setHata(`Güncelleme hatası: ${error.message}`));
    };

    // Yeni Resim Seçildiğinde Base64'e Çeviren Fonksiyon
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSeciliDuyuru({ ...seciliDuyuru, resimUrl: reader.result.split(",")[1] });
        };
    };

    // Silme Modalını Açma
    const handleShowDelete = (duyuru) => {
        setSeciliDuyuru(duyuru);
        setShowDelete(true);
    };

    // Silme Modalını Kapatma
    const handleCloseDelete = () => {
        setShowDelete(false);
        setSeciliDuyuru(null);
    };

    // Silme İşlemi
    const handleDelete = () => {
        if (!seciliDuyuru) return;

        fetch(`http://localhost:9090/api/duyurular/${seciliDuyuru.id}`, {
            method: "DELETE",
        })
            .then(() => {
                setDuyurular(duyurular.filter((duyuru) => duyuru.id !== seciliDuyuru.id));
                handleCloseDelete();
            })
            .catch((error) => setHata(error.message));
    };

    return (
        <>
            <Header title="Admin Panel" subTitle="Duyurular" buttons={buttons} />

            <div className="container mt-3">
                {hata && <p style={{ color: "red" }}>Hata: {hata}</p>}
                <div className="container">
                    <div className="row">
                        {duyurular.map((duyuru) => (
                            <div key={duyuru.id} className=" col-md-6 col-lg-4 mb-4">
                                <div
                                    className="card shadow-sm "
                                    style={{
                                        width: "%40",
                                        height: "450px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div className="d-flex flex-column" style={{ height: "100%" }}>
                                        {/* Resim Solda */}
                                        <img
                                            src={`http://localhost:9090/api/duyurular/uploads/${duyuru.resimUrl.split("/").pop()}`}
                                            alt="Duyuru Resmi"
                                            className="img-fluid rounded "
                                            style={{
                                                height: "200px",
                                                objectFit: "cover",
                                            }}
                                        />

                                        {/* İçerik Sağda */}
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="card-title">{duyuru.konu}</h5>
                                                <p className="card-text" style={{ maxHeight: "200px", overflow: "hidden" }}>
                                                    {duyuru.icerik}
                                                </p>
                                            </div>{" "}
                                        </div>
                                    </div>

                                    <div className="card-footer d-flex justify-content-between align-items-center border-0 bg-transparent">
                                        <small className="text-muted">{duyuru.gecerlilikTarihi}</small>
                                        <div className="d-flex gap-2">
                                            <Button variant="outline-primary" onClick={() => handleShow(duyuru)}>
                                                <i className="bi bi-pencil-fill"></i> Güncelle
                                            </Button>
                                            <Button variant="outline-danger" onClick={() => handleShowDelete(duyuru)}>
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
                        <Modal.Title>Duyuru Güncelle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {seciliDuyuru && (
                            <Form onSubmit={handleUpdate}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Başlık</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={seciliDuyuru.konu}
                                        onChange={(e) => setSeciliDuyuru({ ...seciliDuyuru, konu: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>İçerik</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={seciliDuyuru.icerik}
                                        onChange={(e) => setSeciliDuyuru({ ...seciliDuyuru, icerik: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Geçerlilik Tarihi</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={seciliDuyuru.gecerlilikTarihi}
                                        onChange={(e) =>
                                            setSeciliDuyuru({
                                                ...seciliDuyuru,
                                                gecerlilikTarihi: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Yeni Resim (Opsiyonel)</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
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
                        <Modal.Title>Duyuruyu Sil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Bu duyuruyu silmek istediğinizden emin misiniz?</p>
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

export default AdminDuyurular;
{
    /* <div className="d-flex flex-column justify-content-center align-items-end gap-2 p-2">
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-primary" onClick={() => handleShow(duyuru)}>
                                            <i className="bi bi-pencil-fill"></i> Güncelle
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => handleShowDelete(duyuru)}>
                                            <i className="bi bi-trash-fill"></i> Sil
                                        </Button>
                                    </div>
                                </div> */
}
