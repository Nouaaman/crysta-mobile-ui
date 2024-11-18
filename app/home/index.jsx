import { View, Text, Image, ScrollView } from 'react-native'
import { images, icons } from '../../constants'
import MaskedContent from '../../components/maskedContent'
import ToolCard from '../../components/toolCard'
import { router } from 'expo-router'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'

const Home = () => {
    return (
        <View className="flex-1">
            <Animated.View entering={FadeInDown.delay(400).springify()} className='flex-row items-center gap-2 px-4'>
                <MaskedContent >
                    <Image source={icons.sparkles} resizeMode='contain' className='size-5' />
                </MaskedContent>
                <MaskedContent >
                    <Text className='text-xl font-pextralight'>Featured AI Tools</Text>
                </MaskedContent>
            </Animated.View>

            <ScrollView className='flex-1 mt-2' showsVerticalScrollIndicator={true} contentContainerStyle={{
                gap: 24,
                padding: 12,

            }}>
                <Animated.View entering={FadeInDown.delay(400).springify()}>
                    <ToolCard title='Upscale' description="Upscale Your Images." image={images.demoUpscale} handleClick={() => router.push('upscale')} />
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(600).springify()}>
                    <ToolCard title='Denoise' description="Denoise for Crisp Quality." image={images.demoDenoise} handleClick={() => router.push('denoise')} />
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(800).springify()}>
                    <ToolCard title='Deblur' description="Deblur for Clarity." image={images.demoDeblur} handleClick={() => router.push('deblur')} />
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(1000).springify()}>
                    <ToolCard title='Enhance' description="Enhance Brightness and Exposure." image={images.demoEnhance} handleClick={() => router.push('enhance')} />
                </Animated.View>

            </ScrollView>
        </View>
    )
}
export default Home