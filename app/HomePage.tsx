'use client';

import { useState } from 'react';
import type { Service } from '@/lib/types';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Results } from '@/components/sections/Results';
import { Reviews } from '@/components/sections/Reviews';
import { Barber } from '@/components/sections/Barber';
import { Contact } from '@/components/sections/Contact';
import Footer from "@/components/sections/Footer"
import { BookingModal } from '@/components/booking/BookingModal';

export default function HomePage({ services }: { services: Service[] }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Navigation onBookClick={() => setBookingOpen(true)} />
      <Hero onBookClick={() => setBookingOpen(true)} />
      <Marquee />
      <Results />
      <Reviews />
      <Barber />
      <Contact />
      <Footer />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        services={services}
      />
    </>
  );
}
