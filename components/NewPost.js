import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styles from './NewPost.module.css'

export default function NewPost() {
  const textareaRef = useRef();
  const queryClient = useQueryClient();
  const addPost = useMutation(async () => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        content: textareaRef.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Fetch posts failed');
    }

    return response.json();
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  return (
    <div className={styles.container}>
      <span>Create a new post</span>
      <textarea ref={textareaRef} />
      <button onClick={() => { addPost.mutate(); }}>Post</button>
    </div>
  )
}
