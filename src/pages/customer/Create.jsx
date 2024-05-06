import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import Api from "../../config/Api";
import Swal from "sweetalert2";

export default function CustomerCreate({middleware}){
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        telp: "",
        gender: "",
        address: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        if(Object.keys(middleware).length !== 0){
            for(const key in middleware){
                if(typeof middleware[key] === 'function'){
                    middleware[key]();
                }
            }
        }
    }, [middleware]);

    function handleChange(e){
        return setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    }

    function handleReset(){
        const input = document.querySelectorAll('.form-control');
        for(let i = 0; i < input.length; i++){
            input[i].value = "";
        }

        return setCustomer({});
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        for(const key in customer){
            formData.append(key, customer[key]);
        }

        await Api
            .post('v1/customer', formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage["token"]}`,
                }
            })
            .then(response => {
                Swal.fire({
                    title: "Success!",
                    text: `${response.data.message}`,
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                }).then(result => {
                    if(result.isConfirmed){
                        navigate('/customer')
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: "Failed!",
                    text: `Failed to create customer ${err.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                });
            });
    }
    

    return (
        <section id="customer-create" className="pt-5 mt-5 mb-5">
            <div className="container mt-2">
                <PageHeader title={"Create customer"} text={"Create new list of company branch customer"} addLink={false}/>
                <form onSubmit={handleSubmit} className="row w-100">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input type="text" name="name" id="name" className="form-control" onChange={handleChange} placeholder="Enter name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                        <input type="text" name="email" id="email" className="form-control" onChange={handleChange} placeholder="Enter email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telp" className="form-label fw-bold">Telp</label>
                        <input type="text" name="telp" id="telp" className="form-control" onChange={handleChange} placeholder="Enter telp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label fw-bold">Gender</label>
                        <select name="gender" id="gender" className="form-select" onChange={handleChange}>
                            <option value={""}>Select Gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                        <input type="text" name="address" id="address" className="form-control" onChange={handleChange} placeholder="Enter address" />
                    </div>
                    <div className="action d-flex gap-2">
                        <button className="btn btn-md btn-success" type="submit">Submit</button>
                        <button className="btn btn-md btn-danger" type="reset" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </section>
    );
}