import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 🔁 Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async () => {
    setError('');
    try {
      const data = await login(email, password);

      // Check structure based on Perfex's API
      if (data && data.token) {
        localStorage.setItem('authToken', data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid login response');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <button className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0">
          <div className="cursor-pointer text-gray-600">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="h-4 w-4 text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.3807 2.01904C9.91573 3.38786 9 5.33708 9 7.50018C9 11.6423 12.3579 15.0002 16.5 15.0002C18.6631 15.0002 20.6123 14.0844 21.9811 12.6195C21.6613 17.8539 17.3149 22.0002 12 22.0002C6.47715 22.0002 2 17.523 2 12.0002C2 6.68532 6.14629 2.33888 11.3807 2.01904Z"></path>
            </svg>
          </div>
        </button>
        <main className="mx-auto min-h-screen">
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <a className="mt-0 w-max lg:pt-10" href="#">
                  <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z" fill="#A3AED0"></path>
                    </svg>
                    <p className="ml-3 text-sm text-gray-600">Back to Dashboard</p>
                  </div>
                </a>
                <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                  <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                    <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign In</h4>
                    <p className="mb-9 ml-1 text-base text-gray-600">Enter your email and password to sign in!</p>
                    <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
                      <div className="rounded-full text-xl">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
<path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
<path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
<path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                      </div>
                      <h5 className="text-sm font-medium text-navy-700 dark:text-white">Sign In with Google</h5>
                    </div>
                    <div className="mb-6 flex items-center  gap-3"><div className="h-px w-full bg-gray-200 dark:bg-navy-700"></div>
                    <p className="text-base text-gray-600 dark:text-white"> or </p>
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700">
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="email" className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">Email*</label>
                      <input 
                        type="text"
                        placeholder="mail@simmmple.com" 
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="password" className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">Password*</label>
                      <input 
                        type="password" 
                        placeholder="Min. 8 characters" 
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 flex items-center justify-between px-2">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
                  checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400 undefined" 
                          name="weekly"
                        />
                        <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">Keep me logged In</p>
                      </div>
                      <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href=" ">Forgot Password?</a>
                    </div>
                    <button 
                      onClick={handleLogin} 
                      className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                    >
                      Sign In
                    </button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="mt-4">
                      <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">Not registered yet?</span>
                      <a href=" " className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">Create an account</a>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <img className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]" src='./img/horizon-logo.png' />
                </div>
              </div>
              <div className="z-[5] mx-auto flex w-full max-w-screen-sm flex-col items-center justify-between px-[20px] pb-4 lg:mb-6 lg:max-w-[100%] lg:flex-row xl:mb-2 xl:w-[1310px] xl:pb-6"><p className="mb-6 text-center text-sm text-gray-600 md:text-base lg:mb-0">©2025 Horizon UI. All Rights Reserved.</p>
                <ul className="flex flex-wrap items-center sm:flex-nowrap">
                  <li className="mr-12">
                    <a target="blank" href="mailto:hello@simmmple.com" className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white">Support</a>
                  </li>
                  <li className="mr-12">
                    <a target="blank" href="https://simmmple.com/licenses" className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white">License</a>
                  </li>
                  <li className="mr-12">
                    <a target="blank" href="https://simmmple.com/terms-of-service" className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white">Terms of Use</a>
                  </li>
                  <li>
                    <a target="blank" href="https://blog.horizon-ui.com/" className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white">Blog</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
