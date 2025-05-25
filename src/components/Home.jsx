import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get('pasteId')
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  // Load existing paste data when pasteId changes
  useEffect(() => {
    if (pasteId) {
      const existingPaste = pastes.find(paste => paste._id === pasteId);
      if (existingPaste) {
        setTitle(existingPaste.title);
        setValue(existingPaste.content);
      }
    } else {
      // Clear form when there's no pasteId
      setTitle("");
      setValue("");
    }
  }, [pasteId, pastes]);

  function createPaste() {
    const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString(), // Correct usage: create a Date object instance and then call toISOString
    };
    if (pasteId) {
        //update
        dispatch(updateToPastes(paste));
    } else {
        //create
        dispatch(addToPastes(paste));
    }
    //after creation or updation clean old values
    setTitle("");
    setValue("");
    setSearchParams({});
}
  return (
    <div className='mt-2'>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-2 border-2 border-black rounded-2xl bg-black text-white
          w-[66%] pl-4' 
          type="text"
          placeholder="enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button 
        onClick={createPaste}
        className='p-2 border-2 border-black rounded-2xl text-white ml-2'>
          {
            pasteId ? 'Update my Paste' : 'Create Paste'
          }
        </button>
      </div>  
      <div className='mt-8'>
        <textarea
          className='p-2 m-4 border-2 border-black rounded-2xl bg-black text-white
          type="text"
          min-w-[500px]  p-4 mt-4 '
          placeholder="enter the paste"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  )
}

export default Home