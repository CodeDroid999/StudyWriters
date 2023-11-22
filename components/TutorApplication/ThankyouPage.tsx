import React from 'react';
import { useRouter } from 'next/router';

const ThankYouPage = () => {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push('/');
  };

  const handleViewApplication = () => {
    router.push('/'); // Update with the actual route for viewing the application
  };

  return (
    <div className="p-3 bg-white">
      <p className="text-3xl font-bold text-blue-950 mb-4">Thank You for Your Application!</p>
      <p className="text-lg mb-4">
        Your application has been successfully submitted. We appreciate your interest in becoming a tutor.
      </p>

      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-xl bg-green-500 py-2 text-center text-white"
          onClick={handleGoToHome}
        >
          Go to Home Page
        </button>

        <button
          type="button"
          className="flex-1 cursor-pointer rounded-xl bg-blue-500 py-2 text-center text-white"
          onClick={handleViewApplication}
        >
          View Application
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
