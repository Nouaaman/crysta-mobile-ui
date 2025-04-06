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
         tf.engine().startScope(); // Start a new scope for memory management
         setIsProcessing(true);
         console.log("==================== Upscaling image...");

         setError(null);

         const { uri } = pickedImage;
         const response = await fetch(uri);
         const imgData = await response.arrayBuffer();


         // Use tf.tidy to manage memory and dispose of intermediate tensors
         let base64: string | null = null;
         outputTensor = tf.tidy(() => {
            console.log("============= Memory Before upscaling:", tf.memory());

            const imageTensor = decodeJpeg(new Uint8Array(imgData));
            const normalized = imageTensor.toFloat().div(255).expandDims(0);
            // tf.dispose(imageTensor); // Dispose imageTensor immediately after use

            const output = model.predict(normalized) as tf.Tensor;
            // tf.dispose(normalized); // Dispose normalized tensor immediately after use
            console.log("============= Memory After upscaling:", tf.memory());
            return output;
         });

         // Convert output tensor to base64 outside of tf.tidy
         base64 = await tensorToBase64(outputTensor);

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

         if (outputTensor) {
            tf.dispose(outputTensor); // Dispose of outputTensor in the finally block
         }
         tf.engine().endScope();

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
