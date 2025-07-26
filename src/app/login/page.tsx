'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError('Invalid email or password');
        } else {
            router.push('/');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl text-gray-800 font-bold mb-6">Login</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Login
                </button>
            </form>

            <p className="mt-4 text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="/register" className="text-blue-500 hover:underline">Register</a>
            </p>
        </div>
    );
}