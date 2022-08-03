import React from 'react';
import logo from './logo.svg';
import './App.css';
import Link from './Link/Link'
import { Form } from './Form/Form';
import { Eshop } from './EShop/Eshop';
import { PostData } from './react-query/PostData';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})
function App() {
  return (


    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <Eshop />
        ddd */}
        <PostData />
      </div>
    </QueryClientProvider>
  );
}

export default App;
