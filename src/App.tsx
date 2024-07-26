import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState({ id: Date.now(), title: "", content: "" });

  console.log(newPost);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getPosts();
  }, []);
  console.log(posts);

  async function handleAdd(event) {
    event.preventDefault();
    try {
      await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost({ title: "", content: "" });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const latestPost = posts.filter((item) => item.id !== id);
      setPosts(latestPost);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {posts.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <h1>{item.comments[0].user}</h1>
          <p>{item.content}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}

      <form onSubmit={(event) => handleAdd(event)}>
        <label htmlFor="title"> Title </label>
        <input type="text" id="title" name="title" value={newPost.title} onChange={(event) => setNewPost({ ...newPost, title: event.target.value })} />

        <label htmlFor="content"> Views </label>
        <input type="number" id="content" name="content" value={newPost} onChange={(event) => setNewPost({ ...newPost, content: +event.target.value })} />

        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
