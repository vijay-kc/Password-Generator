import { useState, useCallback, useEffect, useRef } from 'react'
// import bg from '/assets/bg.png'
import "./App.css";

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
   
  <section className='ram'>
<div  className=' w-full h-screen py-12  '>
      <h1 className='text-orange-800 pt-12 my-0 text-5xl text-center '>Password generator</h1>
    <div className="w-1/2 mx-auto shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg px-8 py-8 my-12 bg-green-00 text-sky-900 border-4 border-sky-300 "> 
      
    <div className="flex shadow rounded-lg overflow-hidden mb-6 ">
        <input
            type="text"
            value={password}
            className="outline-none w-full text-2xl py-2 px-4"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-5 py-1 text-xl shrink-0'
        >Copy</button>
        
    </div>
    <div className=' text-sm text-center py-4 gap-x-2'>
    <label className='w-full text-2xl ' >Length : {length}</label>
      <div className=' items-center my-4 gap-x-1'>
     
        <input 
        type="range"
        min={4}
        max={40}
        value={length}
         className='cursor-pointer w-full '
         onChange={(e) => {setLength(e.target.value)}}
          />
          
      </div>
      <div className="flex text-2xl mx-1 my-6  items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          className='cursor-pointer w-4 h-4'
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput" className='mx-2' >Numbers</label>
      </div>
      <div className="flex items-center text-2xl  mx-1 gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className='cursor-pointer w-4 h-4'
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput" className='mx-2'>Characters</label>
      </div>
    </div>
</div>
</div> 
</section> 
  )
}

export default App