import * as React from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { getData } from "../src/models/dataHelper";
import { IJankableResult, IData } from "../src/models/interfaces";
import { Chart } from 'react-charts';

const UkolCtyri: React.FunctionComponent<{}> = () => {


    const [xMin, setXMin] = React.useState<number>(-4);
    const [xMax, setXMax] = React.useState<number>(8);
    const [steps, setSteps] = React.useState<number>(10);
    const [resultsG, setResultsG] = React.useState<IJankableResult[]>([]);
    const [resultsF, setResultsF] = React.useState<IJankableResult[]>([]);
    const [data, setData] = React.useState<IData[]>([{data: [], label: ""}, {data: [], label: ""}]);
    const [funcName, setFuncName] = React.useState<"funcF" | "funcG">('funcF');


    const resolveClick = async (): Promise<void> => {
        const increment = (xMax - xMin) / steps;

        const datasG: IJankableResult[] = [];
        const datasF: IJankableResult[] = [];

        const valuesG: { x: Number, y: Number }[] = [];
        const valuesF: { x: Number, y: Number }[] = [];

        for (let i = xMin; i < xMax; i += increment) {
            const dataG = await getData({ xVal: i, funcName: "funcG" });
            dataG.xVal = i;
            
            valuesG.push({ x: dataG.xVal, y: dataG.yVal });

            const dataF = await getData({ xVal: i, funcName: "funcF" });
            dataF.xVal = i;
            valuesF.push({ x: dataF.xVal, y: dataF.yVal });

        }
        const points: IData[] = [{ label: "Points G", data: valuesG }, { label: "Points F", data: valuesF }];

        setData(points);
        //console.log(points);

        setResultsG(datasG);
        //console.log(datas);
    };


    const axes = [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ];

    return <>
        <TextField
            type="number"
            label="X min value"
            value={xMin}
            onChange={event => setXMin(Number(event.target.value))} />
        <TextField
            type="number"
            label="X max value"
            value={xMax}
            onChange={event => setXMax(Number(event.target.value))} />
        <TextField
            type="number"
            label="Steps"
            value={steps}
            onChange={event => setSteps(Number(event.target.value))} />
        
        <Button variant="contained" onClick={resolveClick}>
            Get data
        </Button>
        <div
            style={{
                width: '400px',
                height: '300px'
            }}
        >
            <Chart data={data} axes={axes} />
        </div>
    </>;
};

export default UkolCtyri;
