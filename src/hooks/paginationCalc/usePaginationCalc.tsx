import { useState } from "react";

export const usePaginationCalc = ({ tableData }) => {
    // PAGE CALCULATION STARTS
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const dataLimit = 20; // Define your data limit here
    const totalPages = Math.ceil(tableData?.length / dataLimit);
    const onPageChange = (page: number) => {
        setCurrentPage(page); // Update current page state
        // You can perform any additional actions here, such as fetching data for the new page
    };
    const checkLastRecord = () => {
        if (currentTableData?.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    // Calculate the indices for the current page's data slice
    const lastIndexItem = dataLimit * currentPage;
    const firstIndexItem = lastIndexItem - dataLimit;
    const currentTableData = tableData?.slice(firstIndexItem, lastIndexItem);

    // PAGE CALCULATION ENDS
    return { totalPages, currentPage, currentTableData, dataLimit, onPageChange, checkLastRecord }
}