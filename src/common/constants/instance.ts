import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "8a37ea32-6abd-4e89-bdeb-bec7e96dbd2f",
  },
});

export type DefaultResponseType<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[];
};
