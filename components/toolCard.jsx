import { View, Text, Image, Pressable, TouchableHighlight } from 'react-native'
import { icons } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'





const ToolCard = ({ title, description, image, handleClick }) => {
    return (
        <TouchableHighlight underlayColor={"#aaa"} onPress={handleClick} className='w-full rounded-3xl shadow-md overflow-hidden'
            style={{ aspectRatio: 1 / 0.9 }}
        >
            <View className='flex-1 relative'>
                <Image source={image} resizeMode='cover' className='absolute w-full h-full' />
                <Image source={icons.sparkles} resizeMode='cover' className='absolute top-4 right-4 size-8 shadow-lg' />
                <View className='absolute bottom-0 inset-x-0'>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0)']}
                        start={[0.5, 1]}
                        end={[0.5, 0]}
                    >
                        <View className='px-6 pb-6 pt-8'>
                            <Text className='text-2xl mb-2 font-pbold color-white'>{title}</Text>
                            <Text className='font-pregular text-white'>{description}</Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>

        </TouchableHighlight>

    )
}

export default ToolCard