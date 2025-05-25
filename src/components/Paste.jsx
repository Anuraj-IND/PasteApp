import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'; // Adjust the path as needed
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useDispatch();

  // Example filter logic (if needed)
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId)); // Uncomment and import removeFromPastes if needed
  };
  const handleEdit = (pasteId) => {
    // Navigate to edit page or set state for editing
    // This is a placeholder function, implement your own logic
    console.log(`Edit paste with ID: ${pasteId}`);
  };

  return (
    <div>
      <input
        className="min-w-[600px] mt-5 rounded-2xl p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
        type="search"
        placeholder="Search your notes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4">
        {filteredData.length === 0 ? (
          <div className="text-gray-500 text-center">No notes found.</div>
        ) : (
          filteredData.map((paste) => (
            <div
              key={paste.id}
              className="flex flex-col bg-white/10 rounded-2xl shadow-md p-5 mb-4 border border-gray-100 relative"
              style={{ backdropFilter: "blur(2px)" }}
            >
              <div className="absolute top-3 right-3 flex gap-2">
                <span
                  title="View"
                  className="p-1 rounded-full hover:bg-green-100 cursor-pointer"
                >
                  {/* View Eye Icon */}
                  <Link to={`/pastes/${paste._id}`} className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z" strokeWidth="2" stroke="currentColor" fill="none"/>
                      <circle cx="12" cy="12" r="3" strokeWidth="2" stroke="currentColor" fill="none"/>
                    </svg>
                  </Link>
                </span>
                <span
                  title="Edit"
                  className="p-1 rounded-full hover:bg-blue-100 cursor-default"
                  // onClick={() => {
                  //   handleEdit(paste.id);
                  //   toast.success("Edited successfully");
                  // }}
                >
                  <Link to={`/?pasteId=${paste._id}`} className="flex items-center justify-center">
                  {/* Pencil Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 1 1 2.828 2.828L11.828 15.828a2 2 0 0 1-1.414.586H7v-3a2 2 0 0 1 .586-1.414z" strokeWidth="2" stroke="currentColor" fill="none"/>
                  </svg>
                  </Link>
                </span>
                <span
                  title="Delete"
                  className="p-1 rounded-full hover:bg-red-100 cursor-pointer"
                  onClick={() => handleDelete(paste.id)}
                >
                  {/* X Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" stroke="currentColor"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" stroke="currentColor"/>
                  </svg>
                </span>
              </div>
              <span className="font-semibold text-lg text-gray-100 drop-shadow mb-2">{paste.title}</span>
              {/* Data text after title */}
              <div className="relative">
                <div className="whitespace-pre-wrap text-[#FFF8E1] drop-shadow mb-3 max-h-[150px] overflow-y-auto pr-2">
                  {paste.content}
                </div>
                {paste.content.length > 300 && (
                  <div className="absolute bottom-0 right-0 bg-gradient-to-l from-black/50 to-transparent w-20 h-8 pointer-events-none" />
                )}
              </div>
              <div className="flex items-center justify-end gap-2">
                {/* Copy Icon */}
                <button
                  title="Copy"
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("copied successfully");
                  }}
                >   
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                    <rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                  </svg>
                </button>
                {/* Share Icon */}
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
          ))
        )}
      </div>
    </div>
  );
}

export default Paste