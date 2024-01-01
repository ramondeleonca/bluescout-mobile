import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";

export default function StackNavigatorHeader(props: NativeStackHeaderProps) {
    const title = getHeaderTitle(props.options, props.route.name);

    return (
        <Appbar.Header statusBarHeight={0} mode="center-aligned">
            {
                props.back && <Appbar.BackAction onPress={() => props.navigation.goBack()} />
            }
            <Appbar.Content title={title}></Appbar.Content>
        </Appbar.Header>
    )
}