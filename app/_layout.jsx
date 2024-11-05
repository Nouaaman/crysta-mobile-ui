import { SplashScreen, Stack } from "expo-router";

import "../global.css";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" />
        </Stack>
    );
}