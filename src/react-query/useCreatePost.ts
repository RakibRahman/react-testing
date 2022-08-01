import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { ShowHandle } from "./Snackbar";
const createPost = (data: object) => axios.post('https://jsonplaceholder.typicode.com/posts', data)
export const useCreatePost = (ref: React.RefObject<ShowHandle>) => {
    return useMutation((newData: object) => createPost(newData), {
        onSuccess: () => {
            if (ref.current) {
                ref.current.show()
            }
        }
    });
}