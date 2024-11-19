import { Text, TouchableOpacity, Image, View } from "react-native";
import { icons } from '../../constants'
import { LinearGradient } from "expo-linear-gradient";

const ActionButton = ({
    title,
    handlePress,
    disabled,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={disabled}
            className="flex-1"
        >
            <View className="rounded-xl overflow-hidden">
                <LinearGradient
                    colors={['#910BEA', '#B23EFF']}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    className={`w-full ${disabled ? "opacity-50" : ""}`}
                >
                    <View className="flex-row gap-2 items-center justify-center p-4">
                        <Image source={icons.sparkles} resizeMode='contain' className='size-6' />
                        <Text className={`font-psemibold text-xl text-white`}>
                            {title}
                        </Text>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
};

export default ActionButton;
