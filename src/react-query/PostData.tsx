import React from 'react'
import { useCreatePost } from './useCreatePost'
export const PostData = () => {
    const { isError, mutate, isSuccess, error } = useCreatePost()
    return (
        <div className='bg-red-300'>
            {isSuccess ? 'Successfully posted' : null}
            {isError ? 'An error has occurred' : null}
            <button onClick={(): void => mutate({
                title: 'foo',
                body: 'bar',
                userId: 1,
            })}>Post</button>
        </div>
    )
}
