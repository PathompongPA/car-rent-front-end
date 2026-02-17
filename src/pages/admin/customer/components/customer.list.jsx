import { Box, Btn, Title } from "../../car.page/components";

export default function CustomerList({ customer, customerEvent, formatPhone, }) {
    return (
        <Box variant={"col"} className={"overflow-y-scroll max-h-[70vh]"}>
            {customer?.map(({ id, customerName, customerLastName, customerPhone }, index) => (
                <Box key={id} variant={"row-between"} className={" p-4 h-fit w-full items-center rounded-lg gap-8  bg-gray-800/20 hover:bg-gray-800/50 hover:cursor-pointer duration-300"} onClick={() => customerEvent.detail.open(index)}   >
                    <Box className={"w-full flex-col md:flex-row md:justify-between"} >
                        <Box variant={"row"}>
                            <Title variant={"third"} className={"text-gray-300 col-span-3 md:col-span-2"}>{customerName}</Title>
                            <Title variant={"third"} className={"text-gray-300 col-span-8 md:col-span-2"}>{customerLastName}</Title>
                        </Box>
                        <Title variant={"third"} className={"text-gray-500 col-span-12 md:text-lg md:col-span-8 md:text-end"}>{formatPhone(customerPhone)}</Title>
                    </Box>
                    <Btn onClick={(e) => { e.stopPropagation(); customerEvent.pdf.open(index) }}>
                        <Title variant={"secondary"}>
                            <i className="fa-regular fa-file-lines"></i>
                        </Title>
                    </Btn>
                </Box>
            )
            )}
        </Box>
    )

};
