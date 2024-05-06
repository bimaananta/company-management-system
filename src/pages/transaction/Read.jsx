import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import fetchData from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import PaginateNavigator from "../../components/PaginateNavigator";


export default function TransactionRead({middleware}){
    const [transactions, setTransactions] = useState([]);
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
        fetchData("index", `transaction?page=${page}`, setTransactions, null);
    }, [page]);

    useEffect(() => {
        setPageTotal(transactions?.last_page);
    }, [transactions]);

    function handleSearch(){
        fetchData("index", `transaction/search/${searchQuery}`, setTransactions, null)
    }


    return (
        <section id="read-transaction" className="pt-5 mt-5 mb-5">
            <div className="container">
                <PageHeader title={"Transaction List"} text={"List of company recorded transaction"} addLink={'/create-transaction'}>
                    <SearchBar setSearch={setSearchQuery} handleSearch={handleSearch} />
                </PageHeader>
                <div className="row w-100">
                    <table className="shadow-sm">
                        <thead>
                            <tr>
                                {['ID', 'Product', 'Customer', 'Date', 'Price Total', 'Method', 'Action'].map((column, index) => (
                                    <th key={index}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length !== 0 ? transactions?.data?.map((transaction, index) => {
                                index++;

                                if(page > 1){
                                    index = index + (transactions.total * (page - 1));
                                }

                                return (
                                    <tr key={index}>
                                        <td>{index++}</td>
                                        <td>{transaction.product?.title}</td>
                                        <td>{transaction.customer?.name}</td>
                                        <td>{transaction.transaction_date}</td>
                                        <td>{transaction.price_total ? transaction.price_total : "Free"}</td>
                                        <td>{transaction.method}</td>
                                        <td className="d-flex gap-2">
                                            <Link to={`/update-transaction/${transaction.id}`} className="btn btn-md btn-success">Edit</Link>
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