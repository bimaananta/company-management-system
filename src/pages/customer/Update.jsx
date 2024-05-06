import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import Api from "../../config/Api";
import Swal from "sweetalert2";
import fetchData from "../../hooks/useFetch";

export default function CustomerUpdate({middleware}){
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(Object.keys(middleware).length !== 0){
            for(const key in middleware){
                if(typeof middleware[key] === 'function'){
                    middleware[key]();
                }
            }
        }
    }, [middleware]);

    useEffect(() => {
        fetchData("show", "customer", setCustomer, params.id)
    }, [params]);

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

        const formData = {};

        for(const key in customer){
            formData[key] = customer[key];
        }

        await Api
            .put(`v1/customer/${params.id}`, formData, {
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
                <PageHeader title={"Update Customer"} text={"Update list of company recent customer"} addLink={false}/>
                <form onSubmit={handleSubmit} className="row w-100">
                <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input type="text" name="name" id="name" className="form-control" onChange={handleChange} placeholder="Enter name" value={customer?.name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                        <input type="text" name="email" id="email" className="form-control" onChange={handleChange} placeholder="Enter email" value={customer?.email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telp" className="form-label fw-bold">Telp</label>
                        <input type="text" name="telp" id="telp" className="form-control" onChange={handleChange} placeholder="Enter telp" value={customer?.telp} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label fw-bold">Gender</label>
                        <select name="gender" id="gender" className="form-select" onChange={handleChange} value={customer?.gender} >
                            <option value={""}>Select Gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                        <input type="text" name="address" id="address" className="form-control" onChange={handleChange} placeholder="Enter address" value={customer?.address} />
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