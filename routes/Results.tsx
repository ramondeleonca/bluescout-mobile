import { DrawerNavigationProp } from "@react-navigation/drawer";
import ThemeView from "../components/ThemeView";
import { MaterialBottomTabNavigationProp, Text } from "react-native-paper";

export default function Results({ navigation }: { navigation: MaterialBottomTabNavigationProp<any> }) {
    return (
        <ThemeView>
            <Text>Results</Text>
        </ThemeView>
    )
}