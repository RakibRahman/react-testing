import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShowHandle } from "./Snackbar";
const createPost = (data: object) =>
  axios.post("https://jsonplaceholder.typicode.com/posts", data);
export const useCreatePost = (ref: React.RefObject<ShowHandle>) => {
  return useMutation((newData: object) => createPost(newData), {
    onSuccess: () => {
      if (ref.current) {
        ref.current.show();
      }
    },
    onError: () => {
      if (ref.current) {
        ref.current.show();
      }
    },
  });
};

const getUser = () => axios.get("https://randomuser.me/api/?results=1");

export const useGetUser = () => {
  return useQuery(["user"], () => getUser());
};
