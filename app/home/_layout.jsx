import { Slot } from "expo-router";

import { View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants'


const HomeLayout = () => {
    return (
        <View className="flex-1 bg-primary">
            {/* bg radial gradient and patterns */}
            <Image source={images.topRightRadialGradient} resizeMode='cover' className='absolute top-0 left-0 w-full h-full' />
            <Image source={images.pattern2} resizeMode='contain' className='absolute top-0 right-0 size-80 opacity-50' />
            <SafeAreaView className="flex-1 px-4 pt-4">
                {/* header */}
                <View className="w-full flex-row justify-between items-center p-4">
                    <Image source={images.logo} resizeMode='contain' className='w-32 h-10' />
                    <Image source={icons.menu} resizeMode='contain' className='size-10' />
                </View>
                {/* content */}
                <View className='flex-1 px-4'>
                    <Slot />
                </View>

            </SafeAreaView>
        </View>
    )
}

export default HomeLayout