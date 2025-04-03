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

   const upscaleImage = async (model: tf.GraphModel) => {
      if (!model) {
         setError(new Error("Model Error"));
         return;
      }

      // let imageTensor: tf.Tensor | null = null;
      // let normalized: tf.Tensor | null = null;
      // let outputTensor: tf.Tensor | null = null;

      let outputTensor: tf.Tensor | null = null; // Declare outputTensor outside the try block

      try {
         // Image preprocessing
         if (!pickedImage) {
            throw new Error("No image selected");
         }
         setIsProcessing(true);
         console.log("==================== Upscaling image...");

         setError(null);

         const { uri } = pickedImage;
         const response = await fetch(uri);
         const imgData = await response.arrayBuffer();


         // Use tf.tidy to manage memory and dispose of intermediate tensors
         let base64: string | null = null;
         tf.engine().startScope(); // Start a new scope for memory management
         outputTensor = tf.tidy(() => {
            const imageTensor = decodeJpeg(new Uint8Array(imgData));
            const normalized = imageTensor.toFloat().div(255).expandDims(0);
            tf.dispose(imageTensor); // Dispose imageTensor immediately after use

            const output = model.predict(normalized) as tf.Tensor;
            tf.dispose(normalized); // Dispose normalized tensor immediately after use
            return output;
         });

         // Convert output tensor to base64 outside of tf.tidy
         base64 = await tensorToBase64(outputTensor);
         tf.dispose(outputTensor); // Dispose outputTensor after conversion

         tf.engine().endScope(); // End the scope to free up memory

         if (!base64) {
            throw new Error("Failed to process image");
         }

         setUpscaledImage(base64);
         console.log("==================== Upscaled image: ", base64);

      } catch (err) {
         setError(
            err instanceof Error ? err : new Error("Upscaling failed"),
         );
         console.log("==================== Upscaling error: ", err);

      } finally {
         setIsProcessing(false);
         // Cleanup remaining tensors
         if (outputTensor) {
            tf.dispose(outputTensor); // Dispose of outputTensor in the finally block
         }
      }
   };

   return {
      upscaleImage,
      upscaledImage,
      isProcessing,
      error,
      pickImage,
      pickedImage,
      setPickedImage
   };
};

export default useImageUpscaler;
