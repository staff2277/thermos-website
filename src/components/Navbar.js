import Link from "next/link";
import ProfileIcon from "./icons/ProfileIcon";
import CartIcon from "./icons/CartIcon";

export default function Navbar() {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" }, // Assuming /(shop) handles this
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 transition-all duration-300 ">
      <div className="max-w-7xl px-10 mx-auto py-1 rounded-4xl flex items-center justify-between py-4 backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="text-outfit-20 tracking-tighter">
          THERMOS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {routes.slice(1).map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-outfit-14 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {route.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4 py">
          <Link
            href="/profile"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <ProfileIcon color="white" size={30} />
          </Link>
          <Link href="/sign-in" className="hover:opacity-80 transition-opacity">
            <span className="text-outfit-14">Sign In</span>
          </Link>
          <div className="w-[0.1px] h-6 bg-white/20 " />
          <button className=" text-white dark:text-black hover:scale-105 cursor-pointer">
            <CartIcon color="white" size={30} />
          </button>
        </div>
      </div>
    </nav>
  );
}
