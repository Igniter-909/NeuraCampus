"use client"
import logo from '../../../public/banner/graduates.png'
import Image from 'next/image'
interface WelcomeBannerProps {
  title: string;
  description: string;
  buttonText: string;
  className:string ,
  onButtonClick: () => void;
}

export default function WelcomeBanner({ 
  className="bg-gradient-to-r from-purple-800 to-amber-500",
  title = "Increase your knowledge By Learning!",
  description = "We have new method to new learning process; More faster, secure and easy to use!",
  buttonText = "OK! Take me there",
  onButtonClick
}: WelcomeBannerProps) {
  return (
    <div className= {` ${className} rounded-xl p-6 relative overflow-hidden`}>
      <div className="flex justify-between items-center relative z-10">
        <div className="space-y-2">
          <h2 className="text-white text-2xl font-semibold">{title}</h2>
          <p className="text-white/80">{description}</p>
          <button 
            onClick={onButtonClick}
            className="mt-4 bg-amber-400 text-white px-6 py-2 rounded-lg hover:bg-amber-500 transition-colors"
          >
            {buttonText}
          </button>
        </div>
        
        <div className="hidden md:block rounded-full z-100 shadow-xl shadow-blue-400 ">
          <Image src={logo} alt="logo" width={140} height={140} className='rounded-full  ' />  
        </div>
      </div>
    </div>
  );
}
