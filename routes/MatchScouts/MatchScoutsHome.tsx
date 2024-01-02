import { useEffect, useState } from "react";
import { deleteAllMatchScouts, getAllMatchScouts } from "../../utils";
import { Button, Dialog, Text } from "react-native-paper";
import { View, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export default function MatchScoutsHome({ navigation, route }: { navigation: NativeStackNavigationProp<any>, route: RouteProp<any, any> }) {
    const [matchScouts, setMatchScouts] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {getAllMatchScouts().then(setMatchScouts)}, [route.path, route.name]);

    const deleteAllMatchScoutsAction = () => {
        setShowDeleteDialog(false);
        deleteAllMatchScouts().then(() => setMatchScouts([]));
    }

    console.log(matchScouts.length)
    
    return (
        <>
            <Dialog visible={showDeleteDialog} dismissable dismissableBackButton onDismiss={() => setShowDeleteDialog(false)}>
                <Dialog.Title> Delete ALL match scouts</Dialog.Title>
                <Dialog.Content>
                    <Text>Are you sure you want to delete ALL match scouts?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
                    <Button onPress={() => deleteAllMatchScoutsAction()}>Delete</Button>
                </Dialog.Actions>
            </Dialog>

            {
                // No match scouts
                matchScouts.length < 1 ? <>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center", zIndex: -1, opacity: 0.5, flexDirection: "column"}}>
                        <Image source={require("./../../assets/no-scouts.png")} style={{objectFit: "cover", width: 256, height: 256, borderRadius: 20}}></Image>
                    </View>

                    <View style={{flex: 1, alignItems: "center", justifyContent: "center", zIndex: 1, flexDirection: "column"}}>
                        <Text>Check in with the scouting leader or</Text>
                        <Button style={{marginTop: 5}} onPress={() => navigation.navigate("NewMatchScout")} mode="contained" icon="strategy">Create a new match scout</Button>
                    </View>
                </> :

                // Match scouts
                <>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Text variant="headlineMedium" style={{marginLeft: 20}}>Match Scouts</Text>
                        <Button onPress={() => setShowDeleteDialog(true)} icon="delete" style={{ width: "auto", margin: 20}} mode="text">Clear</Button>
                    </View>

                    <View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <Button style={{marginLeft: 10, width: "auto"}} onPress={() => navigation.navigate("NewMatchScout")} mode="text" icon="strategy">New match scout</Button>

                            <Button style={{marginRight: 10, width: "auto"}} onPress={() => navigation.navigate("BatchUpload")} mode="contained" icon="upload-multiple">Batch Upload</Button>
                        </View>

                        {
                            matchScouts.map((scout, i) => (
                                <Button key={i} onPress={() => navigation.navigate("MatchScout", {scout})} mode="contained" icon="strategy" style={{margin: 10}}>{scout.teamNumber} - {scout.matchNumber}</Button>
                            ))
                        }
                    </View>
                </>
            }
        </>
    )
}