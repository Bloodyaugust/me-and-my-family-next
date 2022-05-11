import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'

const queryClient = new QueryClient();

// Session is being passed to component as well, for cases where pageProps contains a "session" key, like from getServerSideProps
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} session={session} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
