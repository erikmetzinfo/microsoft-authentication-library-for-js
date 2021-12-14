const robotSystems = [
    {
        id: "tzwcnyg3",
        name: "Sally",
        location: {
            country: "US",
            state: "MA",
            zip: "02199",
            city: "Boston",
            street: "800 Boylston St",
        },
        group: "25cd35d7-ddf6-4f15-b862-25953eaac9cd",
    },
    {
        id: "vmmsc3xv",
        name: "Linda",
        location: {
            country: "US",
            state: "MI",
            zip: "48202",
            city: "Detroit",
            street: "5200 Woodward Ave",
        },
        group: "25cd35d7-ddf6-4f15-b862-25953eaac9cd",
    },
    {
        id: "vwvgrdc3",
        name: "Emmely",
        location: {
            country: "US",
            state: "NY",
            zip: "10001",
            city: "New York",
            street: "20 W 34th St",
        },
        group: "a887886a-8b85-4997-b46d-7ad8fba61c69",
    },
    {
        id: "qdbyfk4v",
        name: "Lucy",
        location: {
            country: "US",
            state: "DC",
            zip: "20500",
            city: "Washington",
            street: "1600 Pennsylvania Avenue NW",
        },
        group: "a887886a-8b85-4997-b46d-7ad8fba61c69",
    },
];

function getRobotSystemsFromAzureTableStorage(groups) {
    process.env.NEXT_PUBLIC_MONGODB_URI;
    process.env.NEXT_PUBLIC_MONGODB_NAME_META;
    process.env.NEXT_PUBLIC_MONGODB_COL_ROB;
    process.env.NEXT_PUBLIC_MONGODB_COL_CAD;
}

function getRobotSystemsFromJson(groups) {
    if (
        groups.length === 1 &&
        groups[0] === process.env.NEXT_PUBLIC_AZURE_ADMIN_GROUP
    ) {
        console.log("robotsOfCustomer ADMIN", robotSystems);
        return robotSystems;
    }

    const robotsOfCustomer = [];
    robotSystems.forEach((robotSystem) => {
        // console.log("robotSystem.group", robotSystem.group);
        if (groups.includes(robotSystem.group) === true)
            robotsOfCustomer.push(robotSystem);
    });
    console.log("robotsOfCustomer", robotsOfCustomer);
    return robotsOfCustomer;
}

export function getRobotSystemsOfGroups(groups) {
    console.log("groups", groups);
    console.log("groups.length", groups.length);
    console.log("groups[0]", groups[0]);
    console.log(
        "process.env.NEXT_PUBLIC_AZURE_ADMIN_GROUP",
        process.env.NEXT_PUBLIC_AZURE_ADMIN_GROUP
    );

    return getRobotSystemsFromJson(groups);
    return getRobotSystemsFromAzureTableStorage(groups);
}
