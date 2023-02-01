import React, {useEffect} from "react";
import {useRouter} from "next/router";

interface LoaderProps{
    loading: boolean,
    setLoading: (loading: boolean) => void
}
export function Loader({loading, setLoading}: LoaderProps){
    const router = useRouter();
    useEffect(() => {
        const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url: string) => (url === router.asPath) && setLoading(false);
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)
        return () => {
            router.events.on('routeChangeStart', handleStart)
            router.events.on('routeChangeComplete', handleComplete)
            router.events.on('routeChangeError', handleComplete)
        }
    });

    return <>{loading && <div className={"w-full bg-white bg-opacity-30 h-screen flex justify-center items-center z-[999999]"}><span className="preloader"></span></div>}</>
}
