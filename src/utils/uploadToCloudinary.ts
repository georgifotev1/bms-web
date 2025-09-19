import { env } from '@/config/env';

export async function uploadToCloudinary(file: File, brandId: number) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'devbms');
    formData.append('folder', `brand-${brandId}`);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const r = await response.json();
        return r;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}
