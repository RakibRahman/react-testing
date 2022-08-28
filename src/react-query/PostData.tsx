import React from "react";
import { useCreatePost, useGetUser } from "./useCreatePost";
import { Snackbar, ShowHandle } from "./Snackbar";
export const PostData = () => {
  const snackbarRef = React.useRef<ShowHandle>(null);
  const { isError, mutate, isSuccess, error } = useCreatePost(snackbarRef);
  const { data, isLoading, isError: isUserError } = useGetUser();

  return (
    <div className="bg-red-300">
      {/* {isSuccess ? 'Successfully posted' : null} */}
      {/* {isError ? 'An error has occurred' : null} */}
      {isLoading ? "Loading USer" : null}
      {data && data?.data.results[0].name.first}
      {isUserError ? "error fetching user" : null}
      <Snackbar
        ref={snackbarRef}
        message={
          isSuccess
            ? "Successfully posted"
            : isError
            ? "An error has occurred"
            : ""
        }
        status={isSuccess ? "success" : "error"}
      />
      <br />
      <button
        onClick={(): void =>
          mutate({
            title: "foo",
            body: "bar",
            userId: 1,
          })
        }
      >
        Post
      </button>
    </div>
  );
};
