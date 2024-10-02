import './App.css';

import React, { useEffect, useState } from 'react';

import PostDetail from './PostDetail';
import PostList from './PostList';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = (await response.json()) as Post[];
        if (Array.isArray(data) && data.every(isPost)) {
          setPosts(data);
          if (data.length > 0) {
            if (data[0] != null) {
              setSelectedPostId(data[0].id);
            }
          }
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      }
    };

    void fetchPosts();
  }, []);

  // Type guard to check if an object is a Post
  function isPost(obj: unknown): obj is Post {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof (obj as Record<string, unknown>).id === 'number' &&
      typeof (obj as Record<string, unknown>).title === 'string' &&
      typeof (obj as Record<string, unknown>).body === 'string' &&
      typeof (obj as Record<string, unknown>).userId === 'number'
    );
  }

  if (error !== null) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">
      <PostList
        posts={posts}
        selectedPostId={selectedPostId}
        onSelectPost={setSelectedPostId}
      />
      {selectedPostId !== null && <PostDetail postId={selectedPostId} />}
    </div>
  );
};

export default App;
