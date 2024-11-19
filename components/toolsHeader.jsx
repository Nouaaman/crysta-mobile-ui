import { Text, TouchableOpacity, Image } from 'react-native'
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated'
import { icons } from '../constants'


const ToolsHeader = ({ title, subtitle, goBack }) => {
    return (
        <>
            <Animated.View entering={FadeInRight.delay(200)} className="w-full flex-row justify-center items-center">
                <TouchableOpacity onPress={goBack} className="absolute left-0">
                    <Image source={icons.arrowLeft} resizeMode='contain' className='size-10' />
                </TouchableOpacity>
                <Text className="text-2xl font-pbold text-textBody">{title}</Text>
            </Animated.View>
            <Animated.Text entering={FadeInRight.delay(200)} className='text-gray-300 font-plight text-center mt-6'>
                {subtitle}
            </Animated.Text>
        </>
    )
}

export default ToolsHeader