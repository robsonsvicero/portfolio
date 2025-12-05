import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
// ...removido import CSS, migrando para Tailwind

const Schedule = () => {
  return (
    <div className="bg-cream min-h-screen">
      <Header variant="solid" />
      <main className="pt-28">
        <section className="py-24 px-4 md:px-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1UepPFuI5d4XcXPjEIsGh-tU0SbqdD2VhjQEEWKmEkG3Fiqao1LNBjSA84UqBeu4Zd4EwTP0Kb?gv=true"
                title="Agende uma reunião"
                className="w-full rounded-xl shadow-lg bg-white border-0"
                height="920"
                frameBorder="0"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
