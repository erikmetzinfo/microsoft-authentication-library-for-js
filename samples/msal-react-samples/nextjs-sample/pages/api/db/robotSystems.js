import clientPromise from "../../../src/middlewares/database";

export default async (req, res) => {
    const client = await clientPromise;
    const { fieldvalue } = req.query;
    const database = client.db(process.env.NEXT_PUBLIC_MONGODB_NAME_META);
    const customerGroup = req.query.customerGroup;

    // console.log(customerGroup);
    let query = { customerGroup: customerGroup };
    if (customerGroup === process.env.NEXT_PUBLIC_AZURE_AD_ADMIN_GROUP) {
        query = {};
    }

    const userdb = await database
        .collection(process.env.NEXT_PUBLIC_MONGODB_COL_ROB)
        .find(query)
        .toArray();
    // console.log("userdb", userdb);
    res.json(userdb);
};
