import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { AppRegistry, Appearance, SafeAreaView, View } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { CombinedDarkTheme, CombinedLightTheme } from './theme';
import { HeaderContextProvider, Header } from './components/Header';
import Home from './routes/Home';
import Results from './routes/Results';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import SyncStorage from 'sync-storage';
import RobotScouts from './routes/RobotScouts';
import MatchScouts from './routes/MatchScouts';
import { useEffect } from 'react';
import { saveMatchScout, scaffoldDataDirectories } from './utils';
import { MatchScoutFormResult } from './types';

SyncStorage.init();

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  const BottomTabs = createMaterialBottomTabNavigator();

  const onLoad = async () => {
    await scaffoldDataDirectories();
  
    await saveMatchScout({
      autoDocked: 0,
      matchNumber: "0",
      stoppedSeconds: "0",
      teamNumber: "3526",
      bottomAutoCones: "0",
      bottomAutoCubes: "0",
      bottomTeleCones: "0",
      bottomTeleCubes: "0",
      middleAutoCones: "0",
      middleAutoCubes: "0",
      middleTeleCones: "0",
      middleTeleCubes: "0",
      topAutoCones: "0",
      topAutoCubes: "0",
      topTeleCones: "0",
      topTeleCubes: "0",
    });
  };
  useEffect(() => {onLoad()}, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <HeaderContextProvider>

          <StatusBar style={colorScheme === "dark" ? "light" : "dark"}></StatusBar>

          <Header></Header>
  
          <BottomTabs.Navigator id='BottomTabs'>
            <BottomTabs.Screen name='Home' component={Home} options={{ tabBarIcon: "home" }}></BottomTabs.Screen>
            <BottomTabs.Screen name='Robot Scouts' component={RobotScouts} options={{ tabBarIcon: "robot" }}></BottomTabs.Screen>
            <BottomTabs.Screen name='Match Scouts' component={MatchScouts} options={{ tabBarIcon: "strategy" }}></BottomTabs.Screen>
            <BottomTabs.Screen name='Results' component={Results} options={{ tabBarIcon: "graph" }}></BottomTabs.Screen>
          </BottomTabs.Navigator>
          
        </HeaderContextProvider>
      </NavigationContainer>
    </PaperProvider>
  )
}

AppRegistry.registerComponent("main", () => App);