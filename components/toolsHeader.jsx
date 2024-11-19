import { Text, TouchableOpacity, Image } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { icons } from '../constants'


const ToolsHeader = ({ title, description, goBack }) => {
    return (
        <>
            <Animated.View entering={FadeInRight.delay(250).springify()} className="w-full flex-row justify-center items-center">
                <TouchableOpacity onPress={goBack} className="absolute left-0">
                    <Image source={icons.arrowLeft} resizeMode='contain' className='size-10' />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white">{title}</Text>
            </Animated.View>
            <Animated.Text className='text-gray-300 font-plight text-center mt-6 text-sm'>
                {description}
            </Animated.Text>
        </>
    )
}

export default ToolsHeader