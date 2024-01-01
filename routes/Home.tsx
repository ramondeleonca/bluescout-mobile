import ThemeView from "../components/ThemeView";
import { MaterialBottomTabNavigationProp, Text } from "react-native-paper";

export default function Home({ navigation }: { navigation: MaterialBottomTabNavigationProp<any> }) {
    return (
        <ThemeView style={{ paddingLeft: 10 }}>
            <Text variant="headlineLarge">Welcome Back, Ramón</Text>
        </ThemeView>
    )
}