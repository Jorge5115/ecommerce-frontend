import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';

const FOLDERS = [
    { value: 'categories', label: '🏷️ Categorias' },
];

export default function CategoryGalleryPicker({ onImageSelected, currentImage }) {
    const [folder, setFolder] = useState('categories');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(currentImage || null);

    useEffect(() => {
        fetchImages();
    }, [folder]);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/images/list/${folder}`);
            setImages(response.data);
        } catch (error) {
            toast.error('Error al cargar la galeria');
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (url) => {
        setSelected(url);
        onImageSelected(url);
    };

    return (
        <div>
            <label className="form-label fw-bold">Selecciona una imagen para la categoria</label>

            {loading ? (
                <div className="text-center py-3">
                    <div className="spinner-border spinner-border-sm text-primary"></div>
                </div>
            ) : images.length === 0 ? (
                <div className="alert alert-info small">
                    No hay imagenes en la carpeta categories. Subelas desde Cloudinary.
                </div>
            ) : (
                <div className="row g-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {images.map(url => (
                        <div key={url} className="col-4 col-md-3">
                            <img
                                src={url}
                                alt="galeria"
                                className="img-fluid rounded"
                                style={{
                                    height: '80px',
                                    width: '100%',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    border: selected === url ? '3px solid #20c997' : '3px solid transparent',
                                }}
                                onClick={() => handleSelect(url)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {selected && (
                <div className="mt-2">
                    <small className="text-success fw-bold">✅ Imagen seleccionada</small>
                    <img
                        src={selected}
                        alt="seleccionada"
                        className="img-thumbnail d-block mt-1"
                        style={{ maxHeight: '100px' }}
                    />
                </div>
            )}
        </div>
    );
}