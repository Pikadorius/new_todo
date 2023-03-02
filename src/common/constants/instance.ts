import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'abc137fc-ad0c-49be-975b-e12bdb8a93ad'
    }
})

export type DefaultResponseType<T={}> = {
    data: T,
    resultCode: number,
    messages: string[],
}