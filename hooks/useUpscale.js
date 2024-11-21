import { useState, useRef, useCallback } from 'react';
import Upscaler from 'upscaler';
import mediumModels from '@upscalerjs/esrgan-medium';
import slimModels from '@upscalerjs/esrgan-slim';

const modelMap = {
    medium: mediumModels,
    slim: slimModels,
};

const useUpscale = () => {
    const [progress, setProgress] = useState(0);
    const [isUpscaling, setIsUpscaling] = useState(false);
    const [error, setError] = useState(null);
    const cancelRef = useRef(null);

    const upscaleImage = useCallback(async (imageData, { modelType, scale }) => {
        const selectedModel = modelMap[modelType][`x${scale}`];
        if (!selectedModel) {
            setError('Invalid model selection');
            return null;
        }

        const upscaler = new Upscaler({ model: selectedModel });
        cancelRef.current = () => upscaler.abort();

        setIsUpscaling(true);
        setProgress(0);
        setError(null);

        try {
            const upscaledImage = await upscaler.upscale(imageData, {
                output: 'base64',
                patchSize: 128, // Adjust for performance
                progress: (progress) => setProgress(progress),
            });
            setIsUpscaling(false);
            return upscaledImage;
        } catch (err) {
            if (err.name === 'AbortError') {
                setError('Upscaling was canceled');
            } else {
                setError('Upscaling failed');
            }
            setIsUpscaling(false);
            return null;
        }
    }, []);

    const cancelUpscale = useCallback(() => {
        if (cancelRef.current) {
            cancelRef.current();
        }
    }, []);

    return {
        upscaleImage,
        cancelUpscale,
        progress,
        isUpscaling,
        error,
    };
};

export default useUpscale;
