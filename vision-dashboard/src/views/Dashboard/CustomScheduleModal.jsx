import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { X } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import "./custom.css"
import emailjs from "@emailjs/browser";


const CustomScheduleModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleScheduleMeeting = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/meetings/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attendee: {
            name,
            email,
          },
          date: date.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule meeting');
      }

      onClose();
      // You can add a success toast here
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      // You can add an error toast here
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async (email) => {
        console.log("Email:", email);
        setLoading(true);
    
        const serviceID = "service_khesrrp";
        const templateID = "template_63tblyc";
        const publicKey = "oJmBKOHVFS2r-wETd";
    
    
        emailjs
          .send(serviceID, templateID, {
            from_name: "Landlord XYZ",
            to_name: 'Tenant',
            from_email: "piyanshugehani@gmail.com",
            to_email: email,
            message: "This is a reminder to submit your monthly property update. Please complete the form at your earliest convenience.",
          },
            publicKey)
          .then((response) => {
            alert("Message sent successfully:", response);
            setSuccess(true);
            setOpen(false); // Close the dialog
            setMessage("");
          })
          .catch((error) => {
            // alert("Error sending message:", error);
            setSuccess(false);
          })
          .finally(() => setLoading(false));
      }
     

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0A0A0A] rounded-lg w-full max-w-md mx-4 relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Schedule Meeting</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Schedule your meeting with?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Their emails?
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="calendar-container">
                <Calendar
                  onChange={setDate}
                  value={date}
                  minDate={new Date()}
                className="custom-calendar"
                />
              </div>
              <p className="text-sm text-gray-400">
                Selected date: {date.toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              disabled={!email || !name}
              className="w-full py-2 px-4 bg-[#009977] hover:bg-[#00AA77] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors"
            >
              Next
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleScheduleMeeting}
                disabled={loading}
                className="flex-1 py-2 px-4 bg-[#00AA77] hover:bg-[#00b890] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors"
              >
                {loading ? 'Scheduling...' : 'Schedule Meeting'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomScheduleModal;