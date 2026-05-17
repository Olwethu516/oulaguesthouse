export interface Room {
  id: string;
  number: number;
  name: string;
  description: string;
  type: string;
  price_per_night: number;
  max_guests: number;
  image_url: string;
  amenities: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  breakfast: boolean;
  special_requests: string;
  total_price: number;
  status: string;
  created_at: string;
}

export interface BookingForm {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  breakfast: boolean;
  special_requests: string;
}
