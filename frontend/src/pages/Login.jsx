import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';

import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        const params = new URLSearchParams(search);
        navigate({
          pathname: params.get('redirect') || '/sites',
          replace: true,
        });
      }
    },
    [login, navigate, search],
  );

  return (
    <div
      className="
        min-h-screen flex items-start justify-center pt-32 px-4
        dark:from-[#0f1419] dark:to-[#0f1419]
      "
    >
      <FormProvider {...methods}>
        <div
          className="
            w-full max-w-md
            bg-white dark:bg-[#111827]
            border border-gray-200 dark:border-gray-800
            rounded-2xl shadow-lg dark:shadow-xl
            p-8
          "
        >
          {/* HEADER */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Welkom terug 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Log in op uw account
            </p>
          </div>

          {/* FORM */}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Error error={error} />

            <LabelInput
              label="Email"
              type="text"
              name="email"
              placeholder="your@email.com"
              validationRules={validationRules.email}
            />

            <LabelInput
              label="Wachtwoord"
              type="password"
              name="password"
              placeholder="••••••••"
              validationRules={validationRules.password}
            />

            <button
              type="submit"
              className="
                mt-4 w-full
                bg-(--primary) hover:bg-(--primary-hover)
                text-white py-2.5 rounded-lg font-medium
                transition disabled:opacity-50
              "
              disabled={loading}
            >
              {loading ? 'Aan het inloggen...' : 'Log in'}
            </button>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}