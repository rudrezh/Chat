import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";
const MessageInput = () => {
  const [message,setMessage] = useState("");
  const {loading,sendMessage} = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className='px-4 my-3' onClick={handleSubmit}>
        <div className='w-full relative'>
            <input type="text"
            className='border text-sm rounded-lg block w-full p-2.5 bg-gret-700 border-gray-600 text-black' 
            placeholder='Send a message' value={message} onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                {loading ? <div className="loading loading-spinner"></div> : <IoMdSend />}
            </button>
        </div>
    </form>
  )
}

export default MessageInput










/*
import { IoMdSend } from "react-icons/io";
const MessageInput = () => {
  return (
    <form className='px-4 my-3'>
        <div className='w-full relative'>
            <input type="text"
            className='border text-sm rounded-lg block w-full p-2.5 bg-gret-700 border-gray-600 text-white' 
            placeholder='Send a message'
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                <IoMdSend />
            </button>
        </div>
    </form>
  )
}

export default MessageInput */