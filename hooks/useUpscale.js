import { useState, useCallback, useEffect } from 'react';
import Upscaler from 'upscaler';
import mediumModels from '@upscalerjs/esrgan-medium';
import slimModels from '@upscalerjs/esrgan-slim';
import nodejs from 'nodejs-mobile-react-native'; // Assuming you're using this for Node.js integration
import rn_bridge from 'rn-bridge'; // Assuming you're using rn-bridge for event handling

const modelMap = {
    detailed: mediumModels,
    fast: slimModels,
};

const useUpscale = () => {
    const [progress, setProgress] = useState(0);
    const [isUpscaling, setIsUpscaling] = useState(false);
    const [error, setError] = useState(null);
    const [upscaledImage, setUpscaledImage] = useState(null);
    const [abortController, setAbortController] = useState(null); // For canceling the operation

    // Start the Node.js script and handle pause/resume
    useEffect(() => {
        // Start Node.js when the screen is mounted
        nodejs.start('upscaleScript.js'); // Ensure to use the correct script

        // Listen for pause and resume events
        rn_bridge.app.on('pause', (pauseLock) => {
            console.log('[node] app paused.');
            nodejs.channel.post('pause'); // Pause the upscale process if necessary
            pauseLock.release(); // Release the pause lock to allow the app to go into the background
        });

        rn_bridge.app.on('resume', () => {
            console.log('[node] app resumed.');
            nodejs.channel.post('resume'); // Resume the upscale process if necessary
        });

        // Cleanup listeners when the component is unmounted
        return () => {
            rn_bridge.app.off('pause');
            rn_bridge.app.off('resume');
        };
    }, []);

    const upscaleImage = useCallback(async (imageData, { modelType, scale }) => {
        const selectedModel = modelMap[modelType]?.[`x${scale}`];
        if (!selectedModel) {
            setError('Invalid model or scale selection');
            return null;
        }

        const controller = new AbortController();
        setAbortController(controller); // Save controller to allow cancellation

        const upscaler = new Upscaler({
            model: selectedModel,
            onProgress: (newProgress) => {
                setProgress(newProgress); // Track progress
            },
            signal: controller.signal, // Link abort controller to upscaler
        });

        setIsUpscaling(true);
        setProgress(0);
        setError(null);
        setUpscaledImage(null); // Clear previous upscaled image

        try {
            const upscaledResult = await upscaler.upscale(imageData); // Start the upscaling process
            setUpscaledImage(upscaledResult);
            setIsUpscaling(false);
            return upscaledResult; // Return upscaled image
        } catch (err) {
            if (err.name === 'AbortError') {
                setError('Upscaling was canceled');
            } else {
                setError('Upscaling failed: ' + err.message);
            }
            setIsUpscaling(false);
            return null;
        }
    }, []);

    const cancelUpscale = useCallback(() => {
        if (abortController) {
            abortController.abort(); // Cancel the upscaling operation
            setIsUpscaling(false);
            setError('Upscaling was canceled');
        }
    }, [abortController]);

    return {
        upscaleImage,
        cancelUpscale,
        progress,
        isUpscaling,
        error,
        upscaledImage,
    };
};

export default useUpscale;
