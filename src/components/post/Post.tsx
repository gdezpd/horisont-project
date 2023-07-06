import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { isFetchingStatus, rootThunks } from "../../store/slice/sliceRoot";
import { CommentType } from "../../store/api";
import { ReactComponent as Icon } from "../../assets/icon/user.svg";
import s from './Post.module.scss'
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Spinner } from "react-bootstrap";
import { addComment } from '../../store/slice/comentsSlice';

type PostType = {
    title: string
    body: string
    userName: string
    userId: number
    postId: number
    url: string
    commentsPost: CommentType[]
}

const Post = ({ title, body, userName, userId, postId, commentsPost, url }: PostType) => {
    const dispatch = useAppDispatch()
    const dataUser = useParams()
    const { getComments } = useActions(rootThunks)

    const {
        fetching
    } = useAppSelector(state => ({
        fetching: state.root.fetching,
    }))
    const {
        comments
    } = useAppSelector(state => ({
        comments: state.comments.filter(el => el.postId === postId),
    }))
    const [fetchingComments, setFetchingComments] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (fetchingComments) {
            getComments({ postId })
        }
    }, [fetchingComments])

    const {
        valueInput
    } = useAppSelector(state => ({
        valueInput: state.root.valueInput,
    }))

    const getCommentsForPost = () => {
        dispatch(isFetchingStatus(true))
        setFetchingComments(true)
        setIsOpen(!isOpen)
    }

    const generalArrayComments = commentsPost.concat(comments)

    const handleInputSubmit = () => {
        dispatch(addComment({
            postId,
            body: inputValue,
            email: 'You your@email.com',
            name: 'You',
            id: postId + title.length
        }));
        setInputValue('')
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleInputSubmit();
        }
    };

    const nameButton = !isOpen ? 'Open comments' : 'Show comments'
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <div className={s.container}>
            {
                Number(dataUser.userId) === userId ? <div className={s.iconLink}>
                    <Icon className={s.icon}/>
                    <h5 className={s.userName}>{userName}</h5>
                </div> : <Link to={`/user/${userId}`} className={s.iconLink}>
                    <Icon className={s.icon}/>
                    <h5 className={s.userName}>{userName}</h5>
                </Link>
            }

            <h5 className={s.titlePost}>{title}</h5>

            <div className={s.body}>{body}</div>

            <div className={s.wrapperPicture}>
                <img className={s.picture} src={url} alt='picture'/>
            </div>

            <Button variant='secondary' size='sm' className={s.button} onClick={getCommentsForPost}>
                {nameButton}
            </Button>

            {isOpen && <>

                {commentsPost.length === 0 ? fetching && <div className={s.spinner}>
                    <Spinner
                        animation='border'/>
                </div> : generalArrayComments.map((el, index) => (<div key={index} className={s.comment}>
                        <h5 className={s.emailComment}>{el.email}</h5>
                        <div className={s.textComment}>{el.body}</div>
                    </div>)
                )}
                <div className={s.inputContainer}>
                    <input className={s.input} type='text' placeholder='Write comment...' value={inputValue}
                           onChange={inputHandler} onKeyDown={handleKeyDown}/>
                    <div className={s.buttonContainer}>
                        <Button onClick={handleInputSubmit} disabled={!inputValue.trim()}>
                            Add comment
                        </Button>
                    </div>
                </div>
            </>}
        </div>
    );
};

export default Post;
