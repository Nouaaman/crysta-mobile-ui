import { View, Image } from 'react-native'
import { images, icons } from '../constants'

const Header = () => {
    return (
        <View className="w-full flex-row justify-between items-center p-4">
            <Image source={images.logo} resizeMode='contain' className='w-32 h-10' />
            <Image source={icons.menu} resizeMode='contain' className='size-10' />
        </View>
    )
}

export default Header