import { Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Login from "../pages/auth/Login";
import Home from "../pages/Home"
import ReadProduct from "../pages/product/Read"
import CreateProduct from "../pages/product/Create"
import UpdateProduct from "../pages/product/Update"
import CategoryCreate from "../pages/category/Create";
import CategoryUpdate from "../pages/category/Update";
import CategoryRead from "../pages/category/Read";
import DivisionRead from "../pages/division/Read";
import DivisionCreate from "../pages/division/Create";
import DivisionUpdate from "../pages/division/Update";
import OfficeRead from "../pages/office/Read";
import OfficeCreate from "../pages/office/Create";
import OfficeUpdate from "../pages/office/Update";
import EmployeeRead from "../pages/employee/Read";
import EmployeeCreate from "../pages/employee/Create";
import EmployeeUpdate from "../pages/employee/Update";
import CustomerRead from "../pages/customer/Read";
import CustomerCreate from "../pages/customer/Create";
import CustomerUpdate from "../pages/customer/Update";
import TransactionCreate from "../pages/transaction/Create";
import TransactionRead from "../pages/transaction/Read";
import TransactionUpdate from "../pages/transaction/Update";


export default function RouteIndex(){
    const navigate = useNavigate();

    function checkLogin(){
        const token = localStorage["token"];
        if(!token){
            return navigate('/login');
        }

        return true;
    }

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home middleware={{checkLogin}} />} />
                <Route path='/product' element={<ReadProduct middleware={{checkLogin}} />} />
                <Route path='/create-product' element={<CreateProduct middleware={{checkLogin}} />} />
                <Route path='/update-product/:id' element={<UpdateProduct middleware={{checkLogin}} />} />

                <Route path='/category' element={<CategoryRead middleware={{checkLogin}} />} />
                <Route path='/create-category' element={<CategoryCreate middleware={{checkLogin}} />} />
                <Route path='/update-category/:id' element={<CategoryUpdate middleware={{checkLogin}} />} />

                <Route path='/division' element={<DivisionRead middleware={{checkLogin}} />} />
                <Route path='/create-division' element={<DivisionCreate middleware={{checkLogin}} />} />
                <Route path='/update-division/:id' element={<DivisionUpdate middleware={{checkLogin}} />} />

                <Route path='/office' element={<OfficeRead middleware={{checkLogin}} />} />
                <Route path='/create-office' element={<OfficeCreate middleware={{checkLogin}} />} />
                <Route path='/update-office/:id' element={<OfficeUpdate middleware={{checkLogin}} />} />

                <Route path='/employee' element={<EmployeeRead middleware={{checkLogin}} />} />
                <Route path='/create-employee' element={<EmployeeCreate middleware={{checkLogin}} />} />
                <Route path='/update-employee/:id' element={<EmployeeUpdate middleware={{checkLogin}} />} />

                <Route path='/customer' element={<CustomerRead middleware={{checkLogin}} />} />
                <Route path='/create-customer' element={<CustomerCreate middleware={{checkLogin}} />} />
                <Route path='/update-customer/:id' element={<CustomerUpdate middleware={{checkLogin}} />} />

                <Route path='/transaction' element={<TransactionRead middleware={{checkLogin}} />} />
                <Route path='/create-transaction' element={<TransactionCreate middleware={{checkLogin}} />} />
                <Route path='/update-transaction/:id' element={<TransactionUpdate middleware={{checkLogin}} />} />

                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    )
}