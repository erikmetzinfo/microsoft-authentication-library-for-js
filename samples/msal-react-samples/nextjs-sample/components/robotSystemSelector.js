import { useEffect, useState } from "react";
import useSwr from "swr";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const RobotSystemSelector = ({ groups, handleChangeRobotSystem }) => {
    const [firstRun, SetFirstRun] = useState(true);
    const { data, error } = useSwr(
        `/api/db/robotSystems?customerGroup=${groups[0]}`,
        fetcher
    );

    useEffect(() => {
        if (firstRun && Array.isArray(data) && data.length > 0) {
            SetFirstRun(false);
            handleChangeRobotSystem({ target: { value: data[0].name } });
        }
    }, [data]);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    if (Array.isArray(data) && data.length < 1)
        return <div>no robot systems in your account</div>;
    // console.log("data", data);
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Robot Systems</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // defaultValue={data[0].name}
                value={data[0].name}
                label="Robot Systems"
                onChange={handleChangeRobotSystem}
            >
                {data.map((robotSystem, index) => {
                    // console.log("robotSystem", robotSystem);
                    return (
                        <MenuItem value={robotSystem.name} key={index}>
                            {robotSystem.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};
