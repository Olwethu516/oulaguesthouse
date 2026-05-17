import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0f2218] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-6">
              <span className="text-[#d4af70] font-serif text-2xl tracking-[0.15em] font-semibold block leading-none">
                OULA
              </span>
              <span className="text-[#a3c4a8] text-xs tracking-[0.3em] uppercase leading-none">
                Guesthouse
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              A warm, welcoming home away from home. Experience comfort, charm, and genuine South African hospitality.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/40 hover:text-[#d4af70] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-[#d4af70] transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#d4af70] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Our Rooms', page: 'rooms' },
                { label: 'Amenities', page: 'amenities' },
                { label: 'Contact Us', page: 'contact' },
              ].map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#d4af70] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[#d4af70] mt-0.5 shrink-0" />
                <a href="mailto:info@oula.co.za" className="text-white/60 text-sm hover:text-white transition-colors">
                  info@oula.co.za
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-[#d4af70] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">+27 (0) 12 345 6789</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#d4af70] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">
                  12 Acacia Avenue<br />Johannesburg, South Africa
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Oula Guesthouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
