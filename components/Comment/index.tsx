import {useEffect, useState} from 'react';

import { Typography, Card, Button, Divider } from 'antd';
import {Comment as CommentType} from '../../models/global';

import styles from './Comment.module.scss'

interface Props {
    comment: CommentType;
    onDelete: () => void,
    onEdit: (text: string) => void,
}


export const Comment = (props: Props) => {
    const {comment, onDelete, onEdit} = props;
    
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(comment.text)
    
    const editCommentButtonHandler = () => {
        if (isEditing) {
            setText(comment.text);
        }
        setIsEditing(!isEditing)
    }

    const enterCommentButtonHandler = () => {
        onEdit(text)
        setIsEditing(false);
    }

    return (
        <div className={styles.comment}>
            <div className="comment">
            <Typography.Title level={5} style={{margin: 0}}>ID comment: {String(comment._id)}</Typography.Title>
                <Typography.Title level={5} style={{margin: '0 0 15px'}}>postID : {comment.postId}</Typography.Title>
                <Typography.Text className='comment__text' editable={{
                    editing: isEditing,
                    onChange(value) {
                        setText(value);
                    },
                    triggerType: ['text'],
                    enterIcon: <Button type="primary" style={{
                        insetInlineEnd: '0px',
                        insetBlockEnd: '0',
                        pointerEvents: 'auto',
                        color: "#ffffff"
                    }} onClick={() => {
                        enterCommentButtonHandler()
                    }}>Enter</Button>
                    
                }}>{text}</Typography.Text>
                <div className="comment__buttons">
                    <Button type="primary" onClick={() => editCommentButtonHandler()}>{!isEditing ? 'Edit' : 'Reset'}</Button>
                    <Button type="primary" onClick={() => onDelete()} danger>Delete</Button>
                </div>
            </div>            
        </div>
    )
}