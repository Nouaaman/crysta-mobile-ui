import { useState, useCallback, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { loadModelAssets } from "../../utils/modelLoader";

type ScaleFactor = "x2" | "x3" | "x4" | "x8";
type ModelType = "esrgan-slim" | "esrgan-medium";

const useUpscalerModel = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<Error | null>(null);
   const modelRef = useRef<tf.GraphModel | null>(null);
   const abortControllerRef = useRef<AbortController>(new AbortController());
   const currentParamsRef = useRef<{
      modelType: ModelType;
      scaleFactor: ScaleFactor;
   }>();

   const getModel = useCallback(
      async (
         modelType: ModelType,
         scaleFactor: ScaleFactor,
      ): Promise<tf.GraphModel> => {
         // Return cached model if parameters match
         if (
            modelRef.current &&
            currentParamsRef.current?.modelType === modelType &&
            currentParamsRef.current?.scaleFactor === scaleFactor
         ) {
            return modelRef.current;
         }

         // Cancel previous request
         abortControllerRef.current.abort();
         abortControllerRef.current = new AbortController();

         try {
            setIsLoading(true);
            setError(null);

            await tf.ready();

            // Load model assets
            const modelAssets = loadModelAssets(modelType, scaleFactor);
            if (!modelAssets) {
               throw new Error("Failed to load model assets");
            }
            const { modelJson, modelWeights } = modelAssets;

            // Load model
            const model = await tf.loadGraphModel(
               bundleResourceIO(modelJson, modelWeights),
               // Remove signal property
               {},
            );

            // Cleanup previous model
            if (modelRef.current) {
               // Cast to any to avoid type error
               tf.dispose(modelRef.current as any);
            }

            // Update cache
            modelRef.current = model;
            currentParamsRef.current = { modelType, scaleFactor };

            return model;
         } catch (err) {
            if (!abortControllerRef.current.signal.aborted) {
               const error =
                  err instanceof Error
                     ? err
                     : new Error("Model load failed");
               setError(error);
               throw error;
            }
            throw new Error("Model load cancelled");
         } finally {
            if (!abortControllerRef.current.signal.aborted) {
               setIsLoading(false);
            }
         }
      },
      [],
   );

   // Cleanup on unmount
   // Add import for useEffect
   const { useEffect } = require("react");
   useEffect(() => {
      return () => {
         abortControllerRef.current.abort();
         if (modelRef.current) {
            // Cast to any to avoid type error
            tf.dispose(modelRef.current as any);
            modelRef.current = null;
         }
      };
   }, []);

   return {
      isLoading,
      error,
      getModel,
   };
};

export default useUpscalerModel;
