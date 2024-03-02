import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

const POSTS = [
  {
    id: 1,
    title: "post 1",
  },
  {
    id: 2,
    title: "post 2",
  },
];

function App() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(10).then(() => [...POSTS]),
  });

  const postMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID, title: title })
      );
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;

  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  return (
    <div>
      {postQuery?.data?.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
        </div>
      ))}
      {postMutation.isLoading && <h1>Loading ...</h1>}
      <button
        disabled={postMutation.isLoading}
        onClick={() => postMutation.mutate("post ++")}
      >
        Generate Post
      </button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
