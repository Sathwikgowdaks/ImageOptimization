'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('/api/auth/register', {
                name,
                email,
                password,
            });

            setSuccess('Registration successful!');
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl text-gray-800 font-bold mb-6">Register</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Register
                </button>
            </form>

            <p className="mt-4 text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 hover:underline">Login</a>
            </p>
        </div>
    );
}