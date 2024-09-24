import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { addDatePairModalReducer, isDatePairModalReducer } from "../../redux/slice/serviceForm";
import { RootState } from "../../redux/store";

const DatePairsModal = () => {
    const lasttWeekPairs = [
        { firstDay: "monday", secondDay: "tuesday" },
        { firstDay: "tuesday", secondDay: "wednesday" },
        { firstDay: "wednesday", secondDay: "thursday" },
        { firstDay: "thursday", secondDay: "friday" },
        { firstDay: "friday", secondDay: "saturday" },
        { firstDay: "saturday", secondDay: "sunday" },
        { firstDay: "sunday", secondDay: "monday" }, // Special case: spans last and current week
    ];

    const currentWeekPairs = [
        { firstDay: "monday", secondDay: "tuesday" },
        { firstDay: "tuesday", secondDay: "wednesday" },
        { firstDay: "wednesday", secondDay: "thursday" },
        { firstDay: "thursday", secondDay: "friday" },
        { firstDay: "friday", secondDay: "saturday" },
        { firstDay: "saturday", secondDay: "sunday" },
        { firstDay: "sunday", secondDay: "monday" }, // Special case: spans current and next week
    ];
    const [selectPreviousIndexPair, setSelectPrevioustIndexPair] = useState<any>()
    const [selectCurentIndexPair, setSelectCurrentIndexPair] = useState<any>()
    const datepairs = useSelector((state: RootState) => state.serviceForm.datepairs)
    console.log("datepairs", datepairs)
    const dispatch = useDispatch()
    // Function to get the start of last week
    const getLastWeekStartDate = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, etc.
        const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday being the start
        const lastMonday = new Date(today);
        lastMonday.setDate(today.getDate() - daysSinceMonday - 7); // Go back to the previous Monday (last week)
        return lastMonday;
    };

    // Function to get the start of the current week (Monday)
    const getCurrentWeekStartDate = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, etc.
        const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday being the start
        const currentMonday = new Date(today);
        currentMonday.setDate(today.getDate() - daysSinceMonday); // Go back to this week's Monday
        return currentMonday;
    };

    // Function to calculate the start of the next week (Monday of the next week)
    const getNextWeekStartDate = () => {
        const currentWeekStartDate = getCurrentWeekStartDate();
        const nextMonday = new Date(currentWeekStartDate);
        nextMonday.setDate(currentWeekStartDate.getDate() + 7); // Move to next week's Monday
        return nextMonday;
    };

    // Function to calculate the date for a given day of the week (0 = Monday, 6 = Sunday)
    const getDateForDay = (weekStartDate, day) => {
        const dayIndex = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ].indexOf(day.toLowerCase());
        const resultDate = new Date(weekStartDate);
        resultDate.setDate(weekStartDate.getDate() + dayIndex); // Add the correct number of days to the week's start
        return resultDate.toDateString(); // Return as a readable date string
    };

    // Handle selection for pairs from last week
    const selectLastWeekDatePairs = (index) => {
        setSelectPrevioustIndexPair(index)
        setSelectCurrentIndexPair(null)

        const selectedPair = lasttWeekPairs?.find((_, id) => id === index);
        const lastWeekStartDate = getLastWeekStartDate();
        const currentWeekStartDate = getCurrentWeekStartDate();

        if (selectedPair) {
            if (selectedPair.firstDay === "sunday" && selectedPair.secondDay === "monday") {
                // Special case: Sunday from last week and Monday from current week
                const sundayLastWeek = getDateForDay(lastWeekStartDate, "sunday");
                const mondayCurrentWeek = getDateForDay(currentWeekStartDate, "monday");
                // console.log(`1st Attepmt Date: ${sundayLastWeek} - 2nd Attepmt Date: ${mondayCurrentWeek}`);
                const data = {
                    firstAttepmtDate: sundayLastWeek,
                    secondAttepmtDate: mondayCurrentWeek,
                }
                dispatch(addDatePairModalReducer(data))
                dispatch(isDatePairModalReducer(false))
            } else {
                // Normal case: Both days are from last week
                const firstDayDate = getDateForDay(lastWeekStartDate, selectedPair.firstDay);
                const secondDayDate = getDateForDay(lastWeekStartDate, selectedPair.secondDay);
                // console.log(`Last Week Pair: ${selectedPair.firstDay}-${selectedPair.secondDay}`);
                // console.log(`1st Attepmt Date: ${firstDayDate} - 2nd Attepmt Date ${secondDayDate}`);
                const data = {
                    firstAttepmtDate: firstDayDate,
                    secondAttepmtDate: secondDayDate,
                }
                dispatch(addDatePairModalReducer(data))
                dispatch(isDatePairModalReducer(false))
            }
        }
    };

    // Handle selection for pairs from the current week
    const selectCurrentWeekDatePairs = (index) => {
        setSelectCurrentIndexPair(index)
        setSelectPrevioustIndexPair(null)


        const selectedPair = currentWeekPairs?.find((_, id) => id === index);
        const currentWeekStartDate = getCurrentWeekStartDate();
        const nextWeekStartDate = getNextWeekStartDate();

        if (selectedPair) {
            if (selectedPair.firstDay === "sunday" && selectedPair.secondDay === "monday") {
                // Special case: Sunday from current week and Monday from next week
                const sundayCurrentWeek = getDateForDay(currentWeekStartDate, "sunday");
                const mondayNextWeek = getDateForDay(nextWeekStartDate, "monday");
                // console.log(`1st Attepmt Date: ${sundayCurrentWeek} - 2nd Attepmt Date: ${mondayNextWeek}`);
                const data = {
                    firstAttepmtDate: sundayCurrentWeek,
                    secondAttepmtDate: mondayNextWeek,
                }
                dispatch(addDatePairModalReducer(data))
                dispatch(isDatePairModalReducer(false))
            } else {
                // Normal case: Both days are from the current week
                const firstDayDate = getDateForDay(currentWeekStartDate, selectedPair.firstDay);
                const secondDayDate = getDateForDay(currentWeekStartDate, selectedPair.secondDay);
                // console.log(`Current Week Pair: ${selectedPair.firstDay}-${selectedPair.secondDay}`);
                // console.log(`1st Attempt Date: ${firstDayDate} -2nd Attepmt Date ${secondDayDate}`);
                const data = {
                    firstAttepmtDate: firstDayDate,
                    secondAttepmtDate: secondDayDate,
                }
                dispatch(addDatePairModalReducer(data))
                dispatch(isDatePairModalReducer(false))
            }
        }
    };



    // Helper function to check if a date falls within the current week
    const isCurrentWeek = (date) => {
        const currentWeekStartDate = getCurrentWeekStartDate();
        const nextWeekStartDate = getNextWeekStartDate();
        return date >= currentWeekStartDate && date < nextWeekStartDate;
    };

    // Helper function to check if a date falls within the last week
    const isLastWeek = (date) => {
        const lastWeekStartDate = getLastWeekStartDate();
        const currentWeekStartDate = getCurrentWeekStartDate();
        return date >= lastWeekStartDate && date < currentWeekStartDate;
    };

    // Handle logic for displaying date pairs
    const selectedPair = { firstAttemptDate: "2024-09-18", secondAttemptDate: "2024-09-19" }; // Example dates

    const firstDate = new Date(datepairs?.firstAttemptDate);
    const secondDate = new Date(datepairs?.secondAttemptDate);

    const showInCurrentWeek = isCurrentWeek(firstDate) && isCurrentWeek(secondDate);
    const showInLastWeek = isLastWeek(firstDate) && isLastWeek(secondDate);

    // Helper function to get the day name from a date
    const getDayName = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    console.log(getDayName(firstDate), selectedPair.firstAttemptDate, "-", getDayName(secondDate), selectedPair.secondAttemptDate)

    const modalBody = (
        <div className="mb-4">
            <h1 className="font-medium">Days Pairs</h1>
            <div className="flex items-center gap-x-8 flex-wrap border-[1px] p-4 rounded-md border-borderColor">
                {/* last week's days starts */}
                <div className="w-[48%]">
                    <h1 className="font-medium">Last Week Pairs</h1>

                    {lasttWeekPairs?.map((data, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex items-center w-auto gap-x-2 capitalize cursor-pointer px-4 py-1 rounded-md 
                                    ${selectCurentIndexPair === null && selectPreviousIndexPair === index ? "bg-primaryColor text-whiteColor" : "transparent"
                                    }`}
                                onClick={() => {
                                    selectLastWeekDatePairs(index);
                                }}
                            >
                                <p>{data?.firstDay}</p> - <p>{data?.secondDay}</p>
                            </div>
                        );
                    })}
                    {showInLastWeek ? (
                        <div className="px-4 py-1 bg-primaryColor text-whiteColor rounded-lg">
                            <p>Selected Date Pairs</p>
                            <div className="flex items-center gap-x-2 ">
                                {/* <p>{selectedPair.firstAttemptDate}</p> - <p>{selectedPair.secondAttemptDate}</p> */}
                                <p>
                                    {`${getDayName(firstDate)}, ${selectedPair.firstAttemptDate}`} - {`${getDayName(secondDate)}, ${selectedPair.secondAttemptDate}`}
                                </p>
                            </div>
                        </div>
                    ) : <div className="px-4 py-8 text-whiteColor rounded-lg"></div>}
                </div>
                {/* last week's days ends */}
                {/* current week's days starts */}
                <div className="w-[48%]">
                    <h1 className="font-medium">Current Week Pairs</h1>

                    {currentWeekPairs?.map((data, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex w-auto items-center gap-x-2 capitalize cursor-pointer px-4 py-1 rounded-md 
                                    ${selectPreviousIndexPair === null && selectCurentIndexPair === index ? "bg-primaryColor text-whiteColor" : "transparent"
                                    }`} onClick={() => {
                                        selectCurrentWeekDatePairs(index);
                                    }}
                            >
                                <p>{data?.firstDay}</p> - <p>{data?.secondDay}</p>
                            </div>
                        );
                    })}
                    {showInCurrentWeek ? (
                        <div className="px-4 py-1 bg-primaryColor text-whiteColor rounded-lg">
                            <p>Selected Date Pairs</p>
                            <div className="flex items-center gap-x-2">

                                {`${getDayName(firstDate)}, ${selectedPair.firstAttemptDate}`} - {`${getDayName(secondDate)}, ${selectedPair.secondAttemptDate}`}

                                {/* <p>{selectedPair.firstAttemptDate}</p> - <p>{selectedPair.secondAttemptDate}</p> */}
                            </div>
                        </div>
                    ) : <div className="px-4 py-8 text-whiteColor rounded-lg"></div>}
                </div>
                {/* current week's days ends */}
            </div >
        </div >
    );

    return (
        <Modal
            modalBody={modalBody}
            borderButtonText="cancel"
            onBorderButtonClick={() => { dispatch(isDatePairModalReducer(false)) }}
        // filledButtonText="add"
        />
    );
};

export default DatePairsModal;
