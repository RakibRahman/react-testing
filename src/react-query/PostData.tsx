import React from 'react'
import { useCreatePost } from './useCreatePost'
import { Snackbar, ShowHandle } from './Snackbar'
export const PostData = () => {
    const snackbarRef = React.useRef<ShowHandle>(null)
    const { isError, mutate, isSuccess, error } = useCreatePost(snackbarRef)
    return (
        <div className='bg-red-300'>
            {/* {isSuccess ? 'Successfully posted' : null} */}
            {/* {isError ? 'An error has occurred' : null} */}
            <Snackbar ref={snackbarRef} message={isSuccess ? 'Successfully posted' : isError ? 'An error has occurred' : ''} status={isSuccess ? 'success' : 'error'} />
            <button onClick={(): void => mutate({
                title: 'foo',
                body: 'bar',
                userId: 1,
            })}>Post</button>
        </div>
    )
}
