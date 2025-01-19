import { useState } from 'react';

const UploadMaterialCard = ({ session }) => {
  const { sessionImage, title, status, _id } = session;
  const [sessionId, setSessionId] = useState(null);
  const handleUpdateMaterials = (e) => {
    e.preventDefault();
    console.log(sessionId);
  };

  // open session modal
  const openSessionModal = (Id) => {
    
    setSessionId(Id);
    document.getElementById('conform').showModal();
  };
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
        <button
          onClick={() => openSessionModal(_id)}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Upload Material
        </button>
      </div>

      {/* show the conformation modal */}
      <dialog id="conform" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#ff3600]">
            Update the session rejected or approved?
          </h3>
          <div className="flex items-center justify-between border p-2 rounded-xl my-2 ">
            <form onSubmit={handleUpdateMaterials} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-heading">
                    Is this session free or paid ?
                  </span>
                </label>
                <input
                  type="number"
                  name="fee"
                  className="input input-bordered"
                  required
                />
              </div>
              <button className="btn btn-success font-heading text-white">
                Upload
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex justify-between gap-4 items-center"
            >
              <button className="btn btn-error text-white font-heading">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UploadMaterialCard;
