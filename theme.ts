import { MD3DarkTheme, MD3Theme, MD3LightTheme, adaptNavigationTheme, MD2Colors } from 'react-native-paper';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import deepmerge from 'deepmerge';

const MaterialDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors
    }
} as MD3Theme;

export const MaterialLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors
    }
} as MD3Theme;

export const { DarkTheme: NavigationDarkTheme, LightTheme: NavigationLightTheme } = adaptNavigationTheme({
    reactNavigationDark: DarkTheme,
    reactNavigationLight: DefaultTheme,
});

export const CombinedDarkTheme = deepmerge(MaterialDarkTheme, NavigationDarkTheme);
export const CombinedLightTheme = deepmerge(MaterialLightTheme, NavigationLightTheme);
