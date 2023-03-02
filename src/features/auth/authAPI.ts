import {DefaultResponseType, instance} from "common/constants/instance";

export const authAPI = {
    me: ()=>instance.get<DefaultResponseType>('/auth/me')
}