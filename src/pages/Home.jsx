import { useEffect } from "react";

export default function Home({middleware}){
    useEffect(() => {
        if(Object.keys(middleware).length !== 0){
            for(const key in middleware){
                if(typeof middleware[key] === "function"){
                    middleware[key]();
                }
            }
        }
    }, [middleware]);

    return (
        <></>
    );
}