import { View, Text, Image } from 'react-native'
import React from 'react'
import ToolsHeader from '../../components/toolsHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { router } from 'expo-router'
import ImageViewer from '../../components/imageViewer'

const Upscale = () => {
    return (
        <SafeAreaView className="flex-1 bg-primary">
            {/* bg radial gradient and patterns */}
            <Image source={images.topRightRadialGradient} resizeMode='cover' className='absolute top-0 left-0 w-full h-full' />
            {/* header */}
            <View className='p-4'>
                <ToolsHeader title='Upscale' description='Transform your low-resolution images into high-quality visuals.' goBack={() => router.back()} />
            </View>
            {/* upscale image */}
            <ImageViewer />


        </SafeAreaView>
    )
}

export default Upscale