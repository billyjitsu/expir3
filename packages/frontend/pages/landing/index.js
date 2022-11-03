import React from 'react'

const index = () => {
  return (
    <div className={''}>
    
    <header className="p-3">
      <h1 className="text-4xl font-bold">🔏 Expir3</h1>
    </header>
    <hr></hr>
    <main className={''}>
      ;
      <h2 className="text-3xl font-semibold self-start mx-5 max-w-50">
        Create your on Chain will
      </h2>
      <p className="text-xl self-start mx-5 mt-2 max-w-175 text-gray-400">
        Schedule automatic payouts to accounts of your choice as your will or
        as a fall back.
      </p>
      <button className="text-2xl font-semibold bg-black text-white p-3 self-start mx-5 mt-12 border-none rounded-md">
        <a href="/dashboard">Register Now</a>
      </button>
    </main>
  </div>
  )
}

export default index