import { Env } from "./Env"

export const ironOptions = {
    cookieName: Env.COOKIE_NAME,
    password: Env.IRON_PASSWORD,
    secure: Env.NODE_ENV === 'production',
    cookieOptions: {
        secure: Env.NODE_ENV === 'production',
    }
}

export function logoutRoute(req, res, session) {
    req.session.destroy();
    res.send({ ok: true });
}