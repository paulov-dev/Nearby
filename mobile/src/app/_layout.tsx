import { Stack } from "expo-router"
import { colors } from "@/styles/theme"
import { Loading } from "@/components/loading"

import {
    useFonts,
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
} from "@expo-google-fonts/rubik"

export default function Layout()  {
    const [fontLoaded] = useFonts({
        Rubik_600SemiBold,
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_700Bold
    })

    if(!fontLoaded) {
        return <Loading />
    }

    return <Stack 
    screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: colors.gray[100] }
    }} />
}