import { io } from "socket.io-client";
const API = import.meta.env.VITE_API_URL;

export const socket = io(API, {
  withCredentials: true,
  autoConnect: true,
});
