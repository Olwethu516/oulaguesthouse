import { useEffect, useState } from 'react';
import { Users, Wifi, ChevronRight, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Room } from '../types';

interface RoomsPageProps {
  onSelectRoom: (room: Room) => void;
}

const typeColors: Record<string, string> = {
  Standard: 'bg-slate-100 text-slate-700',
  Superior: 'bg-blue-50 text-blue-700',
  Deluxe: 'bg-amber-50 text-amber-700',
  Family: 'bg-green-50 text-green-700',
  Suite: 'bg-rose-50 text-rose-700',
};

export default function RoomsPage({ onSelectRoom }: RoomsPageProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');

  const types = ['All', 'Standard', 'Superior', 'Deluxe', 'Family', 'Suite'];

  useEffect(() => {
    supabase
      .from('rooms')
      .select('*')
      .order('number')
      .then(({ data }) => {
        if (data) setRooms(data as Room[]);
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'All' ? rooms : rooms.filter(r => r.type === filter);

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-20">
      {/* Header */}
      <div className="bg-[#1a3a2a] py-16 px-6 text-center">
        <p className="text-[#d4af70] text-xs tracking-[0.4em] uppercase mb-3">Accommodation</p>
        <h1 className="font-serif text-5xl text-white mb-4">Our Rooms</h1>
        <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
          Ten individually styled rooms — from cosy standard rooms to our lavish Presidential Suite.
        </p>
      </div>

      {/* Filter */}
      <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`shrink-0 px-5 py-2 text-xs tracking-wider uppercase font-medium transition-all duration-200 ${
                filter === t
                  ? 'bg-[#1a3a2a] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader size={28} className="animate-spin text-[#1a3a2a]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(room => (
              <div
                key={room.id}
                className="bg-white group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                onClick={() => onSelectRoom(room)}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={room.image_url}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs px-3 py-1 font-medium tracking-wide ${typeColors[room.type] ?? 'bg-gray-100 text-gray-700'}`}>
                      {room.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1">
                    <span className="text-xs text-gray-500">Room</span>
                    <span className="text-sm font-bold text-[#1a3a2a] ml-1">{room.number}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-[#1a3a2a] mb-2">{room.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-gray-400 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Users size={12} />
                      Up to {room.max_guests} guests
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Wifi size={12} />
                      Free WiFi
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-[#1a3a2a]">
                        R{room.price_per_night.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-xs ml-1">/ night</span>
                    </div>
                    <button className="flex items-center gap-1 text-[#1a3a2a] text-sm font-medium hover:gap-2 transition-all duration-200">
                      View & Book <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
