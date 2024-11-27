import { useState, useEffect } from 'react';

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



const useUpscale = () => {
    const [isUpscaling, setIsUpscaling] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [upscaledImage, setUpscaledImage] = useState(null);

    const upscaleImage = async (selectedImage, { modelType, scale }) => {

    };

    const cancelUpscale = () => {
        // Implement cancel logic if applicable
        setIsUpscaling(false);
    };

    return { upscaleImage, cancelUpscale, progress, isUpscaling, error };
};

export default useUpscale;
