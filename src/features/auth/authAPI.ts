import {DefaultResponseType, instance} from "common/constants/instance";

export const authAPI = {
    me: () => instance.get<DefaultResponseType>('/auth/me'),
    login: (data: LoginRequestType) => instance.post<DefaultResponseType<{userId: number}>>('/auth/login', data),
    logout: () => instance.delete<DefaultResponseType>('/auth/login'),
}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}
