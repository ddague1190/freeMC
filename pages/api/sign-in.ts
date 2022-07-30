import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../constants/ironOptions';
import getMongoDb from '../../utils/db/mongodb';
import verifyPassword from '../../utils/auth';
import { findUserByEmail } from '../../utils/db/query/user';
import { FORM_ERROR } from 'final-form';


export default withIronSessionApiRoute(loginRoute, ironOptions);


async function loginRoute(req, res) {

    const { email, password } = req.body.values;
    const db = await getMongoDb();
    const user = await findUserByEmail(db, email);

    if (!user) {
        res.status(404).json({
            message: {[FORM_ERROR]: 'No account with that email exists.'}
        })
        return
    }
    // get user from database then:
    req.session.user = {
        id: 230,
        admin: true,
    };
    await req.session.save();
    res.send({ ok: true });
}

