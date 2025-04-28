import cookieParser from "cookie-parser";

export default function handler(req, res) {
  cookieParser()(req, res, () => {
    const userName = req.cookies.user_name || null;

    if (userName) {
      res.status(200).json({ user_name: userName });
    } else {
      res.status(401).json({ message: "No active session" });
    }
  });
}
