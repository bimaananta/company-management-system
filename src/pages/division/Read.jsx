import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import fetchData from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import PaginateNavigator from "../../components/PaginateNavigator";


export default function DivisionRead({middleware}){
    const [divisions, setDivisions] = useState([]);
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
        fetchData("index", `division?page=${page}`, setDivisions, null);
    }, [page]);

    useEffect(() => {
        setPageTotal(divisions?.last_page);
    }, [divisions]);

    function handleSearch(){
        fetchData("index", `division/search/${searchQuery}`, setDivisions, null)
    }

    return (
        <section id="read-division" className="pt-5 mt-5 mb-5">
            <div className="container">
                <PageHeader title={"Division List"} text={"List of company division"} addLink={'/create-division'}>
                    <SearchBar setSearch={setSearchQuery} handleSearch={handleSearch} />
                </PageHeader>
                <div className="row w-100">
                    <table className="shadow-sm">
                        <thead>
                            <tr>
                                {['ID', 'Name', 'Action'].map((column, index) => (
                                    <th key={index}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {divisions.length !== 0 ? divisions?.data?.map((division, index) => {
                                index++;

                                if(page > 1){
                                    index = index + (divisions.total * (page - 1));
                                }

                                return (
                                    <tr key={index}>
                                        <td>{index++}</td>
                                        <td>{division.name}</td>
                                        <td className="d-flex gap-2">
                                            <Link to={`/update-division/${division.division_id}`} className="btn btn-md btn-success">Edit</Link>
                                            <button className="btn btn-md btn-danger">Delete</button>
                                            <Link className="btn btn-md btn-primary">Detail</Link>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={3} className="text-center text-danger">Data not found!</td>
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