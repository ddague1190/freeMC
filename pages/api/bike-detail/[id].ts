import { NextApiRequest, NextApiResponse } from "next"
import { ApiErrorResponse } from "../../../model/ApiErrorResponse";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../constants/ironOptions";
import getMongoDb from "../../../utils/db/mongodb";
import { ObjectId } from "mongodb";

export default withIronSessionApiRoute(handler, ironOptions);


/**
 * TODO restful-api with path-parameter
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
async function handler(req: NextApiRequest, res: NextApiResponse): NextApiRequest {
    const {
        query: { id: bikeIdentifier },
        method,
        body,
    } = req

    try {
        res.setHeader("Content-Type", "application/json");
        const user = req.session.user;


        const db = await getMongoDb();
        // const { _id: storeId } = await db.collection("stores").findOne({ owner: ObjectId(user.id) });


        switch (method) {
            case "GET":
                // find data
                let bikeInfo = await db
                    .collection("bikes")
                    .findOne(
                        { _id: new ObjectId(bikeIdentifier) }
                    );

                if (!bikeInfo) {
                    const error: ApiErrorResponse = {
                        statusCode: 404,
                        message: `Could not find records for that motorcycle.`,
                    }
                    res.status(404).json(error)
                    return
                }
                let { name } = await db.
                    collection('customers')
                    .findOne({
                        store: bikeInfo.store,
                        identifier: bikeInfo.customerIdentifier
                    }, { projection: { name: 1 } })

                bikeInfo.owner = name
                bikeInfo.id = bikeInfo._id.toString()
                bikeInfo.store = bikeInfo.store.toString()
                delete bikeInfo._id
                res.status(200).json(bikeInfo);
                break
            case "PATCH":
                const { model, estimatedValue, mileage, color, description } = body;
                //update bike info with request data
                await db
                    .collection("bikes")
                    .updateOne(
                        { _id: new ObjectId(bikeIdentifier) },
                        { $set: { model, estimatedValue, mileage, color, description } }
                    );
                console.log({model, estimatedValue, mileage, color, description }, 'asdfa')
                res.status(200).json({model, estimatedValue, mileage, color, description });
                break
            case "DELETE":
                const deleteTargetId = testTodos.findIndex((todo) => todo.id === todoId)
                testTodos.splice(deleteTargetId, 1)
                res.status(204).end()
                break
            default:
                res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"])
                res.status(405).end(`Method ${method} Not Allowed`)
                break
        }
    } catch (e) {
        const error: ApiErrorResponse = {
            statusCode: 500,
            message: `Internal server error. ${e}`,
        }
        res.status(500).json(error)
    }
}
