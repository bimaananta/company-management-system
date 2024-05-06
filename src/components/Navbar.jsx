export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark text-white fixed-top">
            <div className="container">
                <a href="#" className="navbar-brand text-white fw-bold">Company <span className="text-warning">System</span></a>
                <button className="navbar-toggler" data-bs-toggle="collape" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto d-flex gap-md-5">
                        <li className="nav-item">
                            <a href="#" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Product</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Office</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}