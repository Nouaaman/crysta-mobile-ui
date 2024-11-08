import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '@constants'
import MaskedView from '@components/ui/maskedText'


const Home = () => {
    return (
        <View className="flex-1">
            <MaskedView text='Featured AI Tools' icon={icons.sparkles} />
        </View>
    )
}
export default Home