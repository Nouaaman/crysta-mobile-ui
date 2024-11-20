import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Radio = ({ options, checkedValue, onChange }) => {
    return (
        <View className='flex gap-2'>
            {
                options.map(option => (
                    <TouchableOpacity
                        key={option.value}
                        onPress={() => onChange(option.value)}
                        className={`flex p-4 rounded-xl ${checkedValue === option.value ? 'bg-purple2' : 'bg-purple1/15'}`}
                    >

                        <Text className='font-psemibold text-lg text-textBody'>{option.label}</Text>
                        <Text className=' text-textBody' >{option.description}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Radio