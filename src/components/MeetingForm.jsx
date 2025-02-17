import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.baseURL = baseURL;

const MeetingForm = () => {
  const [stage, setStage] = useState(1);
  const [userEmail, setUserEmail] = useState('');
  const [meetingName, setMeetingName] = useState('');
  const [meetingTime, setMeetingTime] = useState(''); // Time
  const [meetLink, setMeetLink] = useState('');
  const [message, setMessage] = useState('');

  const nextStage = () => {
    setStage(stage + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/meetings', {
        userEmail,
        meetingName,
        meetingTime
      });

      setMessage(`Meeting scheduled successfully!  Meet Link: ${response.data.meetLink}`);
      setMeetLink(response.data.meetLink); //Save the link
      setTimeout(() => {
        setUserEmail('');
        setMeetingName('');
        setMeetingTime('');
        setStage(1);
        setMessage('');
        setMeetLink('');
      }, 5000);
    } catch (error) {
      setMessage('Failed to schedule meeting');
      console.error("Submission error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const goToStage1 = () => {
    setStage(1);
    setUserEmail('');
    setMeetingName('');
    setMeetingTime('');
    setMeetLink('');
    setMessage('');
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-sm">
        <div className=" p-8">
          <div className="text-center mb-4">
            <button onClick={goToStage1} className="text-2xl text-white azeret-mono cursor-pointer">summaree</button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded text-center ${
              message.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {stage === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="userEmail" className="block text-sm font-medium text-white/60 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-400/45 focus:outline-none text-white"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-700 text-white py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={nextStage}
                  disabled={!userEmail}
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {stage === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="meetingName" className="block text-sm font-medium text-white/60 mb-1">
                    Meeting Name
                  </label>
                  <input
                    type="text"
                    id="meetingName"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-400/45 focus:outline-none text-white"
                    value={meetingName}
                    onChange={(e) => setMeetingName(e.target.value)}
                    placeholder="Enter meeting name"
                    required
                  />
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-700 text-white py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={nextStage}
                  disabled={!meetingName}
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {stage === 3 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="meetingTime" className="block text-sm font-medium text-white/60 mb-1">
                    Meeting Time
                  </label>
                  <input
                    type="datetime-local"
                    id="meetingTime"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-400/45 focus:outline-none text-white"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-700 text-white py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!meetingTime}
                >
                  Schedule Meeting
                </button>
              </div>
            )}

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                </div>
                <div className="relative flex justify-center text-sm">

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeetingForm;