import { View, Text, Image, Pressable } from 'react-native'
import { icons } from '../constants'
import { BlurView } from 'expo-blur'



const ToolCard = ({ title, description, image, handleClick }) => {
    return (
        <Pressable onPress={handleClick} className='w-full rounded-3xl shadow-md bg-slate-400 overflow-hidden'
            style={{ aspectRatio: 1 / 0.9 }}
        >
            <View className=' flex-1'>
                <Image source={image} resizeMode='cover' className='absolute w-full h-full' />
                <Image source={icons.sparkles} resizeMode='cover' className='absolute top-4 right-4 size-8 shadow-md' />
                <View className='absolute bottom-0 left-0 w-full px-6 py-8 pb-6'>
                    <Text className='absolute left-6 top-0 -translate-y-2/4 
                     rounded-full font-psemibold bg-_purple-900 color-white self-start py-2 px-5'
                    >
                        {title}
                    </Text>
                    <Text className='font-pregular text-lg text-white'>{description}</Text>
                </View>
            </View>

        </Pressable>

    )
}

export default ToolCard