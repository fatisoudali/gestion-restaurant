import { NavLink } from '@/components/nav-link';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

interface FrontLayoutProps {
    children: React.ReactNode;
}

export default function FrontLayout({ children }: FrontLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-white text-[#1b1b18] dark:bg-[#1b1b18] dark:text-white">
            <header className="mx-auto my-4 flex w-full max-w-[335px] items-center justify-between text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <h1 className="text-xl">Restuarant</h1>
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <NavLink href={route('home')} name="Accueille" routeName="home" />
                    <NavLink href={route('plates')} name="Nos plats" routeName="plates" />
                    {/*<NavLink href="#contact" name="Contact" routeName="" />*/}
                    <NavLink href={route('contact')} name="Contact" routeName="contact" />
                </nav>

                <div>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-4">{children}</main>
        </div>
    );
}
