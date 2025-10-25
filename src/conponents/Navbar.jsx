import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-200  text-white'>
        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className='logo font-bold text-white text-2xl'>
             <span className='text-green-600'>&lt;</span>
            Pass 
            <span className='text-green-600'>OP / &gt;</span>
          
           


        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a  className="hover:font-bold"href=''>Home</a>
                <a className="hover:font-bold" href=''>About</a>
                <a  className="hover:font-bold"href=''>Contact</a>
               
            </li>
        </ul> */}
        <div>
          <a href="https://github.com/keshav20004/password-manager" target="_blank" rel="noopener noreferrer">
  <img
  className="w-25"
  src="https://img.shields.io/github/stars/keshav20004/password-manager?style=social"
  alt="GitHub Repo stars"
/>
  
</a>
        </div>
</div>
    </nav>
  )
}

export default Navbar
