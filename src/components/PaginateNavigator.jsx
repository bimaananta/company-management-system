export default function PaginateNavigator({page, setPage, pageTotal}){
    return (
        <div className="row mt-5">
            <div className="col d-flex justify-content-center align-items-center">
                <nav aria-label="...">
                    <ul className="pagination" style={{cursor: "pointer"}}>
                        <li className="page-item" onClick={() => setPage(prevPage => prevPage - 1 === 0 ? prevPage : prevPage - 1)}>
                            <a className="page-link">Previous</a>
                        </li>
                        {[...Array(pageTotal)].map((_, index) => {
                            index++;

                            return (
                                <li className={`page-item ${page === index ? "active" : ""}`} key={index} onClick={() => setPage(index - 1)}>
                                    <a className="page-link">{index++}</a>
                                </li>
                            );
                        })}
                        <li className="page-item" onClick={() => setPage(prevPage => prevPage + 1 > pageTotal ? prevPage : prevPage + 1)}>
                            <a className="page-link">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}