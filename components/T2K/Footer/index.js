import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function Footer() {
    
  return (
    <section>
        <div className='bg-slate-900 text-white'>
            
            <div className='py-14'>
                <div className='px-3'>
                    <div>
                        <div className='pt-12 px-3'>
                            <a className='flex h-10 mb-6'><img src='/t2k.png'></img>&nbsp;<h2 className='flex items-center text-xl'>Travel To Kashmir</h2></a>
                            <p className='mb-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ni</p>
                            <ul className='text-white flex gap-5'>
                                <li><FacebookIcon /></li>
                                <li><TwitterIcon /></li>
                                <li><LinkedInIcon /></li>
                                <li><InstagramIcon /></li>
                                
                            </ul>
                        </div>
                        <div className='pt-12 px-3'>
                            <h2  className='pb-3 text-2xl font-bold'>Contact</h2>
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
                                        <p>Shalateng, Srinagar, J&K</p>
                                    </div>
                                </li>
                            </ul>
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
    </section>
  )
}

export default Footer