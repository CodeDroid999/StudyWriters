import { useState } from 'react'
import toast from 'react-hot-toast'
import AuthLayout from 'components/layout/AuthLayout'
import { firebaseConfig } from '../firebase' // Import your Firebase configuration
import Head from 'next/head'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleResetPassword = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseConfig.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            requestType: 'PASSWORD_RESET',
          }),
        }
      )

      if (response.ok) {
        toast.success('Password reset email sent. Please check your inbox.')
      } else {
        const data = await response.json()
        const errorMessage = data.error.message
        console.error('Error occurred:', errorMessage)
        toast.error('An error occurred. Try again')
      }
    } catch (error) {
      console.error('Error occurred:', error.message)
      toast.error('An error occurred.Try again.')
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>
          Airtaska | Get More Done | Post any assignment. Pick the best person. Get it done. | Post your assignment for free Earn money as a tutor
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Airtaska is your one-stop destination for finding the right assignments and talented taskers. Post any assignment, pick the best person, and get it done. Join now to earn money as a tutor or post your assignments for free."
        />
        <meta name="keywords" content="Airtaska, assignments, tutor, earn money, post assignment" />
        <meta name="author" content="Airtaska" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="Airtaska | Get More Done" />
        <meta
          name="og:description"
          property="og:description"
          content="Airtaska is your one-stop destination for finding the right assignments and talented taskers. Post any assignment, pick the best person, and get it done. Join now to earn money as a tutor or post your assignments for free."
        />
        <meta name="og:image" property="og:image" content="public/airtaskalogo.jpeg" />
        <meta name="og:url" property="og:url" content="https://www.QualityUnited Writers.com" />
      </Head>

      <div className="align-center flex flex-col justify-center">
        <div>
          <p className="p-5 text-center">
            We will send you a link to chnage your password. Enter your email.
          </p>
        </div>
        <div className="align-center flex justify-center space-x-2">
          <div className="border p-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              className="rounded bg-blue-400 p-1 text-white"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
