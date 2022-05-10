import { PrismaClient } from '@prisma/client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ numUsers }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/feed');
  }

  return (
    <div>
      <Head>
        <title>Me and my Family</title>
        <meta name="description" content="For Families to Share" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to this Family</h1>
        <h4>This Family has {numUsers} users</h4>
        {session ?
          <>
            <span>Signed in as {session.user.email}</span>
            <button onClick={signOut}>Logout</button>
          </>
          :
          <>
            <button onClick={signIn}>Login</button>
          </>
        }
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  return {
    props: {
      numUsers: users.length
    }
  }
}
