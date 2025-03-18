import { encode } from "jpeg-js";
import { Tensor } from "@tensorflow/tfjs";

export const tensorToBase64 = async (tensor: Tensor): Promise<string> => {
    try {
        // Convert tensor to pixel array
        const [height, width] = tensor.shape.slice(1, 3);
        const pixels = await tensor.data();

        // Encode to JPEG
        const imageData = encode(
            { width, height, data: Uint8Array.from(pixels) },
            90, // JPEG quality (0-100)
        );

        // Convert to base64
        return `data:image/jpeg;base64,${Buffer.from(imageData.data).toString("base64")}`;
    } finally {
        // Dispose intermediate tensors
        tensor.dispose();
    }
};
