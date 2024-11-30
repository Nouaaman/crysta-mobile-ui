import React, { useState, useEffect } from 'react';
import nodejs from 'nodejs-mobile-react-native';


const useUpscale = () => {

    const [isUpscaling, setIsUpscaling] = useState(false);
    const [error, setError] = useState(null);
    const [upscaledImage, setUpscaledImage] = useState(null);
    const [abortController, setAbortController] = useState(null); // For canceling the operation


    useEffect(() => {
        nodejs.start('upscale.js');
        nodejs.channel.addListener('message', (payload) => {
            console.log('From node: ', payload);
            switch (payload.type) {
                case 'upscaled':
                    setUpscaledImage(payload.data.image);
                    setIsUpscaling(false);
                    break;
                case 'error':
                    setError(payload.data.message);
                    setIsUpscaling(false);
                    break;
                default:
                    console.log('Unknown message type: ', payload.type);
                    break;
            }
        });
    });


    const upscaleImage = async (selectedImage, model, upscaleFactor) => {
        setIsUpscaling(true);
        setError(null);
        setUpscaledImage(null);

        const controller = new AbortController();
        setAbortController(controller);

        try {
            nodejs.channel.send({
                type: 'UPSCALE',
                data: {
                    selectedImage,
                    model,
                    upscaleFactor,
                },
            });
        } catch (error) {
            setError(error);
            setIsUpscaling(false);
        }
    };

    const cancelUpscale = () => {
        nodejs.channel.send({
            type: 'CANCEL'
        });
        setIsUpscaling(false);
    };

    return { isUpscaling, error, upscaledImage, upscaleImage, cancelUpscale };

};

export default useUpscale;
