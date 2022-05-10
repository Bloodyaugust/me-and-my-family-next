import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'

// Session is being passed to component as well, for cases where pageProps contains a "session" key, like from getServerSideProps
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} session={session} />
    </SessionProvider>
  )
}

export default MyApp
