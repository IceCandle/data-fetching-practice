import './PostList.css';

import React from 'react';

interface Post {
  id: number;
  title: string;
}

interface PostListProps {
  posts: Post[];
  selectedPostId: number | null;
  onSelectPost: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  selectedPostId,
  onSelectPost,
}) => {
  return (
    <div className="post-list">
      <h2>Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li
            key={post.id}
            className={post.id === selectedPostId ? 'selected' : ''}
            onClick={() => {
              onSelectPost(post.id);
            }}
          >
            {index + 1}. {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
