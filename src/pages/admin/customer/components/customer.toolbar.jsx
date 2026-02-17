import { InputSearch } from "../../../../components/inputs";
import { Box, Btn, Title } from "../../car.page/components";

export default function CustomerToolBar({ onFilterChange, onClickCreateBtn, onDownLoadCsv }) {
    return (
        <Box className={"flex-col md:flex-row md:justify-between gap-8"}  >
            <Title> รายชื่อลูกค้า </Title>
            <Box variant={"row-between"} className={"md:justify-end gap-4 "}>
                <InputSearch className={"md:text-end w-full md:w-fit"} onChange={onFilterChange} >ค้นหาลูกค้า</InputSearch>
                <Box>
                    <Btn onClick={onClickCreateBtn}> <i className="fa-solid fa-plus"></i> </Btn>
                    <Btn onClick={onDownLoadCsv}> <i className="fa-solid fa-file-csv"></i></Btn>
                </Box>
            </Box>
        </Box>
    )
};
