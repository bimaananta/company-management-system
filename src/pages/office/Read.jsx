import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import fetchData from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import PaginateNavigator from "../../components/PaginateNavigator";


export default function OfficeRead({middleware}){
    const [offices, setOffices] = useState([]);
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
        fetchData("index", `office?page=${page}`, setOffices, null);
    }, [page]);

    useEffect(() => {
        setPageTotal(offices?.last_page);
    }, [offices]);

    function handleSearch(){
        fetchData("index", `office/search/${searchQuery}`, setOffices, null)
    }


    return (
        <section id="read-office" className="pt-5 mt-5 mb-5">
            <div className="container">
                <PageHeader title={"Office List"} text={"List of company branch office"} addLink={'/create-office'}>
                    <SearchBar setSearch={setSearchQuery} handleSearch={handleSearch} />
                </PageHeader>
                <div className="row w-100">
                    <table className="shadow-sm">
                        <thead>
                            <tr>
                                {['ID', 'Head Officer', 'Address', 'Action'].map((column, index) => (
                                    <th key={index}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {offices.length !== 0 ? offices?.data?.map((office, index) => {
                                index++;

                                if(page > 1){
                                    index = index + (offices.total * (page - 1));
                                }

                                return (
                                    <tr key={index}>
                                        <td>{index++}</td>
                                        <td>{office.head_officer}</td>
                                        <td>{office.address}</td>
                                        <td className="d-flex gap-2">
                                            <Link to={`/update-office/${office.id}`} className="btn btn-md btn-success">Edit</Link>
                                            <button className="btn btn-md btn-danger">Delete</button>
                                            <Link className="btn btn-md btn-primary">Detail</Link>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={4} className="text-center text-danger">Data not found!</td>
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