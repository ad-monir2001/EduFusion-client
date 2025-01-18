import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { imageUpload } from '../../../utils/utils';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const CreateStudySession = () => {
  const { user } = useAuth();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const axiosSecure = useAxiosSecure();

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

    console.table(sessionData);

    try {
      await axiosSecure.post('/session', sessionData);
      toast.success('Data Added Successfully!');
    } catch (error) {
      console.log('error from add new session', error.message);
    }
  };
  return (
    <div>
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
                    placeholder="Describe the session..."
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff3600] focus:border-transparent"
                  />
                </div>

                {/* Dates */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Session Start Date
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
                    Session End Date
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
                    Session Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-[#ff3600] mb-2">
                    Session End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
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
                    placeholder="0 hours and 0 minutes"
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
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Submit Button  */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#ff3600] text-white rounded-lg hover:bg-[#e63100] transition-colors duration-200 text-lg font-medium"
                >
                  Create Study Session
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
