import React from 'react'
import { Pressable } from 'react-native'
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated'


const BottomSheet = ({ children, toggleSheet }) => {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

    return (
        <>
            <AnimatedPressable onPress={toggleSheet}
                entering={FadeIn}
                exiting={FadeOut}
                className='bg-black/50 z-10 flex-1 absolute inset-0' />
            <Animated.View
                entering={SlideInDown}
                exiting={SlideOutDown}
                className='z-20 bg-gray-800 p-4 w-full h-auto absolute bottom-0 rounded-t-3xl shadow-[0px_-4px_10px_0px_rgba(0,_0,_0,_0.4)] '
            >
                {children}
            </Animated.View>
        </>
    )
}
export default BottomSheet