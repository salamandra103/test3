import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import clientPromise from "../../libs/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("test");
  
  switch (req.method) {
    case "POST":
      const createdPost = await db.collection("posts").insertOne(JSON.parse(req.body));
      res.json(createdPost.insertedId);
      break;
    case "GET":
      if (req.query.id) {
        const post = await db.collection("posts").findOne({_id: Array.isArray(req.query.id) ? new ObjectId(req.query.id[0]) : new ObjectId(req.query.id) });      
        res.json({ status: 200, data: post });
      } else {
        const posts = await db.collection("posts").find({}).toArray();
        res.json({ status: 200, data: posts });
      }
      
      break;
    case "PUT":
      const {_id, ...rest} = JSON.parse(req.body);
      const editedPost = await db.collection("posts").updateOne({_id: new ObjectId(_id)}, {
        $set: rest
      });
      res.json({ status: 200, data: {_id, ...rest} });
      break;
    case "DELETE":
      const deletedPost = await db.collection("posts").deleteOne({_id: Array.isArray(req.query.id) ? new ObjectId(req.query.id[0]) : new ObjectId(req.query.id) });
      res.json({ status: 200, data: deletedPost });
      break;
  }
}