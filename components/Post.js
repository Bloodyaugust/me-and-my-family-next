import moment from 'moment';
import { useQuery } from 'react-query';
import styles from './Post.module.css';

export default function Post({ postID }) {
  const { data: post } = useQuery(['post', postID], async () => {
    const response = await fetch(`/api/posts/${postID}`);

    if (!response.ok) {
      throw new Error('Fetch post failed');
    }

    return response.json();
  });

  if (!post) {
    return <span>Loading...</span>
  }

  return (
    <div className={styles.container}>
      <p className={styles.content}>{post.content}</p>
      <div className={styles.footer}>
        <span>{post.authorId}</span>
        <span>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
      </div>
    </div>
  )
}
