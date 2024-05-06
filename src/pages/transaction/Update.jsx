import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import Api from "../../config/Api";
import Swal from "sweetalert2";
import fetchData from "../../hooks/useFetch";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";

export default function TransactionUpdate({middleware}){
    const [transaction, setTransaction] = useState(null);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
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
        fetchData("show", "transaction", setTransaction, params.id);
        fetchData("index", "product", setProducts, null);
        fetchData("index", "customer", setCustomers, null);
    }, [params]);

    function handleChange(e){
        return setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    }

    function handleReset(){
        const input = document.querySelectorAll('.form-control');
        for(let i = 0; i < input.length; i++){
            input[i].value = "";
        }

        return setTransaction({});
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = {};

        for(const key in transaction){
            formData[key] = transaction[key];
        }

        await Api
            .put(`v1/transaction/${params.id}`, formData, {
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
                        navigate('/transaction')
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: "Failed!",
                    text: `Failed to create transaction ${err.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "blue"
                });
            });
    }
    

    return (
        <section id="transaction-create" className="pt-5 mt-5 mb-5">
            <div className="container mt-2">
                <PageHeader title={"Update Transaction"} text={"Update list of company recorded transaction"} addLink={false}/>
                <form onSubmit={handleSubmit} className="row w-100">
                    <Select name={"Customer_ID"} data={customers?.data} handleChange={handleChange} idKey={"id"} column={"name"} value={transaction?.customer_id} />
                    <Select name={"Product_ID"} data={products?.data} handleChange={handleChange} idKey={"id"} column={"title"} value={transaction?.product_id} />
                    <Input name={"Transaction_Date"} type={"date"} handleChange={handleChange} value={transaction?.transaction_date} />
                    <Input name={"Note"} type={"text"} handleChange={handleChange} value={transaction?.note} />
                    <Input name={"Quantity"} type={"number"} handleChange={handleChange} value={transaction?.quantity} />
                    <Input name={"Price_Total"} type={"number"} handleChange={handleChange} value={transaction?.price_total} />
                    <Input name={"Discount"} type={"number"} handleChange={handleChange} value={transaction?.discount} />
                    <div className="action d-flex gap-2">
                        <button className="btn btn-md btn-success" type="submit">Submit</button>
                        <button className="btn btn-md btn-danger" type="reset" onClick={handleReset}>Reset</button>
                    </div>   
                </form>
            </div>
        </section>
    );
}