import { Title } from "../../../materials";
import useFormAddress from "./address.content.hook";

export default function FormAddress({ onUpdate }) {
    const { ui, state, on } = useFormAddress(onUpdate);
    return (
        <div className=" col-span-full md:col-span-1 address flex flex-col  border border-gray-800 rounded-lg gap-4 justify-around p-4 *:w-full bg-bg-3/50">
            <Title size={"l"}>{ui.title}</Title>
            <div className="  p-2 flex flex-col border border-gray-800  bg-bg-4 rounded-2xl ">
                <textarea className="p-4 min-h-[20vh] bg-bg-2/50" type="text" placeholder="กรุณากรอก ที่อยู่" name="" value={state.address} onChange={(e) => { on.change.address(e.target.value) }} />
            </div>
        </div>

    )

}