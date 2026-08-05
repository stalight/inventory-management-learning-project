import './Pagination.css';

const Pagination = ({page, setPage, totalPage}) => {
    const start = Math.max(1, page - 4);
    const end = Math.min(totalPage, page + 4);
    return (
        <div className="PaginationContainer">
            {Array.from({length: end - start + 1}, (_, i) => {
                const pageNum = start + i;
                return (
                    <button key={pageNum}
                    onClick={() => setPage(pageNum)}
                    disabled={pageNum === page}
                    id={pageNum === page ? "currentPage" : "Page"}>
                        {pageNum}
                    </button>
                );
            })

            }
        </div>
    );
}

export default Pagination;