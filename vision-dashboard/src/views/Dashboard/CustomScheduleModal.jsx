import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { X } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import "./custom.css";
import emailjs from "@emailjs/browser";

const CustomScheduleModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Function to handle email input
  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  // Function to add emails from input field (comma-separated)
  const handleAddEmails = () => {
    if (!emailInput.trim()) return;
    const newEmails = emailInput.split(',').map(email => email.trim()).filter(email => email);
    setEmails([...emails, ...newEmails]);
    setEmailInput(''); // Clear input field
  };

  // Function to send emails to multiple recipients
  const handleEmail = async (emailList) => {
    setLoading(true);

    const serviceID = "service_khesrrp";
    const templateID = "template_63tblyc";
    const publicKey = "oJmBKOHVFS2r-wETd";

    try {
        await Promise.all(emailList.map(async (email) => {
            return emailjs.send(serviceID, templateID, {
                from_name: "Founder XYZ",
                to_name: "Investor",
                from_email: email,
                to_email: email,
                message: `Dear ${name}, 

I am pleased to inform you that our meeting has been successfully scheduled. I look forward to discussing our vision, growth plans, and how we can create meaningful value together. 

Meeting Details:
📅 Date: ${date},
📍 Location: Online Link to be given on approval!

Looking forward to our conversation.

Best regards,  
Founder XYZ`
            }, publicKey);
        }));

        alert("Meeting confirmation emails sent successfully!");
        onClose(); // Close modal on success
    } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send meeting confirmation.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0A0A0A] rounded-lg w-full max-w-md mx-4 relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Schedule Meeting</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
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
                  Their emails? (comma-separated)
                </label>
                <input
                  type="text"
                  value={emailInput}
                  onChange={handleEmailInputChange}
                  onBlur={handleAddEmails} // Automatically add emails when clicking away
                  onKeyDown={(e) => e.key === 'Enter' && handleAddEmails()} // Add emails on Enter key press
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email addresses"
                />
                <div className="mt-2 text-sm text-gray-400">
                  {emails.length > 0 && <p>Added emails: {emails.join(', ')}</p>}
                </div>
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
              disabled={!name || emails.length === 0}
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
                onClick={() => handleEmail(emails)}
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
