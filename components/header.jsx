import { View, Image, TouchableOpacity } from 'react-native'
import { images, icons } from '../constants'
import Animated, { FadeInUp } from 'react-native-reanimated'

const Header = () => {
    return (
        <Animated.View entering={FadeInUp.delay(350).springify()} className="w-full flex-row justify-between items-center p-4">
            <Image source={images.logo} resizeMode='contain' className='w-32 h-10' />
            <TouchableOpacity>
                <Image source={icons.menu} resizeMode='contain' className='size-10' />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default Header