/*import React, { useState } from 'react';
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
*/

import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import food from '@/assets/food-5.jpg';
 // Assurez-vous que cette image existe dans src/assets/

export default function contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contact - Restaurant" />
            <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-100 dark:from-[#1b1b18] dark:to-[#292926] py-16 px-4"
             >
                <div className="max-w-4xl mx-auto bg-white dark:bg-[#1b1b18] shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">

                    {/* Left side with food image */}
                    <div
                        className="bg-cover bg-left h-[500px] md:h-auto"
                        //style={{ backgroundImage: `url(${food})` }}
                    >
                        <div className="h-full w-full bg-black bg-opacity-30 flex items-center justify-center p-6"
                         style={{ backgroundImage: `url(${food})` }}>
                            <h2 className="text-3xl font-bold text-white relative  ">
                                Une question ? <br /> Parlons-en autour d’un bon plat 🍲
                            </h2>
                        </div>
                    </div>

                    {/* Right side with form */}
                    <div className="p-8">
                        <h3 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">Contactez-nous</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                            Remplissez le formulaire ci-dessous et notre équipe vous répondra rapidement.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nom</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    placeholder="Jean Dupont"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    placeholder="exemple@domaine.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
                                <textarea
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    placeholder="Votre message..."
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition duration-200 disabled:opacity-50"
                            >
                                Envoyer 🍽️
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
