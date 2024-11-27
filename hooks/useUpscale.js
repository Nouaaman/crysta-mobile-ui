import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm';
const MODELS = {
    slim: 'esrgan-slim',
    medium: 'esrgan-medium',
};
const SCALES = {
    2: '2x',
    3: '3x',
    4: '4x',
    8: '8x',
};

// Helper to load external scripts
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

const useUpscale = () => {
    const [isUpscaling, setIsUpscaling] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const upscaleImage = async (imageUri, { modelType, scale }) => {
        setIsUpscaling(true);
        setError(null);

        try {
            const modelScript = `${CDN_BASE_URL}/@upscalerjs/${MODELS[modelType]}@latest/dist/umd/${SCALES[scale]}.min.js`;
            const upscalerScript = `${CDN_BASE_URL}/upscaler@latest/dist/browser/umd/upscaler.min.js`;

            // Load the model and Upscaler scripts
            await loadScript(modelScript);
            await loadScript(upscalerScript);

            // Initialize Upscaler
            const upscaler = new window.Upscaler({
                model: window[`ESRGANSlim${scale}x`], // Access global model
            });

            // Process image (can include a progress callback if needed)
            const result = await upscaler.upscale(imageUri, {
                patchSize: 64,
                progress: (value) => setProgress(value),
            });

            return result;
        } catch (err) {
            setError('Upscaling failed. Please try again.');
            return null;
        } finally {
            setIsUpscaling(false);
        }
    };

    const cancelUpscale = () => {
        // Implement cancel logic if applicable
        setIsUpscaling(false);
    };

    return { upscaleImage, cancelUpscale, progress, isUpscaling, error };
};

export default useUpscale;
