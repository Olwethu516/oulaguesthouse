import { ChevronDown, Wifi, Shield, Coffee, Star, Users, Clock } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const highlights = [
  { icon: Wifi, title: 'Free WiFi', desc: 'High-speed internet throughout' },
  { icon: Shield, title: 'Safe & Secure', desc: '24/7 security & in-room safes' },
  { icon: Coffee, title: 'Breakfast', desc: 'Optional full breakfast daily' },
  { icon: Star, title: '10 Unique Rooms', desc: 'Standard to Presidential Suite' },
  { icon: Users, title: 'Warm Hospitality', desc: 'Personal, attentive service' },
  { icon: Clock, title: 'Flexible Check-in', desc: 'Arrivals from 2pm onwards' },
];

const galleryImages = [
  'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-[#d4af70] text-xs tracking-[0.4em] uppercase mb-4">
            Welcome to
          </p>
          <h1 className="font-serif text-6xl md:text-8xl text-white tracking-wider mb-4">
            OULA
          </h1>
          <p className="text-white/70 text-base tracking-[0.25em] uppercase mb-8">
            Guesthouse &bull; South Africa
          </p>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-light">
            Ten beautifully appointed rooms, genuine hospitality,<br className="hidden md:block" />
            and every comfort you need to feel truly at home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('rooms')}
              className="bg-[#d4af70] text-[#1a3a2a] px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#c4a060] transition-colors duration-200"
            >
              View Rooms & Book
            </button>
            <button
              onClick={() => onNavigate('amenities')}
              className="border border-white/50 text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              Our Amenities
            </button>
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* Intro strip */}
      <section className="bg-[#1a3a2a] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-2 text-center">
          {['Check-in from 14:00', 'Check-out by 11:00', '10 Rooms Available', 'Breakfast Optional', 'Free Parking'].map(item => (
            <span key={item} className="text-[#a3c4a8] text-xs tracking-[0.2em] uppercase">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#d4af70] text-xs tracking-[0.4em] uppercase mb-3">Why Stay With Us</p>
            <h2 className="font-serif text-4xl text-[#1a3a2a]">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#f0f7f2] rounded-full mb-4 group-hover:bg-[#1a3a2a] transition-colors duration-300">
                  <Icon size={22} className="text-[#1a3a2a] group-hover:text-[#d4af70] transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#1a3a2a] mb-1">{title}</h3>
                <p className="text-[#6b7280] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#d4af70] text-xs tracking-[0.4em] uppercase mb-3">Photo Gallery</p>
            <h2 className="font-serif text-4xl text-[#1a3a2a]">Life at Oula</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${
                    i === 0 ? 'h-64 md:h-full' : 'h-48 md:h-52'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#1a3a2a]/85" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-[#d4af70] text-xs tracking-[0.4em] uppercase mb-3">Reserve Your Stay</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Ready to Experience Oula?
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Browse our 10 rooms and send a booking request. We'll confirm your reservation within 24 hours.
          </p>
          <button
            onClick={() => onNavigate('rooms')}
            className="bg-[#d4af70] text-[#1a3a2a] px-10 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#c4a060] transition-colors duration-200"
          >
            Browse Rooms
          </button>
        </div>
      </section>
    </div>
  );
}
