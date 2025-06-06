import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('contact.send'), {
            onSuccess: () => {
                reset();
                alert('Votre message a été envoyé avec succès.');
            },
        });
    };

    return (
        <>
            <Head title="Contact" />

            <div className="py-12">
                <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Contactez-nous</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-700 dark:text-gray-200">Nom</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Votre nom"
                            />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-gray-700 dark:text-gray-200">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="votre@email.com"
                            />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-gray-700 dark:text-gray-200">Message</label>
                            <textarea
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                rows={4}
                                placeholder="Écrivez votre message ici..."
                            ></textarea>
                            {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            {processing ? 'Envoi...' : 'Envoyer'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
