import logo from '../../public/assets/images/logo.svg'
import Image from 'next/image'

export default function Header() {
    return (
        <>
            <div className="grid sm:justify-items-end justify-items-center items-center mx-auto sm:flex px-10 py-3 relative bg-red-500 bg-opacity-90 ">
                <Image className={"h-10"} src={logo} alt="BeleFirst"/>
                <div className='flex w-full lg:justify-center sm:justify-end justify-center items-center'>
                    <a href="https://www.facebook.com/belefirst1" className='text-white'>Facebook</a>
                    <a href="https://www.instagram.com/belefirst1" className='text-white ml-8'>Instagram</a>
                </div>
            </div>
        </>
    )
}
