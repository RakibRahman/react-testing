import "./App.css";
// import Link from './Link/Link'
// import { Form } from './Form/Form';
import { Eshop } from "./EShop/Eshop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostData } from "./react-query/PostData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Eshop />

        {/* <PostData /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
