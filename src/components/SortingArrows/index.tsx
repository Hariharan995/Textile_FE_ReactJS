import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import "./styles.scss";

type Props = {
    setSort: (sort: string) => void
    fieldName: string
    setFieldName: (e: string) => void
}

export const SortingIcons: React.FC<Props> = ({ setSort, fieldName, setFieldName }) => {

    const handleOnSort = (sort_type: string) => {
        setSort(sort_type);
        setFieldName(fieldName);
    };

    return (
        <span className='arrows'>
            <ArrowDropUp onClick={() => handleOnSort("ASC")} />
            <ArrowDropDown onClick={() => handleOnSort("DESC")} />
        </span>
    );
};