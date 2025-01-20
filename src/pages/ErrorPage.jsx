import { AlertCircle } from 'lucide-react';
const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-red-500" />
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">Oops!</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 mt-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Error Code */}
        <div className="text-8xl font-bold text-gray-200">404</div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
