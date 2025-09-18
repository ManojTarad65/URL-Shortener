import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-2 fixed  w-full z-50 border-b border-gray-800">
        <Link href="/">
            <h1 className="text-2xl font-bold text-blue-400">⚡ LinkWarp</h1>
        </Link>
  <div className="flex space-x-6 text-gray-400">
    <Link href="/features">
      <button className="hover:text-blue-400 transition">Features</button>
    </Link>
    <Link href="/about">
      <button className="hover:text-blue-400 transition">About</button>
    </Link>
  </div>
 
</nav>

  )
}

export default Navbar
