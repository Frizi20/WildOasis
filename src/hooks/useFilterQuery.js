import { useSearchParams } from "react-router-dom";

export default function useFilterQuery(getCount = false, maxValue, ...args) {
    const [searchParams] = useSearchParams();

    const queryData = {};

    args.forEach((arg) => {
        const param = searchParams.get(arg);

        if (param && arg === "range") {
            const range = (
                param.split(",")[1] <= 0
                    ? [param[0], maxValue]
                    : param.split(",")
            ).map((el) => Number(el));
            queryData[arg] = range;
        } else {
            queryData[arg] = param;
        }
    });

    if (getCount) {
        return Object.values(queryData).filter((el) => !!el).length;
    }

    return queryData;
}
