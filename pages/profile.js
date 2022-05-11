import { useRef } from 'react';
import { getSession, useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useMutation, useQuery } from 'react-query';
import styles from './profile.module.css';

export default function Profile() {
  const nameRef = useRef();
  const { data: session } = useSession();
  const { data: user } = useQuery(['local-user'], async () => {
    const response = await fetch(`/api/users/current`);

    if (!response.ok) {
      throw new Error('Fetch posts failed');
    }

    return response.json();
  });
  const userMutation = useMutation(async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: nameRef.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Update user failed');
    }

    return response.json();
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('local-user');
    }
  });

  return (
    <div className={styles.container}>
      <span>{session?.user.email}'s Profile</span>
      <button onClick={signOut}>Sign Out</button>
      <Link href="/feed">
        <a>Feed</a>
      </Link>
      <label htmlFor="user-name">Name</label>
      <input type="text" id="user-name" ref={nameRef} defaultValue={user?.name} />
      <button onClick={() => { userMutation.mutate(); }}>Save</button>
    </div>
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
    props: {}
  }
}
