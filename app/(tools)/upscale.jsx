import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ToolsHeader from '../../components/toolsHeader';
import ActionButton from '../../components/buttons/actionButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as expoImgPicker from 'expo-image-picker';
import { icons, images } from '../../constants';
import { router } from 'expo-router';
import ImagePicker from '../../components/ImagePicker';
import OptionsButton from '../../components/buttons/optionsButton';
import { useEffect, useState } from 'react';
import BottomSheet from '../../components/bottomSheet';
import Radio from '../../components/radio';
import useUpscale from '../../hooks/useUpscale';


const MODES = [
    { label: 'Fast Mode', description: 'Fast and efficient. Ideal for low-end devices or when speed is the priority.', value: 'slim' },
    { label: 'Detailed Mode', description: 'Best sharpness and clarity. May take longer and can slow down the device.', value: 'medium' },
];

const UPSCALE_FACTOR = [
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
    { label: '4x', value: 4 },
    { label: '8x', value: 8 },
];

const Upscale = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedUpscaleFactor, setSelectedUpscaleFactor] = useState(UPSCALE_FACTOR[0].value);
    const [selectedModel, setSelectedModel] = useState(MODES[0].value);
    const [sheetIsOpen, setSheetIsOpen] = useState(false);
    const [editedImage, setEditedImage] = useState(null);

    const { cancelUpscale, upscaleImage, upscaledImage, error, isUpscaling } = useUpscale();

    const handleUpscalePress = async () => {
        //TODO: Implement the upscaleImage function
        // if (!selectedImage) return;
        if (!selectedImage) console.log('No image selected');

        await upscaleImage(selectedImage, selectedModel, selectedUpscaleFactor)

        if (upscaledImage) {
            setEditedImage(upscaledImage);
            console.log('Upscaled image: ', upscaledImage);
        }
        if (error) {
            console.error('Error: ', error);
        }

    };

    const toggleSheet = () => {
        setSheetIsOpen(!sheetIsOpen);
    };

    const pickImageAsync = async () => {
        let result = await expoImgPicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleCancel = () => {
        setSelectedImage(null);
    };



    return (
        <SafeAreaView className="flex-1 bg-primary">
            <Image source={images.topRightRadialGradient} resizeMode="cover" className="absolute top-0 left-0 w-full h-full" />
            <View className="p-4">
                <ToolsHeader title="Upscale" subtitle="Transform your low-resolution images into high-quality visuals." goBack={() => router.back()} />
            </View>
            <Animated.View entering={FadeInDown.delay(200)} className="flex-1 justify-between">
                <View className="flex-1 items-start justify-center">
                    <View className="w-full h-auto mt-4 px-4">
                        <View className="flex w-full items-center justify-center">
                            <ImagePicker handlePress={pickImageAsync} selectedImage={editedImage ? editedImage : selectedImage} handleCancel={handleCancel} />
                        </View>
                    </View>
                </View>
                <View className="flex-col w-full mt-8 p-4 pb-5 border-t-2 border-purple-400/10">
                    <Text className="px-2 mb-4 text-xl text-textBody font-psemibold">
                        Preset: {UPSCALE_FACTOR.find((option) => option.value === selectedUpscaleFactor)?.label} •{' '}
                        {MODES.find((option) => option.value === selectedModel)?.label}
                    </Text>
                    {/* action buttons */}
                    <View className="flex-row items-center gap-4 justify-stretch w-full">
                        <OptionsButton title="Options" handlePress={toggleSheet} />
                        <ActionButton title={isUpscaling ? 'Cancel' : 'Upscale'} handlePress={isUpscaling ? cancelUpscale : handleUpscalePress} />
                    </View>
                    {/* {isUpscaling && <Text className="text-center mt-2">Progress: {Math.round(progress * 100)}%</Text>}
                    {error && <Text className="text-center mt-2 text-red-500">{error}</Text>} */}
                </View>
            </Animated.View>

            {/* bottom sheet */}
            {sheetIsOpen && (
                <BottomSheet toggleSheet={toggleSheet}>
                    <View className="flex-row items-center justify-between mb-6">
                        <Text className="text-3xl text-textBody font-psemibold">Options</Text>
                        <TouchableOpacity onPress={toggleSheet} className="pl-2">
                            <Image source={icons.arrowDown} resizeMode="contain" className="size-10" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View className="mb-8">
                            <Text className="text-xl text-textBody font-pbold">Upscaling Factor</Text>
                            <Text className="text-textBody">Choose how much you want to enlarge the image</Text>
                            <Radio
                                options={UPSCALE_FACTOR}
                                checkedValue={selectedUpscaleFactor}
                                onChange={(value) => setSelectedUpscaleFactor(value)}
                                containerStyle="flex-row gap-3 mt-4 items-center justify-center"
                            />
                        </View>
                        <View className="mb-9">
                            <Text className="text-xl text-textBody font-pbold mb-2">Processing Mode</Text>
                            <Radio
                                options={MODES}
                                checkedValue={selectedModel}
                                onChange={(value) => setSelectedModel(value)}
                                containerStyle="flex gap-3"
                            />
                        </View>
                    </View>
                </BottomSheet>
            )}

        </SafeAreaView>
    );
};

export default Upscale;
