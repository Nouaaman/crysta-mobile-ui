import { Image, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useEffect, useState } from 'react';

export default function MaskedContent({ children }) {


    return (
        <MaskedView
            maskElement={(
                <View className='self-start'>
                    {children}
                </View>
            )}
        >

            <LinearGradient
                colors={['#B23EFF', '#FDC500']}
                start={[0, 0.5]}
                className='self-start flex-row gap-2 items-center'
            >

                <View className='self-start opacity-0'>
                    {children}
                </View>
            </LinearGradient>
        </MaskedView >
    )
}
