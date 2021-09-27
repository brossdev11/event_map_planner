import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import { ObjectID } from 'mongodb';  

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  let event = await req.db
    .collection("events")
    .insertOne({ user_id: req.user._id, ...req.body })
    .then(({ ops }) => ops[0]);

  res.status(200).send({
    result: event,
  });
});

handler.put(async (req, res) => {
    await req.db.collection('events').updateOne(
        { _id: ObjectID(req.body.id) },
        {
            $set: req.body,
        },
    );
  res.status(200).send({
    result: 'success',
  });
});

handler.get(async (req, res) => {
  let events = await req.db
    .collection("events")
    .find({ user_id: req.user._id })
    .toArray();
  res.status(200).send({
    events: events,
  });
});

export default handler;
