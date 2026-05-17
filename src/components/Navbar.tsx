import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', page: 'home' },
    { label: 'Rooms', page: 'rooms' },
    { label: 'Amenities', page: 'amenities' },
    { label: 'Contact', page: 'contact' },
  ];

  const navBg = scrolled || currentPage !== 'home'
    ? 'bg-[#1a3a2a] shadow-md'
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-start group"
          >
            <span className="text-[#d4af70] font-serif text-xl tracking-[0.15em] font-semibold leading-none">
              OULA
            </span>
            <span className="text-[#a3c4a8] text-[10px] tracking-[0.3em] uppercase leading-none mt-0.5">
              Guesthouse
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-sm tracking-wider uppercase transition-colors duration-200 ${
                  currentPage === link.page
                    ? 'text-[#d4af70]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('rooms')}
              className="ml-2 bg-[#d4af70] text-[#1a3a2a] text-sm tracking-wider uppercase px-5 py-2.5 font-semibold hover:bg-[#c4a060] transition-colors duration-200"
            >
              Book Now
            </button>
          </div>

          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#1a3a2a] border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map(link => (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
                className={`text-left text-sm tracking-wider uppercase ${
                  currentPage === link.page ? 'text-[#d4af70]' : 'text-white/80'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { onNavigate('rooms'); setMobileOpen(false); }}
              className="bg-[#d4af70] text-[#1a3a2a] text-sm tracking-wider uppercase px-5 py-2.5 font-semibold w-full"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
