import { Stack } from "expo-router"

const ToulsLayout = () => {
    return (

        <Stack>
            <Stack.Screen name="deblur" options={{ headerShown: false }} />
            <Stack.Screen name="enhance" options={{ headerShown: false }} />
            <Stack.Screen name="denoise" options={{ headerShown: false }} />
            <Stack.Screen name="upscale" options={{ headerShown: false }} />
        </Stack>

    )
}

export default ToulsLayout