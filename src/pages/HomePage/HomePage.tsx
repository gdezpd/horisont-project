import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { isFetchingStatus, rootThunks, sortPostsCreator } from "../../store/slice/sliceRoot";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { SearchForm } from "../../components/searchForm/SearchForm";
import { ArrayPage } from '../../components/sortArray/ArrayPage';
import { ArrayAllPosts } from '../../components/filteredPosts/ArrayAllPosts';
import { useActions } from "../../hooks/useActions";
import s from './HomePage.module.scss'

const HomePage = () => {
    const dispatch = useAppDispatch()

    const { getPosts,
        getUsers, getAllPosts
    } = useActions(rootThunks)

    const {
        postsPage,
        allPosts,
        sortPosts,
        fetching,
        totalCount,
        searchValue
    } = useAppSelector(state => ({
        postsPage: state.root.posts,
        allPosts: state.root.allPosts,
        sortPosts: state.root.sortPosts,
        fetching: state.root.fetching,
        totalCount: state.root.totalCount,
        searchValue: state.root.searchValue,
    }))

    const [sort, setSort] = useState(false)

    useEffect(() => {
        if (fetching) {
            getPosts({})
        }
    }, [fetching])

    useEffect(() => {
        getAllPosts({})
        getUsers({})
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    },)

    const scrollHandler = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 &&
            postsPage.length < totalCount) {
            dispatch(isFetchingStatus(true))
        }
    }


    const onChangeSortPosts = () => {
        const workArray = searchValue === '' ? postsPage : allPosts

        if (!sort) {
            const a = [...(workArray || [])].sort((a, b) => {
                const nameA = a.title.toUpperCase();
                const nameB = b.title.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
            dispatch(sortPostsCreator(a))
            setSort(prev => !prev)
        } else if (sort) {
            dispatch(sortPostsCreator(workArray))
            setSort(prev => !prev)
        }
    }

    return (
        <div className={s.containerHome}>
            <div className={s.toolsWrapper}>
                <SearchForm/>
                <Button variant='secondary' size='lg' active className={s.button} onClick={onChangeSortPosts}>
                    Sort posts
                </Button>
            </div>
            {
                searchValue === '' ?
                    <ArrayPage postsPage={postsPage} sortPosts={sortPosts} sort={sort}/>
                    : <ArrayAllPosts allPosts={allPosts} sortPosts={sortPosts} searchValue={searchValue} sort={sort}/>
            }
            <div>
                {fetching && <div className={s.spinner}>
                    <Spinner
                        animation='border'/>
                </div>}
            </div>
        </div>
    );
};

export default HomePage;
