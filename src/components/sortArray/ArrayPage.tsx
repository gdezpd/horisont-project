import React from "react";
import { PostTypeWithPhoto } from "../../store/api";
import { useAppSelector } from "../../store/store";
import Post from "../post/Post";
import s from "../../pages/HomePage/HomePage.module.scss";

type SortArrayType = {
    postsPage: PostTypeWithPhoto[],
    sortPosts: PostTypeWithPhoto[],
    sort: boolean
}
export const ArrayPage = ({ postsPage, sortPosts, sort }: SortArrayType) => {

    const {
        comments,
        users,
    } = useAppSelector(state => ({
        comments: state.root.comments,
        users: state.root.users,
    }))

    return (<>
        {(sort ? sortPosts : postsPage).map((el, index) => {
            const user = users.find(user => user.id === el.userId)
            const commentsPost = comments.filter(post => post.postId === el.id)
            if (user) {
                return <div key={index} className={s.wrapperPost}>
                    <Post title={el.title}
                          body={el.body}
                          url={el.url}
                          userName={user.username}
                          userId={user.id}
                          postId={el.id}
                          commentsPost={commentsPost}
                    />
                </div>
            }
        })}
    </>)
}
