import "./rootpage.css"
import React from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Lumbini Lions",
    description : "This is lions's den."
}
export default function layout({children} : {children : React.ReactNode}) {
    return (
        <>
                <>{children}</>
        </>
    )
}