import { View, Text, Image } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import ToolsHeader from '../../components/toolsHeader'
import ActionButton from '../../components/buttons/actionButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as expoImgPicker from 'expo-image-picker'
import { icons, images } from '../../constants'
import { router } from 'expo-router'
import ImagePicker from '../../components/ImagePicker'
import OptionsButton from '../../components/buttons/optionsButton'
import { useState } from 'react'
import BottomSheet from '../../components/bottomSheet'


const Upscale = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [sheetIsOpen, setSheetIsOpen] = useState(false)

    const toggleSheet = () => {
        setSheetIsOpen(!sheetIsOpen);
    };

    const pickImageAsync = async () => {
        let result = await expoImgPicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
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
            {/* bg radial gradient and patterns */}
            <Image source={images.topRightRadialGradient} resizeMode='cover' className='absolute top-0 left-0 w-full h-full' />
            {/* header */}
            <View className='p-4'>
                <ToolsHeader title='Upscale' subtitle='Transform your low-resolution images into high-quality visuals.' goBack={() => router.back()} />
            </View>
            {/* content */}
            <Animated.View entering={FadeInDown.delay(200)} className='flex-1 justify-between'>
                {/* upscale image */}
                <View className='flex-1 items-start justify-center'>
                    <View className=' w-full h-auto  mt-4 px-4 '>
                        <View className='flex w-full items-center justify-center'>
                            <ImagePicker handlePress={pickImageAsync} selectedImage={selectedImage} handleCancel={handleCancel} />
                        </View>
                    </View>
                </View>
                {/* options */}
                <View className='flex-col w-full mt-8 p-4 pb-5 border-t-2 border-purple-400/10'>
                    <Text className='px-2 mb-4 text-xl text-textBody font-psemibold'>Preset: x4 • Fast</Text>
                    <View className='flex-row items-center gap-4 justify-stretch w-full '>
                        <OptionsButton title={'Options'} handlePress={toggleSheet} />
                        <ActionButton title='Upscale' />
                    </View>
                </View>
            </Animated.View>
            {/* bottom sheet  options*/}
            {
                sheetIsOpen && (
                    <BottomSheet toggleSheet={toggleSheet}>
                        <Text className='text-4xlxl text-textBody font-psemibold'>Bottom Sheet</Text>
                    </BottomSheet>
                )
            }

        </SafeAreaView>
    )
}

export default Upscale