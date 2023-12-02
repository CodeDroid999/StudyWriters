import AuthLayout from 'components/layout/AuthLayout'

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  sendEmailVerification,
} from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { auth, db } from '../firebase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Head from 'next/head'
import axios from 'axios';
import { updateUser } from 'utils/UpdateUserCreds'


export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(`/setup-profile`)
      }
    })
    return () => unsubscribe()
  }, [router, redirect])

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const userRef = await addDoc(collection(db, 'users'), {
        userId: user.uid,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        profilePicture: '',
        mainRole: '',
        role: '',
        email: user.email,
        aboutDescription: '',
        postalCode: '',
        tag: '',
        city: '',
        skills: [],
        education: [],
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
    }
  }

  const handleSignUp = async (event: any) => {
    event.preventDefault()
    let hasError = false
    if (!email) {
      setEmailError('Email is required')
      hasError = true
    } else if (!email.includes('@')) {
      setEmailError('Email entered is not valid')
      hasError = true
    } else {
      setEmailError('')
    }

    if (!password) {
      setPasswordError('Password is required')
      hasError = true
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      hasError = true
    } else {
      setPasswordError('')
    }

    if (hasError) {
      return
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      const userRef = await addDoc(collection(db, 'users'), {
        userId: user.uid,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        profilePicture: '',
        mainRole: '',
        role: '',
        email: user.email,
        aboutDescription: '',
        postalCode: '',
        tag: '',
        city: '',
        skills: [],
        education: [],
        createdAt: serverTimestamp(),
      })
      // Send verification email
      await sendEmailVerification(user)
      // Display success message to user
      toast.success(
        'Verification email has been sent. Please check your inbox.'
      )
      //send welcome message to user
      // Create user data for the HTTP request
      const userData = {
        userId: user.uid,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        profilePicture: '',
        mainRole: '',
        role: '',
        email: user.email,
        aboutDescription: '',
        postalCode: '',
        tag: '',
        city: '',
        skills: [],
        education: [],
        createdAt: serverTimestamp(),
      };

      // Make the HTTP request to the api/welcomeuser route
      await axios.post('/api/welcomeuser', userData);
    
    
      

    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/email-already-in-use') {
        toast.error('User already exists. Please log in.')
      } else {
        toast.error('Error occurred:', errorMessage)
      }
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>
          QualityUnitedWriters - Your Academic Research and Project Partner
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
        <meta name="author" content="QualityUnitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
        <meta
          name="og:description"
          property="og:description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="og:image" property="og:image" content="public/QualityUnitedWritersLogo.png" />
        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>
      <div>
        <p className="mb-10 text-center text-2xl font-medium text-green-950">
          Sign Up to Airtaska
        </p>
      </div>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-gray-700">
            Email
          </label>

          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={`h-full w-full rounded-lg border bg-gray-50 p-2
                  outline-none focus:border-blue-500`}
          />
          {emailError && <span className="text-red-500">{emailError}</span>}
        </div>

        <div className="relative flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-gray-700">
            Password
          </label>

          <div className="flex items-center">
            <input
              placeholder="Password"
              type={passwordVisible ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              className="h-full w-full rounded-lg border bg-gray-50 p-2
                  outline-none focus:border-blue-500 "
            />
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              className="absolute right-2 "
            >
              {passwordVisible ? (
                <BsEyeFill size={18} />
              ) : (
                <BsEyeSlashFill size={18} />
              )}
            </button>
          </div>
          {passwordError && (
            <span className="text-red-500">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-green-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Sign Up
        </button>

        <div className="flex flex-row space-x-3 text-base font-normal">
          <p className="pt-1 pb-2 text-lg">Already have an account?</p>
          <p className="font-medium text-blue-700">
            <Link href="/login">Log in</Link>
          </p>
        </div>
        <div className="text-center text-xs font-medium text-gray-700">OR</div>
        <button
          type="button"
          className="flex flex-row items-center justify-center rounded-2xl border border-gray-400 bg-white px-8 py-2 text-lg font-medium text-green-950 hover:bg-blue-100"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2" size={20} />
          Continue with Google
        </button>
      </form>
    </AuthLayout>
  )
}
function updateUserId(uid: string) {
  throw new Error('Function not implemented.')
}

