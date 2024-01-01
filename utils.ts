import * as FileSystem from 'expo-file-system';
import { DATA_FOLDER, MATCH_SCOUT_FOLDER, ROBOT_SCOUT_FOLDER } from './constants';
import { MatchScoutFormResult, RobotScoutFormResult } from './types';

export const scaffoldDataDirectories = async () => {
    if (!(await FileSystem.getInfoAsync(DATA_FOLDER)).exists) FileSystem.makeDirectoryAsync(DATA_FOLDER, { intermediates: true });
    if (!(await FileSystem.getInfoAsync(ROBOT_SCOUT_FOLDER)).exists) FileSystem.makeDirectoryAsync(ROBOT_SCOUT_FOLDER, { intermediates: true });
    if (!(await FileSystem.getInfoAsync(MATCH_SCOUT_FOLDER)).exists) FileSystem.makeDirectoryAsync(MATCH_SCOUT_FOLDER, { intermediates: true });
}

const parseAllJsonFiles = async (folder: string) => {
    const files = await FileSystem.readDirectoryAsync(folder);
    const scouts = [];
    for (const file of files) {
        try {
            const json = JSON.parse(await FileSystem.readAsStringAsync(`${folder}/${file}`));
            scouts.push(json);
        } catch (e) {
            console.log(e);
        }
    }
    return scouts;
}

export const getAllRobotScouts = async () => await parseAllJsonFiles(ROBOT_SCOUT_FOLDER);
export const getAllMatchScouts = async () => await parseAllJsonFiles(MATCH_SCOUT_FOLDER);

const deleteAllFiles = async (folder: string) => {
    const files = await FileSystem.readDirectoryAsync(folder);
    for (const file of files) {
        try {
            await FileSystem.deleteAsync(`${folder}/${file}`);
        } catch (e) {
            console.log(e);
        }
    }
}

export const getRobotScoutName = (scout: RobotScoutFormResult) => `${scout.teamNumber}_${new Date().toISOString().replace(/\D/g, "_")})}`;
export const getMatchScoutName = (scout: MatchScoutFormResult) => `${scout.matchNumber}.${scout.teamNumber}_${new Date().toISOString().replace(/\D/g, "_")}`;

export const saveRobotScout = async <T extends RobotScoutFormResult>(scout: T) => {
    scaffoldDataDirectories();
    const filename = `${ROBOT_SCOUT_FOLDER}/${getRobotScoutName(scout)}.json`;
    await FileSystem.writeAsStringAsync(filename, JSON.stringify(scout));
}

export const saveMatchScout = async <T extends MatchScoutFormResult>(scout: T) => {
    scaffoldDataDirectories()
    const filename = `${MATCH_SCOUT_FOLDER}/${getMatchScoutName(scout)}.json`;
    await FileSystem.writeAsStringAsync(filename, JSON.stringify(scout));
}

export const deleteAllRobotScouts = async () => await deleteAllFiles(ROBOT_SCOUT_FOLDER);
export const deleteAllMatchScouts = async () => await deleteAllFiles(MATCH_SCOUT_FOLDER);