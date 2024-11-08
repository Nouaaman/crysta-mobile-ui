import { Image, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function MaskedText({ text, icon }) {

    return (
        <MaskedView
            maskElement={(
                <View className='self-start flex-row gap-2 items-center'>
                    {
                        icon && <Image source={icon} className='w-6 h-6' />
                    }
                    <Text className='text-xl font-pmedium'>{text}</Text>
                </View>
            )}
        >

            <LinearGradient
                colors={['#B23EFF', '#FFE352']}
                start={[0, 0]}
                className='self-start flex-row gap-2 items-center'
            >
                {
                    icon && <View className='w-6 h-6' />
                }
                <Text className='text-xl font-pmedium opacity-0'>{text}</Text>
            </LinearGradient>
        </MaskedView >
    )
}
