import { getSession } from 'next-auth/react'

export default function Feed({ session }) {
  return (
      <span>This is {session.user.email}'s feed!</span>
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
