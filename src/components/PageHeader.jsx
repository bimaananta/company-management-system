import { Link } from "react-router-dom";

export default function PageHeader({children, title, text, addLink}){
    return (
        <div className="row mb-3 align-items-center">
            <div className="col-md-6">
                <h1 className="mb-1 fw-bold">{title}</h1>
                <p className="mb-2">{text}</p>
                {addLink ? (<Link to={addLink} className="btn btn-md btn-success mb-3">+ Tambah</Link>) : (<></>)}
            </div>
            <div className="col-md-6">
                {children}
            </div>
        </div>
    );
}