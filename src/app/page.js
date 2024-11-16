'use client'
import { useState } from 'react';

export default function Home() {
  const [appointments, setAppointments] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      
      const parsedAppointments = lines.map(line => {
        const [date, time, name, phone1, phone2] = line.split('| |').map(item => item.trim());
        return {
          date,
          time,
          name,
          phone: phone1 || phone2 // Use first phone if available, otherwise use second
        };
      });

      setAppointments(parsedAppointments);
    };

    reader.readAsText(file);
  };

  const handleTextAll = () => {
    appointments.forEach(appointment => {
      console.log(`Texting ${appointment.phone}: "Reminder about your appointment on ${appointment.date} at ${appointment.time}"`);
    });
  };

  const handleTextSingle = (appointment) => {
    console.log(`Texting ${appointment.phone}: "Reminder about your appointment on ${appointment.date} at ${appointment.time}"`);
  };

  return (
    <div className="min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold">Appointment Manager</h1>
        
        {/* File Upload */}
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-black file:text-white
              hover:file:bg-gray-800"
          />
        </div>

        {/* Text All Button */}
        {appointments.length > 0 && (
          <button
            onClick={handleTextAll}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Text All Appointments
          </button>
        )}

        {/* Appointments Table */}
        {appointments.length > 0 && (
          <div className="w-full max-w-4xl overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{appointment.date}</td>
                    <td className="border p-2">{appointment.time}</td>
                    <td className="border p-2">{appointment.name}</td>
                    <td className="border p-2">{appointment.phone}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleTextSingle(appointment)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Text
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}