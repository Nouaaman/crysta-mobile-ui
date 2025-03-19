type ModelType = "esrgan-slim" | "esrgan-medium";
type ScaleFactor = "x2" | "x3" | "x4" | "x8";

export const loadModelAssets = async (
    modelType: string,
    scaleFactor: string,
) => {
    try {

        const modelAssets = {
            //esrgan-slim
            "esrgan-slim-x2": {
                modelJson: require("../assets/models/esrgan-slim/x2/model.json"),
                modelWeights:
                    await require("../assets/models/esrgan-slim/x2/group1-shard1of1.bin"),
            },
            "esrgan-slim-x3": {
                modelJson: require("../assets/models/esrgan-slim/x3/model.json"),
                modelWeights:
                    await require("../assets/models/esrgan-slim/x3/group1-shard1of1.bin"),
            },
            "esrgan-slim-x4": {
                modelJson: require("../assets/models/esrgan-slim/x4/model.json"),
                modelWeights:
                    await require("../assets/models/esrgan-slim/x4/group1-shard1of1.bin"),
            },
            "esrgan-slim-x8": {
                modelJson: require("../assets/models/esrgan-slim/x8/model.json"),
                modelWeights:
                    await require("../assets/models/esrgan-slim/x8/group1-shard1of1.bin"),
            },
            //esrgan-medium
            "esrgan-medium-x2": {
                modelJson: require("../assets/models/esrgan-medium/x2/model.json"),
                modelWeights:
                    await require("../assets/models/esrgan-medium/x2/group1-shard1of1.bin"),
            },
            "esrgan-medium-x3": {
                modelJson: require("../assets/models/esrgan-medium/x3/model.json"),
                modelWeights: [
                    require("../assets/models/esrgan-medium/x3/group1-shard1of1.bin"),
                ],
            },
            "esrgan-medium-x4": {
                modelJson: require("../assets/models/esrgan-medium/x4/model.json"),
                modelWeights:
                    await require("../assets/models/esrgan-medium/x4/group1-shard1of1.bin"),
            },
            "esrgan-medium-x8": {
                modelJson: require("../assets/models/esrgan-medium/x8/model.json"),
                modelWeights:
                    await require("../assets/models/esrgan-medium/x8/group1-shard1of1.bin"),
            },
        };

        const key = `${modelType}-${scaleFactor}`;
        const assets = modelAssets[key as keyof typeof modelAssets];

        if (!assets) {
            throw new Error(`No assets found for ${modelType} ${scaleFactor}`);
        }

        return assets;
    }
    catch (error) {
        console.log('==============Error : ', error);
    }
};

// export const getModelAssets = (
//     modelType: ModelType,
//     scaleFactor: ScaleFactor,
// ) => {
//     const key = `${modelType}-${scaleFactor}`;
//     const assets = modelAssets[key as keyof typeof modelAssets];

//     if (!assets) {
//         throw new Error(`No assets found for ${modelType} ${scaleFactor}`);
//     }

//     return assets;
// };
