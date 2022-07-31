import { useMutation } from "@tanstack/react-query";
import axios from "axios"
const createPost = (data: object) => axios.post('https://jsonplaceholder.typicode.com/posts', data)
export const useCreatePost = () => {
    return useMutation((newData: object) => createPost(newData));
}