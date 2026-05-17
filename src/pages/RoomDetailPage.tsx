import { useState } from 'react';
import { ArrowLeft, Users, Check, Wifi, Shield, Coffee } from 'lucide-react';
import type { Room } from '../types';
import BookingModal from '../components/BookingModal';

interface RoomDetailPageProps {
  room: Room;
  onBack: () => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
  'Free WiFi': <Wifi size={14} />,
  'Free High-Speed WiFi': <Wifi size={14} />,
  'Safe': <Shield size={14} />,
  'In-room Safe': <Shield size={14} />,
  'Tea & Coffee': <Coffee size={14} />,
};

export default function RoomDetailPage({ room, onBack }: RoomDetailPageProps) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#1a3a2a] text-sm hover:gap-3 transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Back to Rooms
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="overflow-hidden">
              <img
                src={room.image_url}
                alt={room.name}
                className="w-full h-80 md:h-[480px] object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[room.image_url, room.image_url, room.image_url].map((src, i) => (
                <div key={i} className="overflow-hidden">
                  <img
                    src={src}
                    alt={`${room.name} view ${i + 1}`}
                    className="w-full h-24 object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs tracking-wider uppercase text-[#d4af70] font-medium">
                Room {room.number} &bull; {room.type}
              </span>
            </div>
            <h1 className="font-serif text-4xl text-[#1a3a2a] mb-4">{room.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{room.description}</p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Users size={16} />
                <span>Up to {room.max_guests} guests</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-[#f0f7f2] p-6 mb-8">
              <h3 className="text-xs tracking-[0.3em] uppercase text-[#1a3a2a] font-semibold mb-4">
                Room Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {room.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-[#1a3a2a]">
                      {amenityIcons[amenity] ?? <Check size={14} />}
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="mt-auto border-t border-gray-100 pt-6">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Rate from</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-[#1a3a2a]">
                      R{room.price_per_night.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm mb-1">per night</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Optional breakfast: R95/person/day</p>
                </div>
              </div>
              <button
                onClick={() => setShowBooking(true)}
                className="w-full bg-[#1a3a2a] text-white py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#2a5a3e] transition-colors duration-200"
              >
                Book This Room
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingModal room={room} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
}
