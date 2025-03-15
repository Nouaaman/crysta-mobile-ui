import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'
import { } from 'expo-image'
import { useEffect } from 'react'

const ImagePicker = ({ selectedImage, handlePress, disabled, handleCancel }) => {
    const imageSource = selectedImage ? { uri: selectedImage } : null;

    return (

        <View className='flex w-full items-center justify-center bg-purple1/10 rounded-2xl overflow-hidden'>
            <View className='w-full max-w-[640px] h-full '>
                <Image source={imageSource}
                    className='flex-1'
                    // contentFit='contain'
                    resizeMode='contain'
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
                            className='absolute w-26 h-26'
                        >
                            <View className='p-8 size-full bg-purple1/50 rounded-full '>
                                <Image source={icons.plus} contentFit='contain' className='size-full' />
                            </View>
                        </TouchableOpacity>
                        <Text className='absolute bottom-[30%] text-textBody text-xl font-pmedium text-center'>Choose image from gallery</Text>
                    </>
                )
                    : (
                        <TouchableOpacity
                            onPress={handleCancel}
                            activeOpacity={0.7}
                            className='absolute top-4 right-4 w-14 h-14 '
                        >
                            <View className='p-2 size-full bg-black/30 rounded-full '>
                                <Image source={icons.x} contentFit='contain' className='size-full shadow-lg ' />
                            </View>
                        </TouchableOpacity>
                    )
            }

        </View>
    )
}
ImagePicker.propTypes = {
    selectedImage: PropTypes.string,
    handlePress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    handleCancel: PropTypes.func.isRequired,
};

export default ImagePicker;
