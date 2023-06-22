import React from "react";

interface LoaderInterface {
  className?: string;
}

export default function Loader({ className }: LoaderInterface) {
  return <span className={`loader ${className}`}></span>;
}
