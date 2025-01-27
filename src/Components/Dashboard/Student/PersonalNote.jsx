import { FaPencil } from 'react-icons/fa6';
import { LuTrash2 } from 'react-icons/lu';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PersonalNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['notes', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/notes/${user?.email}`);
      return data;
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const updateData = { noteTitle: title, noteDescription: description };

    // update data send to server
    axiosSecure
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}/notes/${updateId}`,
        updateData
      )
      .then((response) => {
        console.log(response.data);
        toast.success('Successfully updated session status.');
        refetch();
        document.getElementById('conform').close();
      })
      .catch((error) => {
        console.log('error to update session', error);
        toast.error('Failed to update session status.');
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to delete this Note?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/notes/${id}`)
          .then((response) => {
            const data = response.data;
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'This session has been deleted.',
                icon: 'success',
              });
              refetch();
            }
          })
          .catch((error) => {
            console.error('Error deleting the note:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the note. Please try again later.',
              icon: 'error',
            });
          });
      }
    });
  };

  // open session modal
  const openSessionModal = (noteId) => {
    const dataToUpdate = notes.filter((data) => data._id === noteId);
    setSelectedSession(dataToUpdate);
    setUpdateId(noteId);
    document.getElementById('conform').showModal();
  };
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 font-heading">
          Manage your Personal Note
        </h1>
        <p className="text-gray-600 font-body">
          A space to organize, edit, and access your thoughts, tasks, or ideas
          seamlessly in one place
        </p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : notes.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No notes available.</p>
        </div>
      ) : (
        // Session cards
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 px-3"
            >
              {/* Header Section */}
              <div className="p-4 space-y-1">
                <h3 className="text-xl font-semibold text-gray-800 font-heading">
                  {note.noteTitle}
                </h3>
                <p className="text-sm font-body text-gray-500">{note.email}</p>
              </div>

              {/* Content Section */}
              <div className="px-4 pb-4">
                <p className="text-gray-700 font-body">
                  {note.noteDescription}
                </p>
              </div>

              {/* Footer Section with Buttons */}
              <div className=" py-3 bg-gray-50 flex justify-end space-x-2 ">
                <button
                  onClick={() => openSessionModal(note._id)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <FaPencil className="h-4 w-4 mr-2" />
                  Update
                </button>

                <button
                  onClick={() => handleDelete(note._id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <LuTrash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* show the conformation modal */}
      <dialog id="conform" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#ff3600]">
            Update the session rejected or approved?
          </h3>
          <div className="flex items-center justify-between border p-2 rounded-xl my-2 ">
            {selectedSession.map((data) => (
              <form
                onSubmit={handleUpdate}
                key={data._id}
                className="card-body"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-heading">Note Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={data.noteTitle}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-heading">
                      Note Description
                    </span>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    defaultValue={data.noteDescription}
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button className="btn btn-success font-heading text-white my-2">
                  Confirm update Note
                </button>
              </form>
            ))}
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

export default PersonalNote;
