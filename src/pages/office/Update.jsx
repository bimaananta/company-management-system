import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import Api from "../../config/Api";
import Swal from "sweetalert2";
import fetchData from "../../hooks/useFetch";

export default function OfficeUpdate({middleware}){
    const [office, setOffice] = useState(null);
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
        fetchData("show", "office", setOffice, params.id)
    }, [params]);

    function handleChange(e){
        return setOffice({
            ...office,
            [e.target.name]: e.target.value
        });
    }

    function handleReset(){
        const input = document.querySelectorAll('.form-control');
        for(let i = 0; i < input.length; i++){
            input[i].value = "";
        }

        return setOffice({});
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = {};

        for(const key in office){
            formData[key] = office[key];
        }

        await Api
            .put(`v1/office/${params.id}`, formData, {
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
                        navigate('/office')
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: "Failed!",
                    text: `Failed to create office ${err.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                });
            });
    }
    

    return (
        <section id="office-create" className="pt-5 mt-5 mb-5">
            <div className="container mt-2">
                <PageHeader title={"Update office"} text={"Update list of company branch office"} addLink={false}/>
                <form onSubmit={handleSubmit} className="row w-100">
                    <div className="mb-3">
                        <label htmlFor="head_officer" className="form-label fw-bold">Head Officer</label>
                        <input type="text" name="head_officer" id="head_officer" className="form-control" onChange={handleChange} placeholder="Enter head officer name" value={office?.head_officer} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                        <input type="text" name="address" id="address" className="form-control" onChange={handleChange} placeholder="Enter address" value={office?.address} />
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