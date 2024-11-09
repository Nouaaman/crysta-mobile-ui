import { View, Text, Image, ScrollView } from 'react-native'
import { images, icons } from '../../constants'
import MaskedContent from '../../components/maskedContent'
import ToolCard from '../../components/toolCard'

const Home = () => {
    return (
        <View className="flex-1 mt-2">
            <View className='flex-row items-center  gap-2'>
                <MaskedContent >
                    <Image source={icons.sparkles} resizeMode='contain' className='size-5' />
                </MaskedContent>
                <MaskedContent >
                    <Text className='text-xl font-plight'>Featured AI Tools</Text>
                </MaskedContent>
            </View>

            <ScrollView className='flex-1 mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{
                gap: 24,
                paddingBottom: 48,
            }}>

                <ToolCard title='Upscale' description="Upscale Your Images." image={images.demoUpscale} handleClick={() => { }} />
                <ToolCard title='Denoise' description="Denoise for Crisp Quality." image={images.demoDenoise} handleClick={() => { }} />
                <ToolCard title='Deblur' description="Deblur for Clarity." image={images.demoDeblur} handleClick={() => { }} />
                <ToolCard title='Enhance' description="Enhance Brightness and Exposure." image={images.demoEnhance} handleClick={() => { }} />

            </ScrollView>
        </View>
    )
}
export default Home