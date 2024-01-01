import { FieldValues } from "react-hook-form";
import { FormBuilderProps } from "react-native-paper-form-builder/dist/Types/Types";
import match from "./forms/2023/match";
import robot from "./forms/2023/robot";

export type Prettify<T> = {[K in keyof T]: T[K]} & {};
export type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;

export interface IForm {
    questions: FormBuilderProps["formConfigArray"];
    onSubmit: (fieldValues: FieldValues) => any;
}

export type FormConfigArrayToFields<T extends FormBuilderProps["formConfigArray"]> = {[fieldName in Exclude<Flatten<T>["name"], "">]: any};

export type MatchScoutFormResult = Prettify<FormConfigArrayToFields<typeof match.questions>>;
export type RobotScoutFormResult = Prettify<FormConfigArrayToFields<typeof robot.questions>>;