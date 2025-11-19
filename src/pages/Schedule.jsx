import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import './Schedule.css';

const Schedule = () => {
  return (
    <div className="bg-cream">
      <Header variant="solid" className="dark-bg hover:text-cream" />
      
      <main className="pt-28">
        <section className="schedule">
          <div className="container">
            <div className="schedule-content">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1UepPFuI5d4XcXPjEIsGh-tU0SbqdD2VhjQEEWKmEkG3Fiqao1LNBjSA84UqBeu4Zd4EwTP0Kb?gv=true"
                title="Agende uma reunião"
                className="schedule-iframe"
                width="100%"
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
