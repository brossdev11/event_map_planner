import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/api-helpers';
import multer from 'multer';

const upload = multer({ dest: '/tmp' });
const handler = nextConnect();

handler.use(middleware);
handler.get(async (req, res) => res.json({ user: extractUser(req) }));

handler.patch(upload.single('profilePicture'), async (req, res) => {
    if (!req.user) {
        req.status(401).end();
        return;
    }

    const { name } = req.body;

    await req.db.collection('users').updateOne(
        { _id: req.user._id },
        {
            $set: {
                name: name,
            },
        },
    );
    res.json({ user: { name } });
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;