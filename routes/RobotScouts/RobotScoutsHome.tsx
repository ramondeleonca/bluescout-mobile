import { useEffect, useState } from "react";
import { deleteAllRobotScouts, getAllRobotScouts } from "../../utils";
import { Button, Dialog, Text } from "react-native-paper";
import { View, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export default function RobotScoutsHome({ navigation, route }: { navigation: NativeStackNavigationProp<any>, route: RouteProp<any, any> }) {
    const [robotScouts, setRobotScouts] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        getAllRobotScouts().then(setRobotScouts);
    }, [route.path]);

    const deleteAllRobotScoutsAction = () => {
        setShowDeleteDialog(false);
        deleteAllRobotScouts().then(() => setRobotScouts([]));
    }

    console.log(robotScouts.length)
    
    return (
        <>
            <Dialog visible={showDeleteDialog} dismissable dismissableBackButton onDismiss={() => setShowDeleteDialog(false)}>
                <Dialog.Title> Delete ALL robot scouts</Dialog.Title>
                <Dialog.Content>
                    <Text>Are you sure you want to delete ALL robot scouts?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
                    <Button onPress={() => deleteAllRobotScoutsAction()}>Delete</Button>
                </Dialog.Actions>
            </Dialog>

            {
                // No robot scouts
                robotScouts.length < 1 ? <>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center", zIndex: -1, opacity: 0.5, flexDirection: "column"}}>
                        <Image source={require("./../../assets/no-scouts.png")} style={{objectFit: "cover", width: 256, height: 256, borderRadius: 20}}></Image>
                    </View>

                    <View style={{flex: 1, alignItems: "center", justifyContent: "center", zIndex: 1, flexDirection: "column"}}>
                        <Text>Check in with the scouting leader or</Text>
                        <Button style={{marginTop: 5}} onPress={() => navigation.navigate("NewRobotScout")} mode="contained" icon="robot">Create a new robot scout</Button>
                    </View>
                </> :

                // Robot scouts
                <>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Text variant="headlineMedium" style={{marginLeft: 20}}>Robot Scouts</Text>
                        <Button onPress={() => setShowDeleteDialog(true)} icon="delete" style={{ width: "auto", margin: 20}} mode="text">Clear</Button>
                    </View>

                    <View>
                        {
                            robotScouts.map((scout, i) => (
                                <Button key={i} onPress={() => navigation.navigate("RobotScout", {scout})} mode="contained" icon="robot" style={{margin: 10}}>{scout.teamNumber} - {scout.teamName}</Button>
                            ))
                        }
                    </View>
                </>
            }
        </>
    )
}