import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

type ScaleFactor = "x2" | "x3" | "x4" | "x8";
type ModelType = "esrgan-slim" | "esrgan-medium";

interface ModelConfig {
    modelType: ModelType;
    scaleFactor: ScaleFactor;
}

const useUpscalerModel = ({ modelType, scaleFactor }: ModelConfig) => {
    const [model, setModel] = useState<tf.GraphModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadModel = async () => {
            try {
                if (!isMounted) return;

                await tf.ready();
                setIsLoading(true);

                const basePath = `${modelType}/${scaleFactor}`;

                const modelJson = require(`./assets/${basePath}/model.json`);
                const modelWeights = [
                    require(`./assets/${basePath}/group1-shard1of1.bin`),
                ];

                const loadedModel = await tf.loadGraphModel(
                    bundleResourceIO(modelJson, modelWeights),
                );

                if (isMounted) {
                    setModel(loadedModel);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error(
                                  `Failed to load ${modelType} ${scaleFactor} model`,
                              ),
                    );
                    setModel(null);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadModel();

        return () => {
            isMounted = false;
            // Optional: Dispose model if needed when unmounting
            // if (model) model.dispose();
        };
    }, [scaleFactor]);

    return { model, isLoading, error };
};

export default useUpscalerModel;
