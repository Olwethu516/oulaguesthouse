import { useState } from 'react';
import { X, Coffee, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Room, BookingForm } from '../types';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
}

const BREAKFAST_PRICE = 95;

export default function BookingModal({ room, onClose }: BookingModalProps) {
  const [form, setForm] = useState<BookingForm>({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in: '',
    check_out: '',
    guests: 1,
    breakfast: false,
    special_requests: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const nights = form.check_in && form.check_out
    ? Math.max(0, Math.round((new Date(form.check_out).getTime() - new Date(form.check_in).getTime()) / 86400000))
    : 0;

  const breakfastTotal = form.breakfast ? BREAKFAST_PRICE * form.guests * nights : 0;
  const total = nights * room.price_per_night + breakfastTotal;

  const today = new Date().toISOString().split('T')[0];

  const set = (field: keyof BookingForm, value: string | number | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) { setErrorMsg('Please select valid check-in and check-out dates.'); return; }
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('bookings').insert({
      room_id: room.id,
      guest_name: form.guest_name,
      guest_email: form.guest_email,
      guest_phone: form.guest_phone,
      check_in: form.check_in,
      check_out: form.check_out,
      guests: form.guests,
      breakfast: form.breakfast,
      special_requests: form.special_requests,
      total_price: total,
      status: 'pending',
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Failed to save booking. Please try again.');
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

    await fetch(`${supabaseUrl}/functions/v1/send-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        guestName: form.guest_name,
        guestEmail: form.guest_email,
        guestPhone: form.guest_phone,
        roomName: room.name,
        roomNumber: room.number,
        checkIn: form.check_in,
        checkOut: form.check_out,
        guests: form.guests,
        breakfast: form.breakfast,
        specialRequests: form.special_requests,
        totalPrice: total,
        nights,
      }),
    }).catch(() => {});

    setStatus('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="sticky top-0 bg-[#1a3a2a] px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-white font-serif text-xl">Book Room {room.number}</h2>
            <p className="text-[#a3c4a8] text-xs mt-0.5">{room.name}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-10 text-center">
            <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#1a3a2a] mb-3">Booking Received!</h3>
            <p className="text-gray-600 leading-relaxed mb-2">
              Thank you, <strong>{form.guest_name}</strong>. Your booking request has been submitted successfully.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              A confirmation has been sent to <strong>{form.guest_email}</strong> and our team at{' '}
              <strong>info@oula.co.za</strong> will confirm within 24 hours.
            </p>
            <div className="bg-[#f0f7f2] rounded p-4 my-6 text-sm text-left space-y-1">
              <p><span className="text-gray-500">Room:</span> <strong>{room.name}</strong></p>
              <p><span className="text-gray-500">Check-in:</span> <strong>{new Date(form.check_in).toLocaleDateString('en-ZA', { dateStyle: 'long' })}</strong></p>
              <p><span className="text-gray-500">Check-out:</span> <strong>{new Date(form.check_out).toLocaleDateString('en-ZA', { dateStyle: 'long' })}</strong></p>
              <p><span className="text-gray-500">Total:</span> <strong>R{total.toLocaleString()}</strong></p>
            </div>
            <button
              onClick={onClose}
              className="bg-[#1a3a2a] text-white px-8 py-3 text-sm tracking-wider uppercase font-medium hover:bg-[#2a5a3e] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Guest info */}
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">Full Name *</label>
              <input
                required
                value={form.guest_name}
                onChange={e => set('guest_name', e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">Email *</label>
                <input
                  required
                  type="email"
                  value={form.guest_email}
                  onChange={e => set('guest_email', e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">Phone *</label>
                <input
                  required
                  type="tel"
                  value={form.guest_phone}
                  onChange={e => set('guest_phone', e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors"
                  placeholder="+27 ..."
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">Check-in *</label>
                <input
                  required
                  type="date"
                  min={today}
                  value={form.check_in}
                  onChange={e => set('check_in', e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">Check-out *</label>
                <input
                  required
                  type="date"
                  min={form.check_in || today}
                  value={form.check_out}
                  onChange={e => set('check_out', e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">
                Number of Guests *
              </label>
              <select
                value={form.guests}
                onChange={e => set('guests', parseInt(e.target.value))}
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors bg-white"
              >
                {Array.from({ length: room.max_guests }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Breakfast */}
            <div
              onClick={() => set('breakfast', !form.breakfast)}
              className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all duration-200 ${
                form.breakfast ? 'border-[#1a3a2a] bg-[#f0f7f2]' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors ${
                form.breakfast ? 'border-[#1a3a2a] bg-[#1a3a2a]' : 'border-gray-300'
              }`}>
                {form.breakfast && <span className="text-white text-xs font-bold">✓</span>}
              </div>
              <div className="flex items-center gap-2">
                <Coffee size={16} className="text-[#d4af70]" />
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Add Breakfast</p>
                  <p className="text-xs text-gray-500">R95 per person per day — Full breakfast served daily</p>
                </div>
              </div>
            </div>

            {/* Special requests */}
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">
                Special Requests
              </label>
              <textarea
                value={form.special_requests}
                onChange={e => set('special_requests', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors resize-none"
                placeholder="Any special requirements or notes..."
              />
            </div>

            {/* Price summary */}
            {nights > 0 && (
              <div className="bg-[#f0f7f2] p-4 space-y-1.5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>R{room.price_per_night.toLocaleString()} &times; {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>R{(room.price_per_night * nights).toLocaleString()}</span>
                </div>
                {form.breakfast && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Breakfast (R{BREAKFAST_PRICE} &times; {form.guests} &times; {nights})</span>
                    <span>R{breakfastTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-[#1a3a2a] pt-2 border-t border-[#d4af70]/30">
                  <span>Total</span>
                  <span>R{total.toLocaleString()}</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#1a3a2a] text-white py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#2a5a3e] transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <><Loader size={16} className="animate-spin" /> Submitting...</>
              ) : (
                'Submit Booking Request'
              )}
            </button>
            <p className="text-center text-xs text-gray-400">
              Your booking will be confirmed within 24 hours via email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
