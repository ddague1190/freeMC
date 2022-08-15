import { NextApiRequest, NextApiResponse } from "next"
import { StoreInfoState } from "../../../store/store-info/state";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../constants/ironOptions";
import getMongoDb from "../../../utils/db/mongodb";
import { FORM_ERROR } from 'final-form';
import { ObjectId } from "mongodb";


export default withIronSessionApiRoute(handler, ironOptions);


/**
 * Api error response
 */
export type ApiErrorResponse = {
  statusCode: number
  message: string
  error?: Error
}

/**
 * TODO restful-api with path-parameter
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
async function handler(req: NextApiRequest, res: NextApiResponse): NextApiRequest {
  const {
    method,
    body,
  } = req

  try {
    res.setHeader("Content-Type", "application/json");

    const user = req.session.user;


    if (!user) {
      res.status(404).json({
        message: 'User not authenticated'
      })
      return
    }

    const db = await getMongoDb();
    const oldStoreInfo = await db.collection("stores").findOne({ owner: new ObjectId(user.id) });

    if (oldStoreInfo._id.toString() !== body.storeInfo.id) {
      res.status(404).json({
        message: 'User not authorized'
      })
      return
    }


    switch (method) {
      case "PATCH":
        const { storeInfo } = body;
        const document = await db
          .collection('stores')
          .updateOne({ _id: new ObjectId(storeInfo.id), owner: new ObjectId(user.id) }, { $set: { ...storeInfo, _id: oldStoreInfo._id, owner: oldStoreInfo.owner } })

        console.log(body);
        res.status(200).json({ success: true });
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
