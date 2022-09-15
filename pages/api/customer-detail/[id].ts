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
        query: { id: customerIdentifier },
        method,
        body,
    } = req

    try {
        res.setHeader("Content-Type", "application/json");
        const user = req.session.user;


        const db = await getMongoDb();
        const { _id: storeId } = await db.collection("stores").findOne({ owner: ObjectId(user.id) });


        switch (method) {
            case "GET":
                // find data
                const customerInfo = await db
                    .collection("customers")
                    .findOne(
                        { store: storeId, identifier: Number(customerIdentifier) },
                        { projection: { _id: false, store: false } }
                    );

                if (!customerInfo) {
                    const error: ApiErrorResponse = {
                        statusCode: 404,
                        message: `Customer with identifer ${id} is not found.`,
                    }
                    res.status(404).json(error)
                    return
                }
                res.status(200).json(customerInfo);
                break
            case "PATCH":
                const { name, email, phone, address } = body;
                //update customer with request data
                await db
                    .collection("customers")
                    .updateOne(
                        { store: storeId, identifier: Number(customerIdentifier) },
                        { $set: { name, email, phone, address } }
                );
                res.status(200).json();
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
