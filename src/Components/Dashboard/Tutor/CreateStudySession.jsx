import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { imageUpload } from '../../../utils/utils';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const CreateStudySession = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [difference, setDifference] = useState('');
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const calculateDifference = () => {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      const startInMinutes = startHours * 60 + startMinutes;
      const endInMinutes = endHours * 60 + endMinutes;

      const diffInMinutes = endInMinutes - startInMinutes;

      if (diffInMinutes >= 0) {
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        setDifference(`${hours} hours and ${minutes} minutes`);
      } else {
        setDifference('End time must be after start time.');
      }
    };
    calculateDifference();
  }, [endTime, startTime]);

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const name = form.name.value;
    const email = form.email.value;
    const description = form.description.value;
    const sessionStartDate = format(new Date(selectedStartDate), 'dd/MM/yyyy');
    const sessionEndDate = format(new Date(selectedEndDate), 'dd/MM/yyyy');
    const startTime = form.startTime.value;
    const endTime = form.endTime.value;
    const duration = form.duration.value;
    const fee = form.fee.value;
    const status = form.status.value;
    const image = form.image.files[0];

    // give image data to image bb
    const sessionImage = await imageUpload(image);
    const sessionData = {
      title,
      name,
      email,
      description,
      sessionStartDate,
      sessionEndDate,
      startTime,
      endTime,
      duration,
      fee,
      status,
      sessionImage,
    };

    try {
      setLoading(true);
      await axiosSecure.post('/session', sessionData);
      toast.success('Your session created Successfully!');
      navigate('/dashboard/view-study-session');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create session');
      console.error('Error creating session:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard | Create Study Session</title>
      </Helmet>
      {/* heading */}
      <div className="text-center">
        <h1 className="font-heading font-semibold text-2xl">
          Learn, Collaborate, Achieve Together
        </h1>
        <p className="font-body text-lg">
          Empowering Minds, One Study Session at a Time
        </p>
      </div>
      <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="px-4 py-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
              Create Study Session
            </h2>

            <form onSubmit={handleCreateSession} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                {/* Session Title  */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Session Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Session Title..."
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff3600] focus:border-transparent"
                  />
                </div>

                {/* Tutor Details */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Tutor Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    readOnly
                    value={user.displayName}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Tutor Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    value={user.email}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100"
                  />
                </div>

                {/* Session Description  */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Session Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    placeholder="Describe the session..."
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff3600] focus:border-transparent"
                  />
                </div>

                {/* Dates */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Registration Start Date
                  </label>
                  <DatePicker
                    selected={selectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                    placeholderText="Select start date"
                    minDate={new Date()}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Registration End Date
                  </label>
                  <DatePicker
                    selected={selectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                    placeholderText="Select end date"
                    minDate={selectedStartDate || new Date()}
                  />
                </div>

                {/* Times  */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Class Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Class End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Session Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={difference}
                    readOnly
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100"
                  />
                </div>

                {/* Registration Details */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Registration Fee
                  </label>
                  <input
                    type="number"
                    name="fee"
                    readOnly
                    defaultValue={0}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                  />
                </div>

                {/* Status */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Status
                  </label>
                  <input
                    type="text"
                    name="status"
                    readOnly
                    defaultValue="pending"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100"
                  />
                </div>

                {/* Session Image */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Session Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    required
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Submit Button  */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-8 py-3 bg-[#ff3600] text-white rounded-lg transition-colors duration-200 text-lg font-medium ${
                    loading
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:bg-[#e63100]'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating Session...
                    </span>
                  ) : (
                    'Create Study Session'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudySession;
