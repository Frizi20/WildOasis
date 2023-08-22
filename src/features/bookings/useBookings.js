import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();

    //Filter
    const filterValue = searchParams.get("status") || "all";
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    //Sort

    const sortedValue = searchParams.get("sortBy") || "startDate-desc";
    const [field, order] = sortedValue.split("-");

    const sortBy = { field, order };

    //PAGINATION
    const pageQuery = Number(searchParams.get("page"));

    const page = !pageQuery ? 1 : pageQuery;

    const data = useQuery({
        queryFn: () => {
            return getBookings({ filter, sortBy, page });
        },
        queryKey: ["bookings", filter, sortBy, page],
    });

    //PREFETCHING
    const pageCount = Math.ceil(data?.data?.count / PAGE_SIZE);

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryFn: () => {
                return getBookings({ filter, sortBy, page: page + 1 });
            },
            queryKey: ["bookings", filter, sortBy, page + 1],
        });
    }

    if(page > 1){
        queryClient.prefetchQuery({
            queryFn: () => {
                return getBookings({ filter, sortBy, page: page - 1});
            },
            queryKey: ["bookings", filter, sortBy, page - 1],
        });
    }

    return {
        isLoading: data.isLoading,
        data: data.data,
        count: data?.data?.count,
    };
}
