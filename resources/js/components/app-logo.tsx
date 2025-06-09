
import logoImg from '@/assets/chef.avif';
export default function AppLogo() {
    return (
        <>
            <div className="flex items-center">
                {/* Logo image */}
                <img src={logoImg} // 📍 Remplace par le chemin correct de ton logo
                    alt="Logo Restaurant"
                    className="h-10 w-10 rounded-full object-cover border border-white shadow-md"
                />
                {/* Nom du projet */}
                <div className="ml-2 text-left text-sm">
                    <span className="block font-bold text-red-700 leading-tight">
                        RestoManager
                    </span>
                    <span className="text-xs text-gray-500">Gestion Restauration</span>
                </div>
            </div>
        </>
    );
}
