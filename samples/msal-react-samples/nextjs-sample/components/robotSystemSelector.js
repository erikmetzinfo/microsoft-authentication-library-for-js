import { useEffect, useState } from "react";
import useSwr from "swr";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const fetcher = (url) => fetch(url).then((res) => res.json());

const nameInData = (name, data) => {
    let result = false;
    // console.log("name", name);
    // console.log("data", data);
    for (let index = 0; index < data.length; index++) {
        const element = data[index].name;
        if (element === name) {
            result = true;
            break;
        }
    }
    return result;
};
export const RobotSystemSelector = ({
    groups,
    handleChangeRobotSystem,
    lastRobotSystem,
}) => {
    const [firstRun, setFirstRun] = useState(true);
    const [robotSystem, setRobotSystem] = useState();
    const { data, error } = useSwr(
        `/api/db/robotSystems?customerGroup=${groups[0]}`, // TODO: here a customer can only be in one group
        fetcher
    );

    useEffect(() => {
        if (firstRun && Array.isArray(data) && data.length > 0) {
            setFirstRun(false);
            let firstRobotSystem = data[0].name;

            if (
                lastRobotSystem &&
                lastRobotSystem !== true &&
                nameInData(lastRobotSystem, data)
            ) {
                firstRobotSystem = lastRobotSystem;
            }
            setRobotSystem(firstRobotSystem);
            handleChangeRobotSystem({ target: { value: firstRobotSystem } });
        }
    }, [data, robotSystem]);

    function handleChange(event) {
        const robotSystemSelected = event.target.value;
        setRobotSystem(robotSystemSelected);
        handleChangeRobotSystem(event);
    }

    if (error) return <div>failed to load</div>;
    if (!data || !robotSystem) return <div>loading...</div>;
    if (Array.isArray(data) && data.length < 1)
        return <div>no robot systems in your account</div>;
    // console.log("data", data);
    // console.log("robotSystem", robotSystem);
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Robot Systems
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // defaultValue={data[0].name}
                    value={robotSystem}
                    label="Robot Systems"
                    onChange={handleChange}
                >
                    {data.map((robotSystemObject, index) => {
                        // console.log("robotSystemObject", robotSystemObject);
                        return (
                            <MenuItem
                                value={robotSystemObject.name}
                                key={index}
                            >
                                {robotSystemObject.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};
