import HomeImage from '@/assets/home-hero.jpg';
import FrontLayout from '@/layouts/front/front-layout';
import { Head, Link } from '@inertiajs/react';
import Feat1 from '@/assets/feat-1.jpg';
import Feat2 from '@/assets/feat-2.jpg';
import Feat3 from '@/assets/feat-3.jpg';
import Feat4 from '@/assets/feat-4.jpg';

export default function Home() {
    return (
        <>
            <Head title="Home"></Head>

            <FrontLayout>
                <div className="relative overflow-hidden">
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
                                Commande express <br /> <span className="text-orange-600">Rapide, simple, savoureux</span>
                            </h1>
                            <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">Votre restaurant préféré, livré chez vous.</p>
                        </div>

                        <div className="relative mx-auto mt-10 max-w-5xl">
                            <div
                                className="h-96 w-full rounded-xl bg-cover bg-center bg-no-repeat object-cover sm:h-120"
                                style={{ backgroundImage: `url(${HomeImage})` }}
                            ></div>

                            <div className="absolute inset-0 size-full">
                                <div className="flex size-full flex-col items-center justify-center">
                                    <Link
                                        className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        href={route('plates')}
                                    >
                                        Voir nos plats
                                        <svg
                                            className="h-6 w-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 12H5m14 0-4 4m4-4-4-4"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="absolute -start-20 bottom-12 -z-1 size-48 rounded-lg bg-linear-to-b from-orange-500 to-white p-px dark:to-neutral-900">
                                <div className="size-48 rounded-lg bg-white dark:bg-neutral-900"></div>
                            </div>

                            <div className="absolute -end-20 -top-12 -z-1 size-48 rounded-full bg-linear-to-t from-orange-600 to-cyan-400 p-px">
                                <div className="size-48 rounded-full bg-white dark:bg-neutral-900"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-[85rem] px-4 py6 sm:px-6 lg:px-8 lg:py-8">
                    <div className="mx-auto mb-8 max-w-2xl text-center lg:mb-14">
                        <h2 className="text-3xl font-bold text-gray-800 lg:text-4xl">Découvrez nos services</h2>
                        <p className="mt-3 text-gray-800">Un restaurant moderne qui allie saveurs, confort et rapidité.</p>
                    </div>

                    <div className="mx-auto grid max-w-3xl grid-cols-3 gap-6 lg:gap-8">
                        <div className="text-center">
                            <svg
                                className="mx-auto size-7 shrink-0 text-orange-800 md:size-9"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    d="M21 11.0001c0-.8815-.3799-1.6731-.984-2.22145.5031-1.33846.2177-2.97144-.9813-3.94213-1.059-.8574-2.4761-.97568-3.6271-.42051-.2908-.39083-.6632-.70423-1.0895-.93179-.8229-.43923-1.8026-.53949-2.7413-.35637-1.2172.23745-2.18257 1.03558-2.68037 2.07405-.08983-.05265-.18224-.10165-.27714-.14661-.86027-.40752-1.89128-.46242-2.91449.05292-1.40603.70815-2.13029 2.35257-1.84394 3.8504-.16121.14468-.30525.31046-.42787.49818C3.13246 9.91685 3 10.4482 3 11.0001c0 .5506.445.9972.99497.9999H20.005c.55-.0027.995-.4493.995-.9999Zm-6.8905-.7654c-.2294-.50238-.8227-.72362-1.325-.49417-.5024.22945-1.0956.00821-1.3251-.49415-.2294-.50237-.0082-1.09562.4942-1.32507 1.5071-.68836 3.2868-.02463 3.9752 1.48247.2294.50236.0082 1.09562-.4942 1.32502-.5024.2295-1.0956.0083-1.3251-.4941Z"
                                    clip-rule="evenodd"
                                />
                                <path
                                    fill="currentColor"
                                    d="M20.3593 15.2241c.2828-.5949-.195-1.2241-.8537-1.2241H4.49439c-.6587 0-1.1365.6292-.85371 1.2241.85327 1.7951 2.4178 3.2323 4.33593 4.0722V20c0 .5523.44772 1 1 1h6.04679c.5523 0 1-.4477 1-1v-.7037c1.9181-.8399 3.4827-2.2771 4.3359-4.0722Z"
                                />
                            </svg>
                            <div className="mt-2 sm:mt-6">
                                <h3 className="font-semibold text-gray-800 sm:text-lg">Plats savoureux</h3>
                            </div>
                        </div>

                        <div className="text-center">
                            <svg
                                className="mx-auto size-7 shrink-0 text-orange-800 md:size-9"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 7h-9" />
                                <path d="M14 17H5" />
                                <circle cx="17" cy="17" r="3" />
                                <circle cx="7" cy="7" r="3" />
                            </svg>
                            <div className="mt-2 sm:mt-6">
                                <h3 className="font-semibold text-gray-800 sm:text-lg">Personnalisable</h3>
                            </div>
                        </div>

                        <div className="text-center">
                            <svg
                                className="mx-auto size-7 shrink-0 text-orange-800 md:size-9"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <div className="mt-2 sm:mt-6">
                                <h3 className="font-semibold text-gray-800 sm:text-lg">Service rapide</h3>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-2 items-center gap-2 sm:mt-20 sm:gap-6 md:grid-cols-4 lg:gap-8">
                        <div className="h-32 w-full">
                            <img
                                className="size-full rounded-xl object-cover object-center"
                                src={Feat1}
                                alt="Features Image"
                            />
                        </div>

                        <div className="h-32 w-full">
                            <img
                                className="size-full rounded-xl object-cover object-center"
                                src={Feat2}
                                alt="Features Image"
                            />
                        </div>

                        <div className="h-32 w-full">
                            <img
                                className="size-full rounded-xl object-cover object-center"
                                src={Feat3}
                                alt="Features Image"
                            />
                        </div>

                        <div className="h-32 w-full">
                            <img
                                className="size-full rounded-xl object-cover object-center"
                                src={Feat4}
                                alt="Features Image"
                            />
                        </div>
                    </div>
                </div>
            </FrontLayout>
        </>
    );
}
