import React, { useEffect, useState, createContext, useContext } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import Image from 'next/image';
import HeroBackground from "public/svg/Ripple-1.2s-228px.svg"
type User = {
  firstName?: string;
  lastName?: string;
  city?: string;
  address?: string;
  country?: string;
  state?: string;
  startDate?: string;
  endDate?: string;
  lastSchoolName?: string;
  howHeard?: string;
  major?: string;
  isSchoolTeacher?: string;
  hasAffiliation?: string;
  jobTitle?: string;
  employer?: string;
  role?: string;
  userId?: string;
  profilePicture?: string;
  dateOfBirth?: string;
};


interface AuthContextType {
  user: User | null;
  userRole: string | null;
  logOut: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  logOut: () => { },
  loading: false,
  error: null,
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        const q = query(
          collection(db, 'users'),
          where('userId', '==', currentUser.uid)
        );

        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const userData = doc.data() as User;
            setUser(userData);
            setUserRole(userData.role); // Assuming 'role' is a field in your user data
            setError(null);
          } else {
            console.error('User not found.');
            setError('User not found.');
          }

          setLoading(false);
        });
      } else {
        setUser(null);
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      // Add the unsubscribe for unsubscribeSnapshot here
      // Example: unsubscribeSnapshot();
    };
  }, []);

  if (loading) {
    return (
      <div className="relative h-[100vh] w-100 flex justify-center align-center items-center">
        <div className="">
          <Image
            src={HeroBackground}
            alt="Background"
           width="200"
           height="200"
          />
        </div>
      </div>

    );
  }

  if (error) {
    // You can render an error message here
    return <div>Error: {error}</div>;
  }

  return (
    <AuthContext.Provider value={{ user, userRole, logOut, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
