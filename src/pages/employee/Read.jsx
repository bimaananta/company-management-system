import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import fetchData from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import PaginateNavigator from "../../components/PaginateNavigator";


export default function EmployeeRead({middleware}){
    const [employees, setemployees] = useState([]);
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
        fetchData("index", `employee?page=${page}`, setemployees, null);
    }, [page]);

    useEffect(() => {
        setPageTotal(employees?.last_page);
    }, [employees]);

    function handleSearch(){
        fetchData("index", `employee/search/${searchQuery}`, setemployees, null)
    }

    const columns = ['Name', 'Email', 'Telp', 'Address', 'Office', 'Division'];

    return (
        <section id="read-employee" className="pt-5 mt-5 mb-5">
            <div className="container">
                <PageHeader title={"Employee List"} text={"List of company employee"} addLink={'/create-employee'}>
                    <SearchBar setSearch={setSearchQuery} handleSearch={handleSearch} />
                </PageHeader>
                <div className="row w-100">
                    <table className="shadow-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                {columns.map((column, index) => (
                                    <th key={index}>{column}</th>
                                ))}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length !== 0 ? employees?.data?.map((employee, index) => {
                                index++;

                                if(page > 1){
                                    index = index + (employees.total * (page - 1));
                                }

                                return (
                                    <tr key={index}>
                                        <td>{index++}</td>
                                        {columns.map((column, index) => {
                                            column = column.toLowerCase()
                                            if(column === "office"){
                                                return (
                                                    <td key={index}>{employee[column].address}</td>
                                                );
                                            }else if(column === "division"){
                                                return (
                                                    <td key={index}>{employee[column].name}</td>
                                                )
                                            }else{
                                                return (
                                                    <td key={index}>{employee[column]}</td>
                                                )
                                            }
                                        })}
                                        <td className="d-flex gap-2">
                                            <Link to={`/update-employee/${employee.id}`} className="btn btn-md btn-success">Edit</Link>
                                            <button className="btn btn-md btn-danger">Delete</button>
                                            <Link className="btn btn-md btn-primary">Detail</Link>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={8} className="text-center text-danger">Data not found!</td>
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