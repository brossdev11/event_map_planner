import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.put(async (req, res) => {
  if (!req.user) { res.json(401).send('you need to be authenticated'); return; }
  const password = await bcrypt.hash(req.body.password, 10);
  await req.db
    .collection('users')
    .updateOne({ _id: req.user._id }, { $set: { password } });
  res.end('ok');
});

export default handler;