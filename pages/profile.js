import { getSession, useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Profile() {
  const { data: session } = useSession();

  return (
    <>
      <span>{session?.user.email}'s Profile</span>
      <button onClick={signOut}>Sign Out</button>
      <Link href="/feed">
        <a>Feed</a>
      </Link>
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
    props: {}
  }
}
