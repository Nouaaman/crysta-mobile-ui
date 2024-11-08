import { View, Text, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'
import { BlurView } from 'expo-blur'


const ToolCard = ({ title, description, image, handleClick }) => {
    return (
        <TouchableHighlight onPress={handleClick} className='w-full rounded-3xl shadow-md bg-slate-400 overflow-hidden'
            style={{ aspectRatio: 1 / (1 / 1.2) }}
        >
            <View className=' flex-1'>
                <Image source={image} resizeMode='cover' className='absolute w-full h-full' />
                <Image source={icons.sparkles} resizeMode='cover' className='absolute top-4 right-4 size-8 shadow-md' />
                <BlurView intensity={40} experimentalBlurMethod='dimezisBlurView' tint='dark' className='absolute bottom-0 left-0 w-full'>
                    <Text className='text-xl font-pmedium'>{title}</Text>
                    <Text className='text-base font-pregular'>{description}</Text>
                </BlurView>
            </View>

        </TouchableHighlight>

    )
}

export default ToolCard