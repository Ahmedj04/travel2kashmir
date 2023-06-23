import React, { useState } from 'react';
import Modal from '@/components/T2K/modal';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';


function Footer() {

    const [showModalTC, setShowModalTC] = useState(0);
    const [showModalPrivacy, setShowModalPrivacy] = useState(0);
    const [showModalContactUs, setShowModalContactUs] = useState(0);

    return (
        <section>
            <div className='bg-slate-900 text-white'>

                <div className='py-14'>
                    <div className='px-3'>
                        <div>
                            <div className='pt-12 px-3'>
                                <a className='flex h-10 mb-6'><img src='/t2k.png'></img>&nbsp;<h2 className='flex items-center text-xl'>Travel To Kashmir</h2></a>
                                <p className='mb-6'>Discover the enchanting beauty of Kashmir with Travel 2 Kashmir, a dynamic startup empowering the region's tourism industry through immersive experiences and responsible travel practices. Experience the warmth of local hospitality and explore the hidden gems of this breathtaking destination with us.</p>
                                <ul className='text-white flex gap-5'>
                                    <li><FacebookIcon /></li>
                                    <li><TwitterIcon /></li>
                                    <li><LinkedInIcon /></li>
                                    <li><InstagramIcon /></li>

                                </ul>
                            </div>

                            <div className='md:flex md:gap-40'>
                                <div className='pt-12 px-3'>
                                    <h2 className='pb-3 text-2xl font-bold'>Contact</h2>
                                    <ul className=''>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <LocalPhoneIcon />
                                                <p>123-1221--23323</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <EmailIcon />
                                                <p>Example@mail.com</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <LocationOnIcon />
                                                <p>Shalateng Srinagar, J&K</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className='pt-12 px-3'>
                                    <h2 className='pb-3 text-2xl font-bold'>Learn More</h2>
                                    <ul className=''>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <ContactMailOutlinedIcon />
                                                <a className='cursor-pointer' onClick={() => setShowModalContactUs(1)}><p>Contact Us</p></a>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <PolicyOutlinedIcon />
                                                <p className='cursor-pointer' onClick={() => setShowModalPrivacy(1)}>Privacy Policy</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <GavelOutlinedIcon />
                                                <p className='cursor-pointer' onClick={() => setShowModalTC(1)}>Terms & Conditions</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <ExitToAppOutlinedIcon />
                                                <p className='cursor-pointer'>Sign In</p>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='px-3'>
                    <div className='px-3'>
                        <div className=' py-3 border-t-2'>
                            <div>
                                <div className='my-6 px-3 text-center'>
                                    <p >Copyright &copy; {new Date().getFullYear()} Travel To Kashmir</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* ------------------- modal view for footer-------------------------- */}

            <div className={showModalContactUs === 1 ? "block" : "hidden"}>
                <div className="overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 backdrop-blur-3xl h-screen bg-black/30 md:inset-0 z-50 flex justify-center items-center sm:h-full">
                    <div className="relative w-full max-w-2xl px-4 h-auto md:h-auto ">
                        <div className='bg-white rounded-lg shadow relative'>
                            <div className="flex items-start justify-between p-5 border-b rounded-t">
                                <h3 className='text-black text-xl font-semibold'>Contact Us</h3>
                                <button
                                    type="button"
                                    onClick={(e) => setShowModalContactUs(e)
                                    }
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>

                            <form action="#" className="space-y-1 mx-10 my-2 lg:space-y-0">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your email</label>
                                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black" placeholder="name@mail.com" required />
                                </div>
                                <div className='pt-2'>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your Name</label>
                                    <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black" placeholder="John Snow" required />
                                </div>
                                <div className='pt-2'>
                                    <label for="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your Phone Number</label>
                                    <input type="number" id="number" className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black" placeholder="123-233-3232" required />
                                </div>
                                <div className='pt-2'>
                                    <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Subject</label>
                                    <input type="text" id="subject" className="shadow-sm block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-black" placeholder="Let us know how we can help you" required />

                                </div>
                                <div className="sm:col-span-2 pt-2">
                                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your message</label>
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300  dark:text-black dark:placeholder-gray-400 dark:text-white " placeholder="Leave a comment..."></textarea>
                                </div>
                                <div className='flex justify-center p-5'>
                                    <button className="mx-auto py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-800 sm:w-fit hover:bg-blue-950 focus:ring-4 focus:outline-none">Send message</button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>

            <div className={showModalTC === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Terms & Conditions`}
                    description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
                    setShowModal={(e) => setShowModalTC(e)}
                />
            </div>

            <div className={showModalPrivacy === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Privacy Policy`}
                    description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
                    setShowModal={(e) => setShowModalPrivacy(e)}
                />
            </div>
        </section>
    )
}

export default Footer