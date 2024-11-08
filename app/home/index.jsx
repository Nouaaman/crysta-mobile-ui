import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants'
import MaskedContent from '../../components/maskedContent'
import ToolCard from '../../components/toolCard'

const Home = () => {
    return (
        <View className="flex-1 mt-4">
            <MaskedContent >
                <View className='flex-row items-center gap-2'>
                    <Image source={icons.sparkles} resizeMode='contain' className='size-8' />
                    <Text className='text-xl font-pregular '>Featured AI Tools</Text>
                </View>
            </MaskedContent>

            <ScrollView className='flex-1 mt-6'>
                <ToolCard title='Upscale' description="Upscale Your Images" image={images.demoUpscale} handleClick={() => { }} />
            </ScrollView>
        </View>
    )
}
export default Home