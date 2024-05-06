import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import fetchData from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import PaginateNavigator from "../../components/PaginateNavigator";


export default function CustomerRead({middleware}){
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
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

    useEffect(() => {
        fetchData("index", `customer?page=${page}`, setCustomers, null);
    }, [page]);

    useEffect(() => {
        setPageTotal(customers?.last_page);
    }, [customers]);

    function handleSearch(){
        fetchData("index", `customer/search/${searchQuery}`, setCustomers, null)
    }

    return (
        <section id="read-customer" className="pt-5 mt-5 mb-5">
            <div className="container">
                <PageHeader title={"Customer List"} text={"List of company recent customer"} addLink={'/create-customer'}>
                    <SearchBar setSearch={setSearchQuery} handleSearch={handleSearch} />
                </PageHeader>
                <div className="row w-100">
                    <table className="shadow-sm">
                        <thead>
                            <tr>
                                {['ID', 'Name', 'Email', 'Telp', 'Address', 'Gender', 'Action'].map((column, index) => (
                                    <th key={index}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length !== 0 ? customers?.data?.map((customer, index) => {
                                index++;

                                if(page > 1){
                                    index = index + (customers.total * (page - 1));
                                }

                                return (
                                    <tr key={index}>
                                        <td>{index++}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.telp}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.gender}</td>
                                        <td className="d-flex gap-2">
                                            <Link to={`/update-customer/${customer.id}`} className="btn btn-md btn-success">Edit</Link>
                                            <button className="btn btn-md btn-danger">Delete</button>
                                            <Link className="btn btn-md btn-primary">Detail</Link>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={7} className="text-center text-danger">Data not found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <PaginateNavigator page={page} setPage={setPage} pageTotal={pageTotal} />
            </div>
        </section>
    );
}