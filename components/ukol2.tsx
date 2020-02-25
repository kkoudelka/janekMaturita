import * as React from "react";
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { IJankableResult } from "../src/models/interfaces";
import { getData } from "../src/models/dataHelper";

const UkolDva: React.FunctionComponent<{}> = () => {
    const [test, setTest] = React.useState<IJankableResult>(null);
    const [xValUser, setXValUser] = React.useState<number>(0);
    const [funcName, setFuncName] = React.useState<"funcF" | "funcG">('funcF');


    const { status, yVal } = test || { status: "Hhhhhh", yVal: 0 };


    const load = async () => {

        const data = await getData({ funcName, xVal: xValUser });
        setTest(data);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFuncName(event.target.value as ("funcF" | "funcG"));
    };

    return <>
        <TextField
            type="number"
            label="X value"
            value={xValUser}
            onChange={event => setXValUser(Number(event.target.value))} />
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
        <Button
            variant="contained"
            onClick={load}>
            Dej mi data Janku
         </Button>
        <Typography variant="body2">
            Y: {yVal}
        </Typography>
    </>;
};

export default UkolDva;
