var rn_bridge = require('rn-bridge');
const tf = require('@tensorflow/tfjs-node')
const Upscaler = require('upscaler/node') // this is important!


const MODEL_MAP = {
    slim: {
        2: '@upscalerjs/esrgan-slim/2x',
        3: '@upscalerjs/esrgan-slim/3x',
        4: '@upscalerjs/esrgan-slim/4x',
        8: '@upscalerjs/esrgan-slim/8x',
    },
    medium: {
        2: '@upscalerjs/esrgan-medium/2x',
        3: '@upscalerjs/esrgan-medium/3x',
        4: '@upscalerjs/esrgan-medium/4x',
        8: '@upscalerjs/esrgan-medium/8x',
    },
};


let upscaler = null;


const loadModel = async (modelType, factor) => {
    const modelPath = MODEL_MAP[modelType][factor];
    if (!modelPath) throw new Error(`Invalid model type or factor: ${modelType} ${factor}`);
    return import(modelPath);
};


const upscaleImage = async (selectedImage, modelType, scaleFactor) => {
    try {
        const model = await loadModel(modelType, scaleFactor);

        upscaler = new Upscaler({ model })
        const abortController = new AbortController()

        const image = tf.node.decodeImage(selectedImage, 3)
        const tensor = await upscaler.upscale(image, {
            signal: abortController.signal,
        }).catch(abortError => {
            console.log('UpscalerJS has been aborted', abortError)
        })
        const upscaledTensor = await tf.node.encodePng(tensor)
        //return the upscaled image to react-native
        rn_bridge.channel.send({ type: 'UPSCALED', data: { image: upscaledTensor } });
        // dispose the tensors!
        image.dispose()
        tensor.dispose()
        upscaledTensor.dispose()
    } catch (error) {
        console.log(error)
        rn_bridge.channel.send({ type: 'ERROR', data: error.message });
    }

}





rn_bridge.channel.on('message', (payload) => {
    // rn_bridge.channel.send(payload);

    if (payload.type === 'UPSCALE') {
        const { selectedImage, model, upscaleFactor } = payload.data;
        upscaleImage(selectedImage, model, upscaleFactor)
    }
    if (payload.type === 'CANCEL') {
        upscaler.abort()
        console.log('Upscaling process has been canceled.');
    }
});

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");