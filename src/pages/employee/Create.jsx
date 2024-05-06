import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import Api from "../../config/Api";
import Swal from "sweetalert2";
import fetchData from "../../hooks/useFetch";

export default function EmployeeCreate({middleware}){
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        no_ktp: "",
        telp: "",
        gender: "male",
        birth_date: "",
        address: "",
        photo: null,
        division_id: 0,
        office_id: 0,
    });
    const [offices, setOffices] = useState(null);
    const [divisions, setDivisions] = useState(null);
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

    useEffect(() => {
        fetchData("index", "office", setOffices, null);
        fetchData("index", "division", setDivisions, null);
    }, []);

    function handleChange(e){
        return setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    }

    function handleReset(){
        const input = document.querySelectorAll('.form-control');
        for(let i = 0; i < input.length; i++){
            input[i].value = "";
        }

        return setEmployee({});
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        for(const key in employee){
            formData.append(key, employee[key]);
        }

        await Api
            .post('v1/employee', formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage["token"]}`,
                    "Content-Type": "multipart/form-data"
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
                        navigate('/employee')
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: "Failed!",
                    text: `Failed to create employee ${err.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                });
            });
    }
    

    return (
        <section id="employee-create" className="pt-5 mt-5 mb-5">
            <div className="container mt-2">
                <PageHeader title={"Create employee"} text={"Create new list of company branch employee"} addLink={false}/>
                <form onSubmit={handleSubmit} className="row w-100" encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input type="text" name="name" id="name" className="form-control" onChange={handleChange} placeholder="Enter name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                        <input type="text" name="email" id="email" className="form-control" onChange={handleChange} placeholder="Enter Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telp" className="form-label fw-bold">Telp</label>
                        <input type="text" name="telp" id="telp" className="form-control" onChange={handleChange} placeholder="Enter Telp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="no_ktp" className="form-label fw-bold">No KTP</label>
                        <input type="text" name="no_ktp" id="no_ktp" className="form-control" onChange={handleChange} placeholder="Enter No KTP" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Select Gender</label>
                        <select name="gender" id="gender" className="form-select" onChange={handleChange}>
                            <option value={"male"}>Select Gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="birth_date" className="form-label fw-bold">Birth Date</label>
                        <input type="date" name="birth_date" id="birth_date" className="form-control" onChange={handleChange} placeholder="Enter Birth Date" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                        <input type="text" name="address" id="address" className="form-control" onChange={handleChange} placeholder="Enter Address" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photo" className="form-label fw-bold">Photo</label>
                        <input type="file" name="photo" id="photo" className="form-control" placeholder="Enter Photo" onChange={(e) => setEmployee({...employee, photo: e.target.files[0]})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Office</label>
                        <select name="office_id" id="office_id" className="form-select" onChange={handleChange}>
                            <option value={0}>Select Office</option>
                            {offices?.data?.map((office, index) => (
                                <option value={office.id} key={index}>{office.address}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="division_id" className="form-label fw-bold">Division</label>
                        <select name="division_id" id="division_id" className="form-select" onChange={handleChange}>
                            <option value={0}>Select Division</option>
                            {divisions?.data?.map((division, index) => (
                                <option value={division.division_id} key={index}>{division.name}</option>
                            ))}
                        </select>
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