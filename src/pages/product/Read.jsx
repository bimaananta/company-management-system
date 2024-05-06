import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import fetchData from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import PaginateNavigator from "../../components/PaginateNavigator";
import Swal from "sweetalert2";
import deleteData from "../../hooks/useDelete";

export default function ReadProduct({middleware}){
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageTotal, setPageTotal] = useState(0);

    useEffect(() => {
        if(Object.keys(middleware).length !== 0){
            for(const key in middleware){
                if(typeof middleware[key] === 'function'){
                    middleware[key]();
                }
            }
        }
    }, [middleware]);

    function handleSearch(){
        fetchData("index", `v1/product/search/${search}`, setProducts, null);
    }

    function confirmDelete(id){
        Swal.fire({
            title: "Warning!",
            text: `Are you sure want to delete this item ?`,
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "blue",
            cancelButtonColor: "red"
        }).then(result => {
            if(result.isConfirmed){
                deleteData("product", id, setProducts, "id");
            }
        });
    }

    useEffect(() => {
        fetchData("index", "product", setProducts, null);
    }, []);

    useEffect(() => {
        setPageTotal(products?.last_page);
    }, [products]);

    return (
        <section id="read-product" className="pt-5 mt-5">
            <div className="container">
                <PageHeader title={"Product List"} text={"List of company released products"} addLink={'/create-product'}>
                    <SearchBar setSearch={setSearch} handleSearch={handleSearch} />
                </PageHeader>
                <div className="row w-100">
                    <table className="shadow-sm">
                        <thead>
                            <tr>
                                {['ID', 'Title', 'Description', 'Release Date','Price', 'Available', 'Action'].map((column, index) => (
                                    <th key={index}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.length !== 0 ? products?.data?.map((product, index) => {
                                index++;

                                if(page > 1){
                                    index = index + (products.total * (page - 1));
                                }

                                return (
                                    <tr key={index}>
                                        <td>{index++}</td>
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>{product.release_date}</td>
                                        <td>{product.price ? product.price : "Free"}</td>
                                        <td>{product.available ? "Yes" : "No"}</td>
                                        <td className="d-flex gap-2">
                                            <Link to={`/update-product/${product.id}`} className="btn btn-md btn-success">Edit</Link>
                                            <button onClick={() => confirmDelete(product.id)} className="btn btn-md btn-danger">Delete</button>
                                            <Link className="btn btn-md btn-primary">Detail</Link>
                                        </td>
                                    </tr>
                                );
                            }) : 
                            (<tr>
                                <td colSpan={7} className="text-center text-danger">Data not found</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <PaginateNavigator page={page} setPage={setPage} pageTotal={pageTotal} />
            </div>
        </section>
    );
}