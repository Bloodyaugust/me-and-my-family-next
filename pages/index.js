import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ numUsers }) {
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
        <button>Login</button>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  return {
    props: {
      numUsers: users.length
    }
  }
}
