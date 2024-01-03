import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserAuth } from 'context/AuthContext';

const ThankYouPage = () => {
  const router = useRouter();
  const { user } = UserAuth();
  const userId = user?.userId;

  const handleGoToHome = () => {
    router.push('/home');
  };

  return (
    <div className="p-3 bg-white">
      <p className="text-3xl font-bold text-blue-950 mb-4">Thank You for Your Application!</p>
      <p className="text-lg mb-4">
        Your application has been successfully submitted. We appreciate your interest in becoming a tutor.
      </p>

      <div className="row justify-between px-3">
        <div className="col-md-4 bg-green-500 rounded py-2">
          <Link href="/home" className=" text-center text-white w-100">
            Finish
          </Link>
        </div>

        <div className="col-md-4 bg-blue-500  rounded py-2">
          <Link href={`/application-history/${user?.userId}`} className=" text-center text-white w-100">
            View Application history
          </Link>
        </div>
      </div>
    </div >
  );
};

export default ThankYouPage;
