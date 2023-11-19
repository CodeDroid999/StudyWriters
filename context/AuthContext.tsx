import React, { useEffect, useState, createContext, useContext } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'

interface AuthContextType {
  user: any | null
  logOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logOut: () => {},
})

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState(null)

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const q = query(
          collection(db, 'users'),
          where('userId', '==', currentUser.uid)
        )
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]
            const userData = doc.data()
            setUser(userData)
          } else {
            console.log('User not found.')
          }
        })
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
export default AuthContext
