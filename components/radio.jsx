import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Radio = ({ options, checkedValue, onChange, containerStyle }) => {
    return (
        <View className={containerStyle}>
            {
                options.map(option => (
                    <TouchableOpacity
                        key={option.value}
                        onPress={() => onChange(option.value)}
                        className={`flex p-4 rounded-2xl ${checkedValue === option.value ? 'bg-purple2' : 'bg-purple1/15'}`}
                    >

                        <Text className='font-psemibold text-lg text-white'>{option.label}</Text>
                        {
                            option.description &&
                            <Text className=' text-textBody' >{option.description}</Text>
                        }
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Radio