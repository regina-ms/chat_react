import React from 'react'

export default function InputMessage({ buttonClick, inputRef, buttonLoad }) {
  return (
    <form>
      <input ref={inputRef}/>
      {
        buttonLoad ? <button disabled className='loading'>...</button> : <button onClick={buttonClick}>send</button>
      }
    </form>
  )
}
