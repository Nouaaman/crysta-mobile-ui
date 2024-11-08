import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '@constants'
import MaskedView from '@components/MaskedView'


const Home = () => {
    return (
        <View className="flex-1">
            <Text>Featured AI Tools</Text>
            <MaskedView />
        </View>
    )
}
export default Home