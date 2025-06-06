import { Link, usePage } from '@inertiajs/react';

export const NavLink = ({ href, name, routeName }: { href: string; name: string; routeName: string }) => {
    const currentRoute = route().current();
    const isActive = currentRoute === routeName;

    return (
        <Link
            href={href}
            className={isActive ? 'font-semibold text-orange-600 dark:text-orange-400' : 'transition-colors hover:text-orange-600 dark:hover:text-orange-400'}
        >
            {name}
        </Link>
    );
};
