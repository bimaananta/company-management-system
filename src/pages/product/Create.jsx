import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import fetchData from "../../hooks/useFetch";
import Api from "../../config/Api";
import Swal from "sweetalert2";

export default function ProductCreate({middleware}){
    const [product, setProduct] = useState({
        title: "",
        description: "",
        release_date: "",
        price: 0,
        available: 0,
        category_id: 0,
        photo: null
    });
    const [categories, setCategories] = useState([]);
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
        fetchData("index", "category", setCategories, null);
    }, []);

    console.log(product);

    function handleChange(e){
        if(e.target.name === "photo"){
            return setProduct({
                ...product,
                [e.target.name]: e.target.files[0]
            });
        }

        return setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    function handleReset(){
        const input = document.querySelectorAll('.form-control');
        for(let i = 0; i < input.length; i++){
            input[i].value = "";
        }

        return setProduct({});
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        for(const key in product){
            formData.append(key, product[key]);
        }

        await Api
            .post('v1/product', formData, {
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
                        navigate('/product')
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: "Failed!",
                    text: `Failed to create product ${err.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                });
            });
    }
    

    return (
        <section id="product-create" className="pt-5 mt-5 mb-5">
            <div className="container mt-2">
                <PageHeader title={"Create Product"} text={"Create new list of company product"} addLink={false}/>
                <form onSubmit={handleSubmit} className="row w-100" encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-bold">Title</label>
                        <input type="text" name="title" id="title" className="form-control" onChange={handleChange} placeholder="Enter Title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-bold">Description</label>
                        <input type="text" name="description" id="description" className="form-control" onChange={handleChange} placeholder="Enter Description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="release_date" className="form-label fw-bold">Release Date</label>
                        <input type="date" name="release_date" id="release_date" className="form-control" onChange={handleChange} placeholder="Enter Release Date" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label fw-bold">Price</label>
                        <input type="number" name="price" id="price" className="form-control" onChange={handleChange} placeholder="Enter Price" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="available" className="form-label fw-bold">Available</label>
                        <select name="available" id="available" onChange={handleChange} className="form-select" placeholder="Enter Status">
                            <option value={0}>Select Status</option>
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label fw-bold">Category</label>
                        <select name="category_id" id="category_id" onChange={handleChange} className="form-select" placeholder="Enter Category">
                            <option value={0}>Select Category</option>
                            {categories?.data?.map((category, index) => (
                                <option value={category.id} key={index}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="form-label fw-bold">Photo</label>
                        <input type="file" name="photo" id="photo" className="form-control" onChange={handleChange} />
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