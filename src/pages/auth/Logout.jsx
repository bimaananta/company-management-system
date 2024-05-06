import { useEffect } from "react";
import Api from "../../config/Api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Logout({middleware}){
    const navigate = useNavigate();

    useEffect(() => {
        if(Object.keys(middleware).length !== 0){
            for(const key in middleware){
                if(typeof middleware[key] === "function"){
                    middleware[key]();
                }
            }
        }
    }, [middleware]);

    useEffect(() => {
        Swal.fire({
            title: "Warning!",
            text: "Do you really want to lo out from the website ?",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "blue",
            cancelButtonColor: "red",
        }).then((result) => {
            if(result.dismiss){
                navigate('/');
            }
            
            if(result.isConfirmed){
                logout();
            }
        })
    }, []);

    async function logout(){
        try{
            const response = await Api.get('v1/auth/logout', {
                headers:{
                    "Authorization": `Bearer ${localStorage["token"]}`
                }
            });

            if(response.status === 200){
                localStorage.removeItem("token");
                Swal.fire({
                    title: "Success!",
                    text: `You are logged out from the website`,
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue",
                    cancelButtonColor: "red",
                }).then((result) => {
                    if(result.isConfirmed){
                        navigate('/login');
                    }
                });
            }
        }catch(err){
            Swal.fire({
                title: "Error!",
                text: `Error while logout: ${err.message}`,
                icon: "error",
                showCancelButton: true,
                showConfirmButton: false,
                confirmButtonColor: "blue",
                cancelButtonColor: "red",
            });
        }
    }

    return (
        <></>
    );
}