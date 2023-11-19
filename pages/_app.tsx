import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { lazy, useEffect } from 'react'
import { AuthContextProvider } from 'context/AuthContext'
import { Toaster } from 'react-hot-toast'

import '../styles/custom.css'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps

  useEffect(() => {
    import('preline')
  }, [])
  return (
    <>
      <AuthContextProvider>
        <Toaster position="bottom-center" />
        {draftMode ? (
          <PreviewProvider token={token}>
            <Component {...pageProps} />
          </PreviewProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthContextProvider>
    </>
  )
}
