import nextConnect from 'next-connect';
import isEmail from "validator/lib/isEmail";
import middleware from '../../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.put(async (req, res) => {
  if(!isEmail(req.body.email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }
  await req.db
    .collection('users')
    .updateOne({ _id: req.user._id }, { $set: { email: req.body.email } });
  res.json({ user: { email: req.body.email } });
});

export default handler;