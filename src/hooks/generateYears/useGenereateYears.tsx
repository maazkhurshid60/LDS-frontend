import { useEffect, useState } from 'react';

const useGenerateYears = (startYear: number, endYear: number) => {
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const yearsArray: number[] = [];
        for (let year = startYear; year <= endYear; year++) {
            yearsArray.push(year);
        }
        setYears(yearsArray);
    }, [startYear, endYear]);

    return years;
};

export default useGenerateYears;
