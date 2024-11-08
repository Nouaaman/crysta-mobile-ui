import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@constants'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@components/ui/CustomButton'
import { router } from 'expo-router'

const Welcome = () => {
    return (
        <SafeAreaView className="flex-1 bg-primary">
            {/* bg radial gradient */}
            <Image source={images.centerRadialGradient} resizeMode='cover' className='absolute top-0 left-0 w-full h-full' />
            {/* patterns */}
            <Image source={images.pattern1} resizeMode='contain' className='absolute top-0 left-0 w-full h-full' />
            {/* content */}
            <ScrollView contentContainerStyle={{ width: '100%', height: '100%', paddingBottom: '20px' }}>
                <View className="w-full flex justify-start items-center h-full p-4">

                    {/* logo */}
                    <Image source={images.logo} resizeMode='contain' className='w-[180px] h-[45px] my-6' />
                    {/* cards */}
                    <Image source={images.cards} resizeMode='contain' className='w-full h-1/2' />
                    <Text className="text-3xl text-white font-bold text-center mt-2">
                        Elevate Your Images{"\n"}
                        with{" "}
                        <Text className="color-secondary">Crysta</Text>
                    </Text>
                    <Text className=" font-pregular text-gray-100 mt-6 text-center">
                        Upscale, Enhance, Denoise, and Deblur your{"\n"}Photos — all with Crysta’s powerful tools.
                    </Text>
                    <CustomButton title="Get Started" handlePress={() => router.replace('/home')} containerStyles="w-full mt-9" />
                </View>
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    )
}

export default Welcome