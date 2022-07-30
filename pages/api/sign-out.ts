import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../constants/ironOptions";

export default withIronSessionApiRoute(logoutRoute, ironOptions);