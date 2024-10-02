import './PostDetail.css';

import React, { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface PostDetailProps {
  postId: number;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
          fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
          ),
        ]);

        if (!postResponse.ok || !commentsResponse.ok) {
          throw new Error('Failed to fetch post or comments');
        }

        const postData: Post = (await postResponse.json()) as Post;
        const commentsData: Comment[] =
          (await commentsResponse.json()) as Comment[];

        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      }
    };

    void fetchPostAndComments();
  }, [postId]);

  if (error != null) {
    return <div>Error: {error}</div>;
  }

  if (post == null) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.email}</strong>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
