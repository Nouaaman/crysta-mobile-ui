import { Text, TouchableOpacity, Image, View } from "react-native";
import { icons } from '../../constants'


const OptionsButton = ({
    title,
    handlePress,
    disabled,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={disabled}
            className="flex-2"
        >
            <View className="flex-row gap-2  rounded-xl items-center justify-center p-4 bg-purple3 border border-purple1">
                <Image source={icons.gear} resizeMode='contain' className='size-6' />
                <Text className={`font-pregular text-xl text-white`}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default OptionsButton;
