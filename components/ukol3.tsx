import * as React from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { getData } from "../src/models/dataHelper";
import { IJankableResult, IData } from "../src/models/interfaces";
import { Chart } from 'react-charts';

const UkolTri: React.FunctionComponent<{}> = () => {


    const [xMin, setXMin] = React.useState<number>(0);
    const [xMax, setXMax] = React.useState<number>(10);
    const [steps, setSteps] = React.useState<number>(10);
    const [results, setResults] = React.useState<IJankableResult[]>([]);
    const [data, setData] = React.useState<IData[]>([]);
    const [funcName, setFuncName] = React.useState<"funcF" | "funcG">('funcF');


    const resolveClick = async (): Promise<void> => {
        const increment = (xMax - xMin) / steps;

        const datas: IJankableResult[] = [];

        const values: { x: Number, y: Number }[] = [];

        for (let i = xMin; i < xMax; i += increment) {
            const data = await getData({ xVal: i, funcName });
            data.xVal = i;
            datas.push(data);
            values.push({ x: data.xVal, y: data.yVal });
        }
        const points: IData[] = [{ label: "Points", data: values }];

        setData(points);
        //console.log(points);

        setResults(datas);
        //console.log(datas);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFuncName(event.target.value as ("funcF" | "funcG"));
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
        <FormControl>
            <InputLabel id="demo-simple-select-label">Funkce</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={funcName}
                onChange={handleChange}
            >
                <MenuItem value={"funcF"}>Funkce F</MenuItem>
                <MenuItem value={"funcG"}>Funkce G</MenuItem>
            </Select>
        </FormControl>
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

export default UkolTri;
