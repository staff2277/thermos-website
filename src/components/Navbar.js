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
    <nav className="absolute top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl px-10 mx-auto py-2 flex items-center justify-between py-6 backdrop-blur-2xl">
        {/* Logo */}
        <Link
          href="/"
          className="text-outfit-24 font-bold tracking-tighter text-white"
        >
          THERMOS<span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {routes.slice(1).map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-outfit-14 text-white/70 hover:text-accent transition-all duration-300 font-medium"
            >
              {route.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-6">
          <Link
            href="/profile"
            className="text-white hover:text-accent transition-colors"
          >
            <ProfileIcon color="currentColor" size={24} />
          </Link>
          <Link href="/sign-in" className="group">
            <span className="text-outfit-14 font-semibold text-white group-hover:text-accent transition-colors">
              Sign In
            </span>
          </Link>
          <div className="w-[1px] h-4 bg-white/20" />
          <button className="text-white hover:text-accent transition-all duration-300 hover:scale-110 cursor-pointer relative">
            <CartIcon color="currentColor" size={24} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-[10px] text-primary font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
