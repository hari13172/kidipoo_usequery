import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { API } from "./api/data";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient();
  const [id, setId] = useState(1);

  // Queries
  const dataId = useQuery({
    queryKey: ["todos", id],
    queryFn: () => API.dataId(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const Alldata = useQuery({
    queryKey: ["todos"],
    queryFn: () => API.data(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Mutations
  const mutation = useMutation((data) => API.addData(data), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <ul>
        {dataId.isLoading ? (
          <h1>loading....</h1>
        ) : dataId.isError ? (
          <h1>{dataId.error.message}</h1>
        ) : (
          dataId.data.map((todo) => <li key={todo.id}>{todo.name}</li>)
        )}
      </ul>

      <button onClick={() => setId((a) => a + 1)}>next</button>
      <button onClick={() => setId((a) => a - 1)}>previous</button>
      <input type="text" name="names" id="names" />
      <input
        type="button"
        value="add name"
        onClick={() => {
          let name = document.getElementById("names").value;
          mutation.mutate({
            name,
          });
        }}
      />
      <ul>
        {Alldata.data?.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
    </div>
  );
}



export default App;
