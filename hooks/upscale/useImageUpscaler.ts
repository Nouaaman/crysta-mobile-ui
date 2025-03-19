import { useState } from "react";
import * as expoImgPicker from "expo-image-picker";
import * as tf from "@tensorflow/tfjs";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import { tensorToBase64 } from "../../utils/imageUtils";

const useImageUpscaler = () => {
    const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const [pickedImage, setPickedImage] = useState<{ uri: string } | null>(
        null,
    );

    const pickImage = async () => {
        const pickerResult = await expoImgPicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
            base64: false,
        });

        if (!pickerResult.canceled) {
            setPickedImage({ uri: pickerResult.assets[0].uri });
        }
    };

    const upscaleImage = async (model: tf.GraphModel, imageUri: string) => {
        if (!model) {
            setError(new Error("Model Error"));
            return;
        }

        if (!imageUri) {
            setError(new Error("No image given"));
            return;
        }

        let imageTensor: tf.Tensor | null = null;
        let normalized: tf.Tensor | null = null;
        let outputTensor: tf.Tensor | null = null;

        try {
            setIsProcessing(true);
            setError(null);

            // Image preprocessing
            if (!pickedImage) {
                throw new Error("No image selected");
            }
            const { uri } = pickedImage;
            const response = await fetch(uri);
            const imgData = await response.arrayBuffer();
            imageTensor = decodeJpeg(new Uint8Array(imgData));

            // Normalize and prepare tensor
            normalized = imageTensor.toFloat().div(255).expandDims(0);

            // Model inference
            outputTensor = model.predict(normalized) as tf.Tensor;

            // Convert tensor to image
            // Convert tensor to base64 using helper
            const base64 = await tensorToBase64(outputTensor);
            setUpscaledImage(base64);
        } catch (err) {
            setError(
                err instanceof Error ? err : new Error("Upscaling failed"),
            );
        } finally {
            setIsProcessing(false);
            // Cleanup remaining tensors
            tf.dispose(
                [imageTensor, normalized, outputTensor].filter(
                    Boolean,
                ) as unknown as tf.Tensor[],
            );
        }
    };

    return {
        upscaleImage,
        upscaledImage,
        isProcessing,
        error,
        pickImage,
    };
};

export default useImageUpscaler;
