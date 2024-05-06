import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Api from "../../config/Api";

export default function Login(){
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e){
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    function handleSetShowPassword(){
        setShowPassword(!showPassword)
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        for(const key in credentials){
            formData.append(key, credentials[key]);
        }

        await Api
            .post('v1/auth/login', formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage["token"]}`
                }
            })
            .then(response => {
                localStorage["token"] = response.data.data.token;
                Swal.fire({
                    title: "Success!",
                    text: "You are logged in into website",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                }).then(result => {
                    if(result.isConfirmed){
                        navigate('/')
                    }
                })
            })
            .catch(err => {
                Swal.fire({
                    title: "Failed!",
                    text: `Failed to login ${err.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                });
            })
    }

    return (
        <section id="login" className="pt-5 mt-5">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <form onSubmit={handleSubmit} className="col-md-6 bg-white px-4 py-4 shadow rounded-3 d-flex flex-column align-items-start">
                        <h1 className="fw-bold">Log In</h1>
                        <p className="mb-3">For users to log in into the website</p>
                        <div className="mb-3 w-100">
                            <label htmlFor="username" className="form-label fw-bold">Username</label>
                            <input type="text" name="username" id="username" className="form-control" placeholder="Enter Username" onChange={handleChange} />
                        </div>
                        <div className="mb-3 w-100">
                            <label htmlFor="password" className="form-label fw-bold">Password</label>
                            <div className="input-wrapper d-flex flex-row gap-2 align-items-center border rounded-3 pe-2">
                                <input type={showPassword ? "text" : "password"} name="password" id="password" className="form-control border-0" placeholder="Enter password" onChange={handleChange} />
                                <i className={showPassword ? "bi bi-eye" : "bi bi-eye-fill"} onClick={handleSetShowPassword}></i>
                            </div>
                        </div>
                        <button className="btn btn-md btn-dark text-white w-100" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}