import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import useFacilities from "./useFacilities";

function CabinTable() {
    // 1. FILTER

    const { isLoading, cabins } = useCabins();
    const { facilities, isLoading:isLoadingFacilities } = useFacilities()

    const [searchParams] = useSearchParams();

    if (isLoading || isLoadingFacilities) return <Spinner />;

    const filter = searchParams.get("discount") || "all";

    let filteredCabbins = [];

    if (filter === "all") filteredCabbins = cabins;
    if (filter === "no-discount")
        filteredCabbins = cabins.filter((cabin) => cabin.discount === 0);
    if (filter === "with-discount") {
        filteredCabbins = cabins.filter((cabin) => cabin.discount > 0);
    }

    // 2. SORT

    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;

    const sortedCabins = filteredCabbins.sort((a, b) => {
        return (a[field] - b[field]) * modifier;
    });

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="table">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => {
                        return <CabinRow cabin={cabin} key={cabin.id}  />;
                    }}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
