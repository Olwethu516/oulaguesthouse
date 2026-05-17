/*
  # Guesthouse Schema

  1. New Tables
    - `rooms`
      - `id` (uuid, primary key)
      - `number` (int, room number 1-10)
      - `name` (text, room name)
      - `description` (text)
      - `type` (text, e.g. Standard, Deluxe, Suite)
      - `price_per_night` (numeric)
      - `max_guests` (int)
      - `image_url` (text)
      - `amenities` (text[], list of amenities)
      - `created_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `room_id` (uuid, FK to rooms)
      - `guest_name` (text)
      - `guest_email` (text)
      - `guest_phone` (text)
      - `check_in` (date)
      - `check_out` (date)
      - `guests` (int)
      - `breakfast` (boolean)
      - `special_requests` (text)
      - `total_price` (numeric)
      - `status` (text, pending/confirmed/cancelled)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public read access for rooms
    - Public insert for bookings (guests booking)
    - Authenticated read for bookings (admin)
*/

CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number int UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  type text NOT NULL DEFAULT 'Standard',
  price_per_night numeric NOT NULL DEFAULT 0,
  max_guests int NOT NULL DEFAULT 2,
  image_url text NOT NULL DEFAULT '',
  amenities text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rooms"
  ON rooms FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES rooms(id),
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL DEFAULT '',
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests int NOT NULL DEFAULT 1,
  breakfast boolean NOT NULL DEFAULT false,
  special_requests text NOT NULL DEFAULT '',
  total_price numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);
