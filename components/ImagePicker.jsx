import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'
import { } from 'expo-image'


const ImagePicker = ({ selectedImage, handlePress, disabled, handleCancel }) => {

   return (

      <View className='flex w-full items-center justify-center bg-purple1/10 rounded-2xl overflow-hidden'>
         <View className='w-full max-w-[640px] h-full '>
            {
               selectedImage && (
                  <Image source={selectedImage ? { uri: selectedImage.uri } : null}
                     className='flex-1'
                     resizeMode='cover'
                  />
               )
            }

         </View>
         {/* choose photo btn */}
         {
            !selectedImage ? (
               <>
                  <TouchableOpacity
                     onPress={handlePress}
                     activeOpacity={0.7}
                     disabled={disabled}
                     className='absolute w-26 h-26 shadow-lg rounded-full'
                  >
                     <View className='p-8 size-full bg-purple1/50 rounded-full '>
                        <Image source={icons.plus} contentFit='contain' className='size-10' />
                     </View>
                  </TouchableOpacity>
                  <Text className='absolute bottom-[34%] text-textBody text-xl font-pmedium text-center'>Choose image from gallery</Text>
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
   selectedImage: PropTypes.object,
   handlePress: PropTypes.func.isRequired,
   disabled: PropTypes.bool,
   handleCancel: PropTypes.func.isRequired,
};

export default ImagePicker;
