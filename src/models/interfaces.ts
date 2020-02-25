export interface IJankableResult {
    status: String;
    yVal: Number;
    xVal?: Number;
}

export interface IJankableGet {
    xVal: Number;
    funcName: "funcF" | "funcG";
}

export interface IData {
    label: String;
    data: { x: Number, y: Number }[];
}
