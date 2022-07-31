import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../constants/ironOptions';
import getMongoDb from '../../utils/db/mongodb';
import { verifyPassword } from '../../utils/auth';
import { findUserByEmail } from '../../utils/db/query/user';
import { FORM_ERROR } from 'final-form';


export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {

    const { email, password } = req.body.values;
    const db = await getMongoDb();
    const user = await findUserByEmail(db, email);
    if (!user) {
        res.status(404).json({
            message: [
                { [FORM_ERROR]: 'No account with that email exists.' }
            ]
        })
        return
    }
    else {
        const isValid = await verifyPassword(password, user.password)
        if (!isValid) {
            res.status(403).json({
                message: [
                    { [FORM_ERROR]: 'Password is not correct.' }
                ]
            })
            return
        }


    }



    req.session.user = {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        admin: false,
    };
    await req.session.save();
    res
        .status(200)
        .json({
            message: 'Authentication successful',
            user: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                admin: false,
            }
        })
        .send({ ok: true });
}

