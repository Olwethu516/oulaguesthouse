import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import AmenitiesPage from './pages/AmenitiesPage';
import ContactPage from './pages/ContactPage';
import type { Room } from './types';

type Page = 'home' | 'rooms' | 'amenities' | 'contact';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const navigate = (target: string) => {
    setSelectedRoom(null);
    setPage(target as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToRooms = () => {
    setSelectedRoom(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} currentPage={page} />

      <main className="flex-1">
        {selectedRoom ? (
          <RoomDetailPage room={selectedRoom} onBack={handleBackToRooms} />
        ) : page === 'home' ? (
          <HomePage onNavigate={navigate} />
        ) : page === 'rooms' ? (
          <RoomsPage onSelectRoom={handleSelectRoom} />
        ) : page === 'amenities' ? (
          <AmenitiesPage />
        ) : (
          <ContactPage />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
