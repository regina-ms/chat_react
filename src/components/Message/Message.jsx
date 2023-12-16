import React from 'react'

export default function Message({className, message}) {
  return (
    <li className={className}>
        {message}
    </li>
  )
}
