import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../constants/ironOptions";

export default withIronSessionApiRoute(userRoute, ironOptions);

async function userRoute(req, res) {
    res.send({ user: req.session.user });
};