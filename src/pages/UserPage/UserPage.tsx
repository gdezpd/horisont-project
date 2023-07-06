import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "../../router/routeConfig";
import { useAppSelector } from "../../store/store";
import Post from "../../components/post/Post";
import { ReactComponent as Icon } from "../../assets/icon/user.svg";
import s from './UserPage.module.scss'

const UserPage = () => {
    const {
        comments,
        allPosts,
        users,
    } = useAppSelector(state => ({
        comments: state.root.comments,
        allPosts: state.root.allPosts,
        users: state.root.users,
    }))

    const dataUser = useParams()
    const navigate = useNavigate()
    const { pathname } = useLocation();

    useEffect(() => {
        if (users.filter(el => el.id === Number(dataUser.userId)).length < 1) {
            navigate(-1)
        }
        window.scrollTo(0, 0);
    }, [pathname]);
const comeBack = ()=> navigate(-1)
    return (
        <div className={s.containerUser}>
            <div onClick={comeBack} className={s.wrapperButtonBack}>
                <button className={s.buttonBack}>
                    Come back
                </button>
            </div>
            {
                users.filter(el => el.id === Number(dataUser.userId)).map((el, index) => (
                    <div key={index} className={s.userItem}>
                        <div>
                            <h5 className={s.name}>{el.username}</h5>
                            <div className={s.email}> {el.email} </div>
                        </div>

                        <Icon className={s.icon}/>
                    </div>)
                )
            }
            <div className={s.containerPosts}>
                {allPosts.filter(el => el.userId === Number(dataUser.userId)).map((el, index) => {
                        const user = users.find(user => user.id === el.userId)
                        const commentsPost = comments.filter(post => post.postId === el.id)
                        if (user) {
                            return <div key={index} className={s.wrapperPost}>
                                <Post title={el.title} body={el.body} userName={user.username} userId={user.id}
                                      postId={el.id}
                                      url={el.url}
                                      commentsPost={commentsPost}/>
                            </div>
                        }
                    }
                )}
            </div>
        </div>
    );
};

export default UserPage;
