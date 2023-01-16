import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import clientPromise from "../../libs/mongodb";

import {Comment} from '../../models/global'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("test");
  
  switch (req.method) {
    case "POST":
      const {postId, text, author}:Omit<Comment, 'id'> = JSON.parse(req.body);
      const createdComment = await db.collection("comments").insertOne({
        postId: new ObjectId(postId),
        text, 
        author
      });
      res.json(createdComment.insertedId);
      break;
    case "GET":
      const postComments = await db.collection("comments").find({postId: Array.isArray(req.query.postId) ? new ObjectId(req.query.postId[0]) : new ObjectId(req.query.postId)}).toArray();
      res.json({ status: 200, data: postComments });
      break;
    case "PUT":
      const {id, ...rest}: any = JSON.parse(req.body);
      const editedComment = await db.collection("comments").updateOne({_id: new ObjectId(id)}, {
        $set: rest
      });
      res.json({ status: 200, data: {id, ...rest} });
      break;
    case "DELETE":
      const deletedComment = await db.collection("comments").deleteOne({_id: Array.isArray(req.query.id) ? new ObjectId(req.query.id[0]) : new ObjectId(req.query.id) });
      res.json({ status: 200, data: deletedComment });
      break;
  }
}