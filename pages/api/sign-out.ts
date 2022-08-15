import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions, logoutRoute } from "../../constants/ironOptions";

export default withIronSessionApiRoute(logoutRoute, ironOptions);