import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options = {} }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const soryBy = searchParams.get('sortBy') || ''

    function handleChange(e) {
        const { value: optionValue } = e.target;

        searchParams.set("sortBy", optionValue);
        setSearchParams(searchParams);
    }

    return <Select value={soryBy} onChange={handleChange} options={options} type="white" />;
}
