import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useQuery } from 'react-query';
import NewPost from '../components/NewPost';
import styles from './feed.module.css';

export default function Feed({ session }) {
  const { data } = useQuery(['posts'], async () => {
    const response = await fetch('/api/posts');

    if (!response.ok) {
      throw new Error('Fetch posts failed');
    }

    return response.json();
  });

  return (
    <>
      <span>This is {session.user.email}'s feed!</span>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
      <NewPost />
      <div className={styles.posts}>
        {data &&
          data.map((post) => {
            return (
              <span key={post.id}>{post.id}: {post.content}</span>
            )
          })
        }
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
