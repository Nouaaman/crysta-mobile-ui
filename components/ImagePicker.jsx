import { View, Text, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'
import { } from 'expo-image'
import { useEffect } from 'react'

const ImagePicker = ({ selectedImage, handlePress, disabled, handleCancel }) => {
    const imageSource = selectedImage ? { uri: selectedImage } : null;

    return (

        <View className='flex w-full items-center justify-center bg-purple1/10 rounded-2xl overflow-hidden'>
            <View className='w-full max-w-[640px] aspect-square '>
                <Image source={imageSource}
                    className='size-full'
                    contentFit='contain'
                />
            </View>
            {/* choose photo btn */}
            {
                !selectedImage ? (
                    <>
                        <TouchableOpacity
                            onPress={handlePress}
                            activeOpacity={0.7}
                            disabled={disabled}
                            className='absolute w-24 h-24 '
                        >
                            <View className='p-7 size-full bg-purple1/50 rounded-full '>
                                <Image source={icons.plus} contentFit='contain' className='size-full' />
                            </View>
                        </TouchableOpacity>
                        <Text className='absolute bottom-[25%] text-textBody text-xl font-pmedium text-center'>Choose image from gallery</Text>
                    </>
                )
                    : (
                        <TouchableOpacity
                            onPress={handleCancel}
                            activeOpacity={0.7}
                            className='absolute top-4 right-4 w-10 h-10 '
                        >
                            <View className='p-2 size-full bg-black/25 rounded-full '>
                                <Image source={icons.x} contentFit='contain' className='size-full shadow-lg ' />
                            </View>
                        </TouchableOpacity>
                    )
            }

        </View>
    )
}

export default ImagePicker