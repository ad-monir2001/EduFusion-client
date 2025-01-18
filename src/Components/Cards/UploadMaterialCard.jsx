const UploadMaterialCard = ({ session }) => {

  const { sessionImage, title, status } = session;
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={sessionImage}
        alt="Course Thumbnail"
      />
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded">
            {status}
          </span>
        </div>
        <h3 className="text-gray-800 font-bold text-xl">{title}</h3>
        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Upload Material
        </button>
      </div>
    </div>
  );
};

export default UploadMaterialCard;
