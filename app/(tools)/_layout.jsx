import { Stack } from "expo-router"

const ToulsLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}


        >
            <Stack.Screen name="deblur" />
            <Stack.Screen name="enhance" />
            <Stack.Screen name="denoise" />
            <Stack.Screen name="upscale" />
        </Stack>

    )
}

export default ToulsLayout