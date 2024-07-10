import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";

interface PaginationProps {
    totalPages: number;
    dataLimit: number;
    currentPage: number;
    tableData: any;
    onchange: any;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, dataLimit, tableData, currentPage, onchange }) => {
    const [activePage, setActivePage] = useState(currentPage);
    const [pageNumberLimits, setPageNumberLimits] = useState(5);
    const [maxPageNumberLimits, setMaxPageNumberLimits] = useState(5);
    const [minPageNumberLimits, setMinPageNumberLimits] = useState(0);
    const [itemsPerPage] = useState(dataLimit);

    // Generate array of page numbers
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    useEffect(() => {
        setActivePage(currentPage); // Update activePage state when currentPage prop changes
    }, [currentPage]);

    const previousData = () => {
        if (activePage === 1) return; // Do nothing if already on the first page
        setActivePage(activePage - 1);
        if (activePage - 1 < minPageNumberLimits) {
            setMaxPageNumberLimits(maxPageNumberLimits - pageNumberLimits);
            setMinPageNumberLimits(minPageNumberLimits - pageNumberLimits);
        }
        onchange(activePage - 1);
    };

    const nextData = () => {
        if (activePage === totalPages) return; // Do nothing if already on the last page
        setActivePage(activePage + 1);
        if (activePage + 1 > maxPageNumberLimits) {
            setMaxPageNumberLimits(maxPageNumberLimits + pageNumberLimits);
            setMinPageNumberLimits(minPageNumberLimits + pageNumberLimits);
        }
        onchange(activePage + 1);
    };

    const handleClick = (page: number) => {
        if (page === maxPageNumberLimits + 1) {
            // Clicked on "..." to go to next set of pages
            setMaxPageNumberLimits(maxPageNumberLimits + pageNumberLimits);
            setMinPageNumberLimits(minPageNumberLimits + pageNumberLimits);
        } else if (page === minPageNumberLimits - 1) {
            // Clicked on "..." to go to previous set of pages
            setMaxPageNumberLimits(maxPageNumberLimits - pageNumberLimits);
            setMinPageNumberLimits(minPageNumberLimits - pageNumberLimits);
        } else {
            // Clicked on a specific page number
            setActivePage(page);
            onchange(page);
        }
    };

    // Determine which page numbers to display
    const visiblePages = pages.filter(page =>
        page <= maxPageNumberLimits && page >= minPageNumberLimits
    );

    // Calculate when to show ellipses
    const showStartEllipsis = minPageNumberLimits > 1;
    const showEndEllipsis = maxPageNumberLimits < totalPages;

    return (
        <div className="p-4 border-t-[1px] border-solid border-borderColor mt-6 font-medium text-grayColor">
            <div className="w-[100%] m-auto">
                <ul className="flex items-center  justify-between mb-8">
                    <div className="group">
                        <button
                            className={`px-1 sm:px-2 py-1 flex items-center justify-center sm:ml-2 rounded-lg border-[1px] border-borderColor group-hover:bg-primaryColorLight group-hover:text-whiteColor border-2
                             ${activePage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                            text-grayColor`}
                            onClick={previousData}
                            disabled={activePage === 1}
                        >
                            <IoMdArrowBack className="group-hover:text-whiteColor sm:mr-2" size={14} />
                            <p className="text-sm hidden sm:inline-block">Previous</p>
                        </button>
                    </div>
                    <div className="flex item-center gap-x-1">
                        {showStartEllipsis && (
                            <li
                                className="sm:ml-2 w-[25px] px-2 h-[25px] sm:w-[35px]  sm:h-[35px] flex items-center justify-center cursor-pointer text-grayColor"
                                onClick={() => handleClick(minPageNumberLimits - 1)} // Navigate to previous set of pages
                            >
                                ...
                            </li>
                        )}
                        {visiblePages.map((item) => (
                            <li
                                key={item}
                                className={`sm:ml-2 w-[25px] px-2 h-[25px] sm:w-[35px]  sm:h-[35px] flex items-center justify-center cursor-pointer hover:bg-primaryColorLight hover:rounded-lg hover:text-whiteColor ${
                                    activePage === item ? "bg-primaryColorLight border-primaryColorLight text-whiteColor rounded-lg" : "text-grayColor"
                                }`}
                                onClick={() => handleClick(item)} // Navigate to specific page
                            >
                                {item}
                            </li>
                        ))}
                        {showEndEllipsis && (
                            <li
                                className="ml-2 w-[35px] h-[35px] flex items-center justify-center cursor-pointer text-grayColor"
                                onClick={() => handleClick(maxPageNumberLimits + 1)} // Navigate to next set of pages
                            >
                                ...
                            </li>
                        )}
                    </div>
                    <div className="group">
                        <button
                            className={`px-1 sm:px-2 py-1 flex items-center justify-center ml-2 rounded-lg border-[1px] border-borderColor group-hover:bg-primaryColorLight group-hover:text-whiteColor border-2
                            ${activePage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={nextData}
                            disabled={activePage === totalPages}
                        >
                            <p className="text-sm mr-2 hidden sm:inline-block">Next</p>
                            <IoMdArrowBack className="rotate-180 group-hover:text-whiteColor" size={14} />
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Pagination;
