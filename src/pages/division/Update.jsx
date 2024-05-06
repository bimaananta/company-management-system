import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import Api from "../../config/Api";
import Swal from "sweetalert2";
import fetchData from "../../hooks/useFetch";

export default function DivisionUpdate({middleware}){
    const [division, setDivision] = useState(null);
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
        fetchData("show", "division", setDivision, params.id)
    }, [params]);

    function handleChange(e){
        return setDivision({
            name: e.target.value
        });
    }

    function handleReset(){
        const input = document.querySelectorAll('.form-control');
        for(let i = 0; i < input.length; i++){
            input[i].value = "";
        }

        return setDivision({});
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = {};

        for(const key in division){
            formData[key] = division[key];
        }

        await Api
            .put(`v1/division/${params.id}`, formData, {
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
                        navigate('/division')
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: "Failed!",
                    text: `Failed to create division ${err.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                });
            });
    }
    

    return (
        <section id="division-create" className="pt-5 mt-5 mb-5">
            <div className="container mt-2">
                <PageHeader title={"Update division"} text={"Update list of company division"} addLink={false}/>
                <form onSubmit={handleSubmit} className="row w-100">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input type="text" name="name" id="name" className="form-control" onChange={handleChange} placeholder="Enter division Name" value={division?.name} />
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