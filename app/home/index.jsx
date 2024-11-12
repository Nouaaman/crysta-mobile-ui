import { View, Text, Image, ScrollView } from 'react-native'
import { images, icons } from '../../constants'
import MaskedContent from '../../components/maskedContent'
import ToolCard from '../../components/toolCard'
import { router } from 'expo-router'

const Home = () => {
    return (
        <View className="flex-1">
            <View className='flex-row items-center gap-2 px-4'>
                <MaskedContent >
                    <Image source={icons.sparkles} resizeMode='contain' className='size-5' />
                </MaskedContent>
                <MaskedContent >
                    <Text className='text-xl font-pextralight'>Featured AI Tools</Text>
                </MaskedContent>
            </View>

            <ScrollView className='flex-1 mt-2' showsVerticalScrollIndicator={true} contentContainerStyle={{
                gap: 24,
                padding: 12,

            }}>

                <ToolCard title='Upscale' description="Upscale Your Images." image={images.demoUpscale} handleClick={() => router.push('upscale')} />
                <ToolCard title='Denoise' description="Denoise for Crisp Quality." image={images.demoDenoise} handleClick={() => router.push('denoise')} />
                <ToolCard title='Deblur' description="Deblur for Clarity." image={images.demoDeblur} handleClick={() => router.push('deblur')} />
                <ToolCard title='Enhance' description="Enhance Brightness and Exposure." image={images.demoEnhance} handleClick={() => router.push('enhance')} />

            </ScrollView>
        </View>
    )
}
export default Home