import React, { useState } from 'react';
import Modal from '../Modals/Modal';
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
import ContactUsModal from '../Modals/ContactUsModal';
import Link from 'next/link';
import Router from 'next/router';


function Footer() {

    const [showModalTC, setShowModalTC] = useState(0);
    const [showModalPrivacy, setShowModalPrivacy] = useState(0);
    const [showModalContactUs, setShowModalContactUs] = useState(0);

    return (
        <section>
            <div className='bg-slate-900 text-white'>

                <div className='pb-14'>
                    <div className='px-3'>
                        <div>
                            <div className='pt-10 px-3'>
                                <a className='flex h-10 mb-6'><h2 className='flex items-center text-3xl'>Travel2Kashmir</h2></a>
                                <p className='mb-6'>Discover the enchanting beauty of Kashmir with Travel 2 Kashmir, a dynamic startup empowering the region's tourism industry through immersive experiences and responsible travel practices. Experience the warmth of local hospitality and explore the hidden gems of this breathtaking destination with us.</p>
                                <ul className='text-white flex gap-5'>
                                    <li><Link href="https://www.facebook.com/travel2kashmir/"><FacebookIcon /></Link></li>
                                    <li><TwitterIcon /></li>
                                    <li><LinkedInIcon /></li>
                                    <li><Link href="https://instagram.com/travel2kashmirr?igshid=MzNlNGNkZWQ4Mg=="><InstagramIcon /></Link></li>

                                </ul>
                            </div>

                            <div className='md:flex md:gap-40'>
                                <div className='flex items-center justify-center w-auto h-auto '>
                                    <img src='/t2k.png' /></div>
                                <div className='pt-12 px-3'>
                                    <h2 className='pb-3 text-2xl font-bold'>Contact</h2>
                                    <ul className=''>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <LocalPhoneIcon />
                                                <p>+91-9632911213</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <EmailIcon />
                                                <p>techworks@travel2kashmir.com</p>
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
                                                <Link href="https://hangul-release.vercel.app/">
                                                    <p className='cursor-pointer'>Sign In</p>
                                                </Link>

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
                                    <p >Copyright &copy; {new Date().getFullYear()} Travel2Kashmir</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* ------------------- modal view for footer-------------------------- */}

            <div className={showModalContactUs === 1 ? "block" : "hidden"}>
                <ContactUsModal
                    setShowModalContactUs={setShowModalContactUs}
                />
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

export default Footer;