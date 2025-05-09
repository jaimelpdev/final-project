export default function handler(req, res) {
  if (req.method === "POST") {
    // Delete the cookies by setting their Max-Age to 0
    res.setHeader("Set-Cookie", [
      "session=; Max-Age=0; Path=/; HttpOnly",
      "user_name=; Max-Age=0; Path=/; HttpOnly",
      "user_email=; Max-Age=0; Path=/; HttpOnly",
    ]);

    // Response with a success message
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    // Method not allowed
    res.status(405).json({ message: "Method not allowed" });
  }
}
