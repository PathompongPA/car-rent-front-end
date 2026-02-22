import SocialMedia from "./socialMedia/social.media.component";
import useFormContentAdmin from "./formContent.admin.hook";
import FormQuestion from "./FAQ/faq.component";
import { Button } from "../../materials";
import FormAddress from "./address/address.content.admin.component";
import FormBookingStep from "./bookingStep/booking.step.component";
import FormContact from "./contact/contact.admin.component.";
import FormNavbar from "./navbar/navbar.content.admin.component";
import ViewBoard from "./viewBoard/view.board.admin.component";
import { cva } from "class-variance-authority";


function ButtonSave({ children, onClick, className }) {
    let style = cva(" z-40 bg-blue-700 border border-gray-800 p-4 rounded-lg hover:bg-blue-900 cursor-pointer active:bg-blue-950 active:scale-95 duration-200")
    return <button className={style({ className })} type="button" onClick={onClick}>{children}</button>
}
let ButtonChangeLanguage = ButtonSave

export default function FormContent() {
    // const { Content } = useLoaderData();
    const { ui, on } = useFormContentAdmin()
    return (
        <form className=" form-content p-4 pt-20 pb-16 w-full h-fit xl:w-[1070px] grid grid-cols-2 gap-4 border ">
            <FormNavbar onUpdate={on.update.navbar} />
            <ViewBoard />
            <FormBookingStep onUpdate={on.update.stepBooking} />
            <FormContact onUpdate={on.update.contact} />
            <FormQuestion onUpdate={on.update.faq} />
            <FormAddress onUpdate={on.update.address} />
            <SocialMedia onUpdate={on.update.socialMedia} />
            <div className=" sticky flex flex-row bottom-4 gap-4 xl:px-4  col-span-2 justify-center w-full left-0 ">
                <ButtonSave onClick={on.toggle.language} className={"bottom-8 right-32"}>{ui.language}</ButtonSave>
                <ButtonSave onClick={on.save} className={"bottom-8 right-8"} >บันทึก</ButtonSave>
            </div>
            {/* <Notification /> */}
            {/* <Loading /> */}
        </form >
    )
};