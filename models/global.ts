import {ObjectId, WithId} from 'mongodb'

export interface Comment {
    _id: ObjectId,
    postId?: string | number,
    text: string,
    author?: string,
}

export interface PostSchema {
    text: string,
    caption: string,
    author?: string
}

export interface Post extends WithId<PostSchema> {
    _id: ObjectId,
    text: string,
    caption: string,
    author?: string
}