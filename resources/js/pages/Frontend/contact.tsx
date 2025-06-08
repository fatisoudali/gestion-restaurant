import FrontLayout from '@/layouts/front/front-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import contact from '@/assets/feat-1.jpg';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Message envoyé !");
    };

    return (
        <>
            <Head title="Nous contacter" />
            <FrontLayout>
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold text-center text-orange-700 mb-4">Nous contacter</h1>
                    <p className="text-center text-gray-700 mb-10">
                        Une question, une réservation ou une demande spéciale ? Contactez-nous dès maintenant !
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Prénom"
                            onChange={handleChange}
                            value={formData.firstName}
                            className="border border-gray-300 p-3 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Nom"
                            onChange={handleChange}
                            value={formData.lastName}
                            className="border border-gray-300 p-3 rounded"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
                            onChange={handleChange}
                            value={formData.email}
                            className="border border-gray-300 p-3 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Numéro de téléphone"
                            onChange={handleChange}
                            value={formData.phone}
                            className="border border-gray-300 p-3 rounded"
                        />
                        <textarea
                            name="message"
                            placeholder="Votre message"
                            rows="4"
                            onChange={handleChange}
                            value={formData.message}
                            className="md:col-span-2 border border-gray-300 p-3 rounded"
                            required
                        />
                        <p className="md:col-span-2 text-sm text-gray-500">
                            En soumettant ce formulaire, vous acceptez nos conditions générales et notre politique de confidentialité.
                        </p>
                        <button
                            type="submit"
                            className="md:col-span-2 bg-orange-600 text-white py-3 rounded hover:bg-orange-700 transition"
                        >
                            Envoyer le message
                        </button>
                    </form>

                    {/* 📍 Infos du restaurant & newsletter */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Adresse du restaurant</h2>
                        <p className="text-gray-700 mb-4">
                            RestoManager Marocain<br />
                            Centre Ville<br />
                            45800 Tinghir, Maroc
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Téléphone</h2>
                        <p className="text-gray-700 mb-4">+212 662 234 564</p>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Newsletter</h2>
                        <p className="text-gray-700 mb-2">Recevez nos menus du jour et offres spéciales.</p>
                        <input
                            type="email"
                            placeholder="Saisissez votre e-mail"
                            className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">
                            S'abonner
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                            Vos informations sont en sécurité. Consultez notre{' '}
                            <a href="#" className="text-orange-600 underline">politique de confidentialité</a>.
                        </p>
                    </div>
                </div>
            </FrontLayout>
        </>
    );
}
