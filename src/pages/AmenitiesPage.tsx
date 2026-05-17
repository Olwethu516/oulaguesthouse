import {
  Wifi, Shield, Coffee, Car, Utensils, Wind,
  Tv, Lock, Bath, Sparkles, Clock, Phone
} from 'lucide-react';

const amenityGroups = [
  {
    category: 'Connectivity & Safety',
    items: [
      { icon: Wifi, title: 'Free High-Speed WiFi', desc: 'Complimentary fibre WiFi throughout the guesthouse and in every room.' },
      { icon: Shield, title: '24/7 Security', desc: 'Round-the-clock security with CCTV and a secure perimeter.' },
      { icon: Lock, title: 'In-Room Safe', desc: 'Electronic in-room safe in every room to secure your valuables.' },
      { icon: Car, title: 'Free Parking', desc: 'Secure on-site parking available to all guests at no charge.' },
    ],
  },
  {
    category: 'Food & Beverage',
    items: [
      { icon: Coffee, title: 'Optional Breakfast', desc: 'A hearty full breakfast served each morning for R95 per person.' },
      { icon: Utensils, title: 'Guest Kitchen', desc: 'Shared kitchen facilities available for light meal preparation.' },
      { icon: Sparkles, title: 'Tea & Coffee', desc: 'Complimentary tea and coffee facilities in every room.' },
      { icon: Lock, title: 'Mini Fridge', desc: 'Mini refrigerators in select rooms for your convenience.' },
    ],
  },
  {
    category: 'Room Comfort',
    items: [
      { icon: Wind, title: 'Air Conditioning', desc: 'Individual climate control in every room for year-round comfort.' },
      { icon: Tv, title: 'Flat-Screen TV', desc: 'Modern flat-screen television with satellite channels.' },
      { icon: Bath, title: 'En-suite Bathrooms', desc: 'Private en-suite bathrooms with quality toiletries provided.' },
      { icon: Sparkles, title: 'Daily Housekeeping', desc: 'Full daily housekeeping service to keep your room immaculate.' },
    ],
  },
  {
    category: 'Guest Services',
    items: [
      { icon: Clock, title: 'Flexible Check-in', desc: 'Check-in from 14:00. Early check-in subject to availability.' },
      { icon: Phone, title: '24/7 Reception', desc: 'Our friendly team is available around the clock to assist you.' },
      { icon: Car, title: 'Airport Transfers', desc: 'Pre-arranged airport transfers available on request.' },
      { icon: Sparkles, title: 'Laundry Service', desc: 'Laundry and dry-cleaning services available on request.' },
    ],
  },
];

export default function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] pt-20">
      {/* Header */}
      <div className="bg-[#1a3a2a] py-16 px-6 text-center">
        <p className="text-[#d4af70] text-xs tracking-[0.4em] uppercase mb-3">Facilities</p>
        <h1 className="font-serif text-5xl text-white mb-4">Our Amenities</h1>
        <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
          Everything you need for a comfortable, safe, and memorable stay.
        </p>
      </div>

      {/* Hero image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Amenities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a3a2a]/30" />
      </div>

      {/* Amenity groups */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-16">
          {amenityGroups.map(group => (
            <div key={group.category}>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gray-200" />
                <h2 className="text-[#1a3a2a] text-xs tracking-[0.4em] uppercase font-semibold whitespace-nowrap">
                  {group.category}
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.items.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f0f7f2] mb-4">
                      <Icon size={20} className="text-[#1a3a2a]" />
                    </div>
                    <h3 className="font-semibold text-[#1a3a2a] text-sm mb-2">{title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standards */}
      <section className="bg-[#1a3a2a] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#d4af70] text-xs tracking-[0.4em] uppercase mb-3">Our Promise</p>
          <h2 className="font-serif text-4xl text-white mb-6">Clean, Safe & Welcoming</h2>
          <p className="text-white/70 leading-relaxed text-base max-w-2xl mx-auto">
            Every room at Oula Guesthouse is thoroughly cleaned and inspected before each guest arrives.
            We maintain the highest standards of hygiene and safety so that you can relax and enjoy your stay
            with complete peace of mind.
          </p>
        </div>
      </section>
    </div>
  );
}
