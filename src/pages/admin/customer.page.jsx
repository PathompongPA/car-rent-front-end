import { useLoaderData } from "react-router";
import { FormCustomer } from "../../components/admin";
import { useEffect, useState } from "react";

export default function CustomerPage() {
    const { Customer } = useLoaderData();
    const [data, setData] = useState(Customer.data)

    useEffect(() => {
    }, [data])

    function filterChange(e) {
        const searchValue = e.target.value.toLowerCase();
        const filtered = Customer.data.filter((customer) => customer.customerName.includes(searchValue));
        setData(filtered)
    }

    return (
        <div className="flex flex-col h-full justify-center items-center *:md:overflow-y-hidden w-full gap-4 *:not-first:border *:border-gray-800  md:w-7xl *:rounded-lg *:md:p-4 *:gap-4 pt-20 ">
            <h1 className="  hidden md:block text-description-1 md:text-title-3 font-bold text-center">ข้อมูลลูกค้า</h1>

            <div className=" flex flex-col w-full md:grid md:grid-cols-2 ">
                <div className=" flex flex-col  ">
                    <div className="md:py-4">
                        <h1 className=" p-1  text-description-1 font-bold">เพิ่มลูกค้า</h1>
                    </div>
                    <FormCustomer />
                </div>
                <div className=" md:max-h-[100vh] flex flex-col md:gap-4 p-4" >
                    <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
                        <h1 className=" text-description-1 font-bold">ลูกค้าทั้งหมด</h1>
                        <input className="border border-gray-800 p-2  rounded-lg w-full md:w-fit " type="text" placeholder="ค้นหาด้วยชื่อ" onChange={filterChange} />
                    </div>
                    <div className=" h-[50vh] py-4 md:min-h-[60vh] overflow-y-scroll md:overflow-y-auto md:p-2 ">
                        {data?.map((item) => {
                            console.log("item ", item)
                            return <FormCustomer index={item.id} isCard={true} data={item} key={item.id} />
                        }
                        )}
                    </div>
                </div>
            </div>

        </div>
    )

};
