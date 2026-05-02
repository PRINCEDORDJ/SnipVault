import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Auth = () => {
  const [register, setRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { logIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (register) {
      signUp(email, password);
      navigate('/confirm')
    } else {
      logIn(email, password)
    }

    return;
  }

  return (
    <div className="pt-40">
      <div className="w-md max-md:w-xs sm:w-md max-lg:w-md mx-auto shadow-sm shadow-blue-400 py-5 px-3 flex flex-col items-center justify-center gap-2 rounded-lg">
        <Link to="/">
          <img
            src="/favicon.png"
            width={50}
            height={50}
            className="-mt-15 rounded-lg object-contain"
          />
        </Link>
        <div>
          <h1 className="font-bold py-4 text-2xl">{register ? "Sign Up" : "Log In"}</h1>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <input
            type="text"
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            type="password"
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <div className="w-full border-3 p-0.5 rounded-xl border-blue-500">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 p-2 text-white rounded-lg"
            >
              {register ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
        <div className="pt-2">
          {register ? (
            <p>
              Already have an account?{" "}
              <span
                className="cursor-pointer text-blue-700 underline font-medium"
                onClick={() => setRegister(false)}
              >
                Log In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                className="cursor-pointer text-blue-700 underline font-medium "
                onClick={() => setRegister(true)}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth