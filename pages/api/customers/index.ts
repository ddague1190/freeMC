import { NextApiRequest, NextApiResponse } from "next"
import { StoreInfoState } from "../../../store/store-info/state";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../constants/ironOptions";
import getMongoDb from "../../../utils/db/mongodb";
import { FORM_ERROR } from 'final-form';
import { ObjectId } from "mongodb";
import { Customer } from "../../../store/customer/state";


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
    let today = new Date().toISOString().slice(0, 10)
    const user = req.session.user;


    if (!user) {
      res.status(404).json({
        message: 'User not authenticated'
      })
      return
    }

    const db = await getMongoDb();
    const storeInfo = await db.collection("stores").findOne({ owner: new ObjectId(user.id) });
    const { customer } = body;




    switch (method) {
      case "GET":
        const allCustomers = await db.collection('customers').find({ store: storeInfo._id }, { email: 1, phone: 1, name: 1, identifier: 1, activeJob: 1 }).toArray();
        res.status(200).json(allCustomers);

      case "POST":

        let currNumCustomers = 0
        try {
          currNumCustomers = await db
            .collection('customers')
            .find({ store: storeInfo._id }, { projection: { _id: false, identifier: 1 } })
            .sort({ identifier: -1 })
            .limit(1)
            .toArray()
            .then((result: Customer[]) => result[0].identifier)

        } catch (error) {
          console.log(error)
          currNumCustomers = 0;
        }



        const newCustomer = await db
          .collection('customers')
          .insertOne({ ...customer, store: storeInfo._id, customerSince: today, identifier: currNumCustomers + 1 })
        res.status(201).json({ success: true, identifier: currNumCustomers + 1 });
        break
      case "PATCH":
        const editedCustomer = await db
          .collection('stores')
          .updateOne({ _id: new ObjectId(storeInfo._id), owner: new ObjectId(user.id) }, { $set: { ...storeInfo, _id: oldStoreInfo._id, owner: oldStoreInfo.owner } })

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
  return
}

