import { useEffect } from 'react';
import { useAuth } from '../contexts/auth';

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen w-full dark:bg-[#0f1419] flex items-start justify-center pt-32 px-4">
      <div
        className="
          w-full max-w-md
          bg-white dark:bg-[#111827]
          border border-gray-200 dark:border-gray-800
          rounded-2xl shadow-md dark:shadow-xl
          p-8 text-center
        "
      >
        {isAuthed ? (
          <div className="animate-pulse text-gray-500 dark:text-gray-400">
            Aan het uitloggen...
          </div>
        ) : (
          <>
            <div className="mb-4 text-green-500 text-3xl">✓</div>

            <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Uitgelogd
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Je bent succesvol uitgelogd!
            </p>

            <a
              href="/login"
              className="
                inline-block
                bg-(--primary) hover:bg-(--primary-hover)
                text-white px-5 py-2.5 rounded-lg
                transition
              "
            >
              Opnieuw inloggen
            </a>
          </>
        )}
      </div>
    </div>
  );
}