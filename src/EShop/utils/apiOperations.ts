import axios from 'axios'

import { useState, useEffect } from 'react'
export const useFetchProducts = <T>(url: string) => {

    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const cancelToken = axios.CancelToken.source()

    const fetchProducts = async (): Promise<void> => {

        try {
            setLoading(true)
            const response = await axios.get<T[]>(url, {
                cancelToken: cancelToken.token
            })
            setData(response.data)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("Axios Error with Message: " + error.message);
            }
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {

        fetchProducts();
        return () => {
            if (cancelToken) {
                cancelToken.cancel()
            }
        }
    }, []);


    return { data, error, loading }
}