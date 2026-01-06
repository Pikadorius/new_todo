import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "912ee5e8-eb5b-4c5a-9077-a86e206013de",
  },
});

export type DefaultResponseType<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[];
};
