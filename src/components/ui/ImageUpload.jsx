import { useState } from 'react';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';

export default function ImageUpload({ onImageUploaded, folder = 'product' }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Solo se permiten imagenes');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error('La imagen no puede superar 10MB');
            return;
        }

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axiosInstance.post(
                `/images/upload/${folder}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            onImageUploaded(response.data.url);
            toast.success('Imagen subida correctamente');
        } catch (error) {
            toast.error('Error al subir la imagen');
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="img-thumbnail mb-2"
                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                />
            )}
            <div className="input-group">
                <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
                {uploading && (
                    <span className="input-group-text">
                        <span className="spinner-border spinner-border-sm"></span>
                    </span>
                )}
            </div>
            <small className="text-muted">Max 10MB. JPG, PNG, WEBP</small>
        </div>
    );
}