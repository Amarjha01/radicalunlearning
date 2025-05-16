import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../common/apis/ServerBaseURL";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SchedulePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  console.log(sessionId);
  
  const [scheduledAt, setScheduledAt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  console.log('scheduledAt', scheduledAt);
  
  // Available time slots
  const availableTimeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00"
  ];

  useEffect(() => {
    if (selectedDate && selectedTime) {
      // Format date and time to ISO string
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateTimeString = `${year}-${month}-${day}T${selectedTime}:00`;
      setScheduledAt(dateTimeString);
    }
  }, [selectedDate, selectedTime]);

  
    const finalizeSession = async () => {
      if (!scheduledAt) return;
      
      setIsLoading(true);
      setMessage({ text: "", type: "" });
      
      try {
        const response = await axios.post(API.finalizesession.url, {
          sessionId,
          scheduledAt,
        });

        console.log("Session finalized:", response);
        if(response.status === 200){
          setIsLoading(false);
          navigate('/dashboard/learner');
        }
        
      } catch (error) {
        console.error("Error finalizing session:", error);
        setIsLoading(false);
        setMessage({ 
          text: "There was an error scheduling your session. Please try again.", 
          type: "error" 
        });
      }
    };
  

  // Helper functions for calendar
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  // Date formatter
  const formatDate = (date) => {
    if (!date) return "";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Month formatter
  const formatMonth = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Day formatter
  const formatDay = (date) => {
    const options = { weekday: 'short' };
    return date.toLocaleDateString(undefined, options);
  };

  // Check if date is today
  const isToday = (year, month, day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (year, month, day) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  // Handle date selection
  const handleDateSelect = (year, month, day) => {
    setSelectedDate(new Date(year, month, day));
    setSelectedTime(null); // Reset time when date changes
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Generate calendar days
  const renderCalendar = () => {
    const monthDays = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      monthDays.push(
        <div key={`empty-${i}`} className="h-12 border-0"></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(year, month, day);
      const isSelectedDay = isSelected(year, month, day);
      
      monthDays.push(
        <div 
          key={day} 
          onClick={() => handleDateSelect(year, month, day)}
          className={`
            h-12 flex items-center justify-center cursor-pointer rounded-lg transition-all
            ${isSelectedDay 
              ? 'bg-blue-600 text-white font-bold shadow-md' 
              : 'hover:bg-blue-50'}
            ${isCurrentDay && !isSelectedDay 
              ? 'border-2 border-blue-400 font-medium' 
              : ''}
          `}
        >
          {day}
        </div>
      );
    }

    return monthDays;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setMessage({ text: "Please select both date and time", type: "error" });
      return;
    }
    finalizeSession()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <h1 className="text-2xl md:text-3xl font-bold">Finalize Your Session</h1>
          <p className="mt-2 opacity-90">Select a date and time that works for you</p>
        </div>

        {/* Session ID display */}
        {sessionId && (
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-3">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Session ID:</span> {sessionId}
            </p>
          </div>
        )}

        {/* Calendar section */}
        <div className="p-6">
          {/* Month and navigation */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {formatMonth(currentMonth)}
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={goToToday}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              >
                Today
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>

          {/* Time slot selection */}
          {selectedDate && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Available time slots for {formatDate(selectedDate)}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableTimeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className={`
                      py-3 px-4 rounded-lg text-center transition-all
                      ${selectedTime === time 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Status messages */}
          {message.text && (
            <div className={`mt-6 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {/* Submit button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedTime || isLoading}
              className={`
                w-full py-3 px-6 rounded-lg text-white font-medium transition-all
                ${(!selectedDate || !selectedTime || isLoading)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'}
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Schedule Session'
              )}
            </button>
          </div>

          {/* Selected date/time display */}
          {selectedDate && selectedTime && (
            <div className="mt-4 text-center text-sm text-gray-600">
              You selected: <span className="font-medium">{formatDate(selectedDate)} at {selectedTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;