import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})


export type PostType = {
    "userId": number,
    "id": number,
    "title": string,
    "body": string
}

export type PhotoType = {
    "albumId": number,
    "id": number,
    "title": string,
    "url": string,
    "thumbnailUrl": string
}
export type PostTypeWithPhoto = {
    "userId": number,
    "id": number,
    "title": string,
    "body": string
    "url": string,
}

export type UserType = {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
        "street": string,
        "suite": string,
        "city": string,
        "zipcode": string,
        "geo": {
            "lat": string,
            "lng": string
        }
    }
}

export type CommentType = {
    "postId": number,
    "id": number,
    "name": string,
    "email": string,
    "body": string
}


export const api = {
    getPosts(currentPage: number) {
        return instance.get<Array<PostType>>(`/posts?_limit=10&_page=${currentPage}`)
    },
    getAllPosts() {
        return instance.get<Array<PostType>>(`/posts`)
    },
    getUsers() {
        return instance.get<Array<UserType>>('/users')
    },
    getComments(postId: { postId: number }) {
        return instance.get<Array<CommentType>>(`/comments?postId=${postId.postId}`)
    },
    getPhotos(currentPage: number) {
        return instance.get<Array<PhotoType>>(`/photos?_limit=10&_page=${currentPage}`)
    },
    getaAllPhotos() {
        return instance.get<Array<PhotoType>>(`/photos`)
    },
}
