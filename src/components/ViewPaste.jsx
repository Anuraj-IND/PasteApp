import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

const ViewPaste = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find(p => p._id === id);

  if (!paste) {
    return <div className="text-center text-gray-500 mt-8">Paste not found</div>;
  }

  const handleDelete = () => {
    dispatch(removeFromPastes(paste._id));
    toast.success("Paste deleted successfully");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex flex-col bg-white/10 rounded-2xl shadow-md p-5 mb-4 border border-gray-100 relative"
        style={{ backdropFilter: "blur(2px)" }}>
        <div className="absolute top-3 right-3 flex gap-2">
          <Link to={`/?pasteId=${paste._id}`} className="p-1 rounded-full hover:bg-blue-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 1 1 2.828 2.828L11.828 15.828a2 2 0 0 1-1.414.586H7v-3a2 2 0 0 1 .586-1.414z" strokeWidth="2" stroke="currentColor" fill="none"/>
            </svg>
          </Link>
          <span
            title="Delete"
            className="p-1 rounded-full hover:bg-red-100 cursor-pointer"
            onClick={handleDelete}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" stroke="currentColor"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" stroke="currentColor"/>
            </svg>
          </span>
        </div>

        <div className="mb-4">
          <h1 className="font-semibold text-2xl text-gray-100 drop-shadow mb-2">{paste.title}</h1>
          <p className="text-sm text-gray-400">Created on {formatDate(paste.createdAt)}</p>
        </div>

        <div className="whitespace-pre-wrap text-[#FFF8E1] drop-shadow mb-6 bg-black/20 p-4 rounded-lg">
          {paste.content}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            title="Copy"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Copied successfully");
            }}
          >   
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
              <rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
            </svg>
          </button>
          <button
            title="Share"
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => {
              const text = `${paste.title}\n\n${paste.content}`;
              const mailUrl = `mailto:?subject=${encodeURIComponent(paste.title)}&body=${encodeURIComponent(paste.content)}`;
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
              if (navigator.share) {
                navigator.share({
                  title: paste.title,
                  text: paste.content,
                });
              } else {
                window.open(mailUrl, "_blank");
                window.open(whatsappUrl, "_blank");
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 8a3 3 0 1 0-6 0v1H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-2V8z" strokeWidth="2" stroke="currentColor" fill="none"/>
              <path d="M12 12v4" strokeWidth="2" stroke="currentColor" fill="none"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste