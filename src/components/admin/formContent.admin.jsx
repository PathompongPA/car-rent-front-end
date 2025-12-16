import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { fetchApi } from "../../utility";
import Loading from "./loading.component";

function useContent(_data) {
    let navigation = useNavigate()
    const [logo, setLogo] = useState(null)
    const [navbar, setNavbar] = useState(null)
    const [viewBoard, setViewBoard] = useState(null)
    const [viewBoardFocus, setViewBoardFocus] = useState(null)
    const [newViewBoard, setNewViewBoard] = useState(null)
    const [bookingCard, setBookingCard] = useState(null)
    const [bookingTitle, setBookingTitle] = useState(null)
    const [contactCard, setContactCard] = useState(null)
    const [contactTitle, setContactTitle] = useState(null)
    const [qaTitle, setQaTitle] = useState(null)
    const [qaCard, setQaCard] = useState(null)
    const [address, setAddress] = useState(null)
    const [socialMedia, setSocialMedia] = useState(null)
    const [notification, setNotification] = useState({ isShow: false, msg: null })
    const [isLoading, setIsLoading] = useState(false)


    const sendNotification = (msg) => setNotification(state => ({ ...state, isShow: true, msg: msg }))
    const clearNewViewBoard = () => setNewViewBoard(null)
    const startLoading = () => setIsLoading(true)
    const endLoading = () => setIsLoading(false)
    const clearForm = () => {
        document.getElementsByClassName("form-content")[0].reset()
    }

    const event = {
        // notification
        closeNotification: () => setNotification(state => ({ ...state, isShow: false })
        ),
        // navbar
        changeNavbarTitle: (index, value) => setNavbar(state => {
            let newSate = [...state]
            newSate[index].text = value
            return newSate
        }),

        //view board
        setImageToViewBoardFocus: (image) => setViewBoardFocus(image),
        increaseViewBoard: (value) => setNewViewBoard(() => value),
        removeViewBoard: (position) => {
            setViewBoard(state => {
                let newState = [...state]
                newState.splice(position, 1)
                return newState
            })
        },

        // booking step
        changeBookingTitle: (title) => setBookingTitle(title),
        changeBookingSubTitle: (positionCard, subtitle) => setBookingCard((state) => {
            let newState = [...state]
            newState[positionCard].title = subtitle
            return newState
        }
        ),
        changeBookingDetail: (positionCard, positionDetail, text) => setBookingCard((state) => {
            let newState = [...state]
            newState[positionCard].detail[positionDetail] = text
            return newState
        }
        ),
        increaseBookingDetail: (indexCard) => setBookingCard((state) => {
            let newState = [...state]
            if (newState[indexCard]?.detail.length <= 6) newState[indexCard].detail.push("")
            return newState
        }),
        removeBookingDetail: (positionCard, positionDetail) =>
            setBookingCard((state) => {
                let newState = [...state]
                newState[positionCard].detail.splice(positionDetail, 1)
                return newState
            }
            ),

        // contact 
        // let contactCard =[
        //     {
        //         title: "",
        //         list: [
        //             { link: "", text: "" }
        //         ]
        //     }
        // ]
        changeTitleContact: (title) => setContactTitle(title),
        increaseContactCard: () => setContactCard(
            state => {
                let newState = [...state]
                newState.push({ title: "", list: [{ link: "", text: "" }] })
                return newState
            }
        ),
        removeContactCard: (indexCard) => setContactCard(
            state => {
                let newState = [...state]
                newState.splice(indexCard, 1)
                return newState
            }
        ),
        changeTitleContactCard: (indexCard, title) => setContactCard(
            state => {
                let newState = [...state]
                newState[indexCard].title = title
                return newState
            }
        ),
        changeLinkContactCard: (indexCard, indexDetail, link) => setContactCard(
            state => {
                let newState = [...state]
                newState[indexCard].list[indexDetail].link = link
                return newState
            }
        ),
        changeTextContactCard: (indexCard, indexDetail, text) => setContactCard(
            state => {
                let newState = [...state]
                newState[indexCard].list[indexDetail].text = text
                return newState
            }
        ),
        increaseContactDetail: (indexCard) => setContactCard(
            state => {
                let newState = [...state]
                if (newState[indexCard].list.length < 4) newState[indexCard].list.push({ link: "", text: "" })
                return newState
            }
        ),
        removeContactDetailCard: (indexCard, indexDetail) => setContactCard(
            state => {
                let newState = [...state]
                newState[indexCard].list.splice(indexDetail, 1)
                return newState
            }
        ),

        // Question
        // onTitleChange, onQuestionChange, onAnswerChange, onIncreaseCard, onRemoveCard
        changeTitleQuestion: (title) => setQaTitle(title),
        increaseQuestionCard: () => setQaCard(state => {
            let newState = [...state]
            newState.push({ answer: "", question: "" })
            return newState
        }),
        removeQuestionCard: (indexCard) => setQaCard(state => {
            let newState = [...state]
            newState.splice(indexCard, 1)
            return newState
        }),
        changeQuestion: (indexCard, text) => setQaCard(state => {
            let newState = [...state]
            newState[indexCard].question = text
            return newState
        }
        ),
        changeAnswer: (indexCard, text) => setQaCard(state => {
            let newState = [...state]
            newState[indexCard].answer = text
            return newState
        }),

        // social
        changeSocialType: (index, value) => setSocialMedia(state => {
            let newState = [...state]
            newState[index].type = value
            return newState
        }),
        changeSocialUrl: (index, value) => setSocialMedia(state => {
            let newState = [...state]
            newState[index].link = value
            return newState
        }),
        removeSocial: (index) => setSocialMedia(state => {
            let newState = [...state]
            newState.splice(index, 1)
            return newState
        }),
        increaseSocial: () => setSocialMedia((state) => {
            if (!state) return [{ type: null, link: null }]
            let newState = [...state]
            newState.push({ type: null, link: null })
            return newState
        }),

        // address
        changeAddress: (address) => setAddress(address),

        // send api
        save: async () => {
            startLoading()
            let data = new FormData(document.getElementsByClassName("form-content")[0])
            let newContent = [
                { id: "logo", value: logo },
                { id: "navbar.title", value: navbar },
                { id: "viewBoard.image", value: viewBoard },
                { id: "journeyBooking.title", value: { text: bookingTitle } },
                { id: "journeyBooking.card", value: bookingCard },
                { id: "contact.title", value: { text: contactTitle } },
                { id: "contact.card", value: contactCard },
                { id: "Qa.title", value: { text: qaTitle } },
                { id: "Qa.card", value: qaCard },
                { id: "footer.address", value: { text: address } },
                { id: "socialMedia", value: socialMedia },
            ]
            data.append("data", JSON.stringify(newContent))
            const { isSuccess, msg } = await fetchApi("POST", "/api/content", data, {});
            endLoading()
            isSuccess ? sendNotification("บันทึกสำเร็จ") : sendNotification(msg)
            isSuccess && navigation(".", { replace: true }) & clearNewViewBoard() & clearForm()
        }
    }

    useEffect(() => {
        _data?.map(({ id, value }) => {
            if (id === "logo") setLogo(value)
            if (id === "navbar.title") setNavbar(value)
            if (id === "viewBoard.image") setViewBoard(value) & setViewBoardFocus(value[0])
            if (id === "journeyBooking.title") setBookingTitle(value.text)
            if (id === "journeyBooking.card") setBookingCard(value)
            if (id === "contact.title") setContactTitle(value.text)
            if (id === "contact.card") setContactCard(value)
            if (id === "Qa.title") setQaTitle(value.text)
            if (id === "Qa.card") setQaCard(value)
            if (id === "footer.address") setAddress(value.text)
            if (id === "socialMedia") setSocialMedia(value)
        })
    }, [_data,])

    return { isLoading, notification, logo, navbar, viewBoard, viewBoardFocus, newViewBoard, contactTitle, contactCard, qaTitle, qaCard, address, socialMedia, event, bookingTitle, bookingCard }
}

function SocialMedia({ socialList, onChangeType, onChangeURL, onAddList, onRemoveList }) {
    let types = ["facebook", "instagram", "line", "tiktok", "X", "youtube"]
    let listType = types.map((type, index) => <option className={``} value={type} key={`type-${index}`} >{type}</option>)

    let listSocialMedia = socialList?.map(({ type, link }, index) => (
        <div className=" col-span-12  w-full grid grid-cols-24 *:not-[button]:not-first:col-span-14 gap-2 " key={`social-media-${index}`} >
            <select className=" col-span-7  p-2  border border-gray-800 rounded-lg  bg-gray-900" onChange={(e) => { onChangeType(index, e.target.value) }} name="" id="" value={type || ""} >
                <option value="" disabled>เลือกประเภท</option>
                {listType}
            </select>
            <input className=" col-span-4" type="text" onChange={(e) => { onChangeURL(index, e.target.value) }} name="Social-link" value={link || ""} placeholder="URL: เช่น https://www . . . ." />
            <button className=" hover:cursor-pointer hover:text-golden-1 duration-150 active:scale-90 col-span-3 p-0 rounded-lg bg-red-800" onClick={(e) => { e.preventDefault(); onRemoveList(index) }}>ลบ</button>
        </div >
    ))

    return (
        <div className=" social-media col-span-full md:col-span-1 border border-gray-800 rounded-lg p-4  w-full gap-3 flex flex-col">
            <div className=" flex  justify-between">
                <h1 className="text-description-1 font-bold col-span-11 w-fit  " htmlFor="">ช่องทางการติตตาม</h1>
                <button className=" --btn bg-gray-800 font-bold rounded-lg p-3 px-4 " onClick={(e) => { e.preventDefault(); onAddList() }} >เพิ่ม</button>
            </div>
            {listSocialMedia}
        </div>
    )
}

function ButtonSave({ onClick }) {
    return <button className=" z-40 bg-blue-700 fixed md:bottom-4 md:right-4   bottom-4 right-4 border border-gray-800 p-4 rounded-lg hover:bg-blue-900 cursor-pointer active:bg-blue-950 active:scale-95 duration-200" type="button" onClick={onClick}>บันทึก</button>
}

function Navbar({ logo, navbar, onTitleChange, onLogoChange }) {
    let Title = ({ text, indexTitleNavbar }) =>
        <input className=" h-fit w-full p-4 " type="text" value={text} placeholder={`เมนูนำทางที่ ${indexTitleNavbar}`} onChange={(e) => { onTitleChange(indexTitleNavbar, e.target.value) }} key={`navbar-title-${indexTitleNavbar}`} />
    let ListNavbar = ({ children }) =>
        <div className=" flex flex-col md:grid md:grid-cols-5 gap-4 items-center ">{children}</div>
    let Logo = () =>
        <div className=" md:h-18  h-fit aspect-16/9 *:w-full *:h-full relative ">
            <label className=" text-2xl bg-gray-800/80 md:bg-gray-800/0 md:text-xs  flex items-center justify-center text-center md:text-transparent absolute top-0 left-0 hover:text-white hover:bg-gray-800/90 hover:cursor-pointer duration-500  " htmlFor="logo"> คลิกเพื่อเปลี่ยนโลโก้ <br /> * ภาพควรเป็น 16:9  </label>
            <img className=" object-cover  " src={logo} alt="logo" />
            <input type="file" name="logo" id="logo" hidden onChange={onLogoChange} accept="image/*" />
        </div>
    return (
        <div className=" col-span-2  p-4 md:py-0  flex flex-col md:flex-row justify-between gap-4 md:gap-[100px] w-full ">
            <Logo />
            <ListNavbar>
                {navbar?.map(({ text }, indexTitleNavbar) =>
                    <Title text={text} indexTitleNavbar={indexTitleNavbar} key={indexTitleNavbar} />
                )}
            </ListNavbar>
        </div>
    )
}

function ViewBoard({ viewBoards, viewBoardFocus, onAddViewBoard, onRemoveViewBoard, onSetToImageFocus, onSend }) {
    let AllImage = ({ children }) => <div className=" grid grid-cols-12 py-4 md:p-4   gap-4 w-full h-[150px] "> {children} </div>
    let SingleImage = ({ children, image, scale, onClick = () => { } }) =>
        <div className={` relative  ${scale} hover:cursor-pointer `} onClick={() => onClick(image)}>
            <img className=" w-full h-full object-cover snap-center bg-gray-800  " src={image} />
            {children}
        </div>
    let BtnDeleteImage = ({ position }) => <button className="  px-3 rounded-xl bg-red-800 absolute right-1 top-1 cursor-pointer  hover:bg-red-700 font-black active:scale-90 duration-150" type="button" onClick={() => { onRemoveViewBoard(position) }} >x</button>
    let BtnAddImage = () =>
        <div className=" col-span-4 md:col-span-2  rounded-xl bg-gray-800 hover:bg-gray-700 m-2  duration-150 active:scale-95 ">
            <label className=" text-center cursor-pointer border-gray-800 rounded-lg h-full flex flex-col justify-center items-center " htmlFor="view-board-image" >
                <h1> คลิกเพื่อเพิ่มรูป </h1> <h1 className=" text-gray-400 text-xs"> * ภาพควรเป็น 16:9 </h1>
            </label>
            <input type="file" name="viewBoard" id="view-board-image" hidden onChange={() => { onAddViewBoard(); onSend() }} multiple accept="image/*" />
        </div>

    return (
        <div className=" col-span-2 px-4 ">
            <SingleImage image={viewBoardFocus} scale={"aspect-21/9"} />
            <AllImage>
                <BtnAddImage />
                <div className=" col-span-8 md:col-span-10 flex gap-4 overflow-x-auto py-4">
                    {viewBoards?.map((image, indexImage) =>
                        <SingleImage image={image} onClick={onSetToImageFocus} key={indexImage} scale={"aspect-16/9"} >
                            <BtnDeleteImage position={indexImage} />
                        </SingleImage>
                    )}
                </div>
            </AllImage>
        </div>
    )
}




function BookingStep({ bookingTitle, bookingList, onTitleChange, onDetailChange, onRemoveDetail, onSubtitleChange, onIncreaseDetail }) {
    let listBooking = bookingList?.map(({ title, detail }, indexCard) => {
        let details = detail?.map((text, indexDetail) =>
            < div className=" w-full grid grid-cols-12 items-center  gap-4 " key={indexDetail} >
                <div className="text-center"> - </div>
                <input className=" col-span-9" type="text" value={text} placeholder="รายละเอียด" onChange={(e) => onDetailChange(indexCard, indexDetail, e.target.value)} />
                < button className=" col-span-2 w-full h-full  bg-red-800 cursor-pointer hover:text-golden-1 text-xs rounded-lg" type="button" onClick={(e) => { e.preventDefault(); onRemoveDetail(indexCard, indexDetail) }}> ลบ</ button >
            </div >)
        return (
            <div className=" border p-4 col-span-full row-span-11  md:col-span-1 md:row-start-3 flex flex-col w-full h-full py-8 gap-4 min-h-[20vh] md:gap-4 md:p-4 justify-start items-center md:border border-gray-800 rounded-lg" key={indexCard}  >
                <div className="grid grid-cols-12 grid-rows-1 w-full gap-4 ">
                    <input className=" col-span-10 text-xl text-center" type="text" placeholder="หัวข้อ" value={title} onChange={(e) => onSubtitleChange(indexCard, e.target.value)} />
                    <button className=" col-span-2 w-full cursor-pointer hover:text-golden-1  bg-gray-800 p-2 rounded-lg" type="button" onClick={() => onIncreaseDetail(indexCard)}>เพิ่ม</button>
                </div>
                <div className=" w-full flex flex-col gap-2">
                    {details}
                </div>
            </div>
        )
    }
    )
    return (
        <div className=" col-span-full grid grid-cols-3 grid-rows-12 gap-4 gap-y-2 md:border p-4 rounded-lg border-gray-800 ">
            <input className=" col-span-full md:col-start-2 row-span-2 md:col-span-1 h-full text-center text-4xl" type="text" defaultValue={bookingTitle} onChange={(e) => onTitleChange(e.target.value)} />
            {listBooking}
        </div>
    )
}

const ContactDetail = ({ text, link, indexCard, indexDetailCardContent, onTextChange, onLinkChange, onRemoveDetailCard }) => (
    <div className="grid grid-cols-12 gap-2 md:items-center *:not-[label,button]:flex-1/2">
        <input className="col-span-5" placeholder="ข้อความแสดงหน้าเว็บ" type="text" value={text} onChange={(e) => onTextChange(indexCard, indexDetailCardContent, e.target.value)} />
        <input className="col-span-5" placeholder="link เช่น https://..." type="text" value={link} onChange={(e) => onLinkChange(indexCard, indexDetailCardContent, e.target.value)} />
        <button className="col-span-2 rounded-lg bg-gray-800 cursor-pointer hover:text-golden-1 p-2" type="button" onClick={() => onRemoveDetailCard(indexCard, indexDetailCardContent)} > X </button>
    </div>
)

const ContactCard = ({ children, indexCard, title, onTitleCardChange, onRemoveCard, onIncreaseDetail }) => (
    <div className="flex flex-col gap-4 p-4 md:gap-4 md:p-4 justify-start">
        <div className="grid grid-cols-12 gap-2">
            <input className="col-span-10 w-full text-center" placeholder="ช่องทาง เช่น โทรศัพท์ line facebook" type="text" value={title} onChange={(e) => onTitleCardChange(indexCard, e.target.value)} />
            <button className="col-span-2 text-center bg-red-800 p-2 rounded-lg cursor-pointer hover:text-golden-1 hover:bg-red-900" type="button" onClick={() => onRemoveCard(indexCard)} > ลบ </button>
        </div>
        <div className="flex flex-col gap-2">
            {children}
        </div>
        <button className="rounded-lg p-1 bg-gray-800 cursor-pointer hover:text-golden-1 hover:bg-gray-700 active:bg-gray-800" type="button" onClick={() => onIncreaseDetail(indexCard)} > เพิ่ม </button>
    </div>
)

function Contact({ title, cards, onTitleChange, onIncreaseCard, onRemoveCard, onTitleCardChange, onLinkChange, onTextChange, onRemoveDetailCard, onIncreaseDetail }) {
    const listContact = cards?.map(
        ({ title, list }, indexCard) => (
            <ContactCard
                key={`contact-card-${indexCard}`}
                indexCard={indexCard}
                title={title}
                onTitleCardChange={onTitleCardChange}
                onRemoveCard={onRemoveCard}
                onIncreaseDetail={onIncreaseDetail}
            >
                {list?.map(({ text, link }, indexDetail) => (
                    <ContactDetail
                        key={`contact-${indexCard}-detail-${indexDetail}`}
                        text={text}
                        link={link}
                        indexCard={indexCard}
                        indexDetailCardContent={indexDetail}
                        onRemoveDetailCard={onRemoveDetailCard}
                        onLinkChange={onLinkChange}
                        onTextChange={onTextChange}
                    />
                ))}
            </ContactCard>
        )
    )

    return (
        <div className="col-span-full grid md:grid-cols-3 gap-4 *:not-first:border *:not-first:rounded-lg *:not-first:border-gray-800 md:border rounded-lg border-gray-800 p-4">
            <div className="md:col-span-3 grid grid-cols-12 gap-4 px-4">
                <input className="col-span-9 col-start-2 md:col-span-11 h-fit w-full text-center text-4xl" type="text" placeholder="ชื่อหัวข้อ เช่น ติดต่อเรา ..." value={title || ""} onChange={(e) => onTitleChange(e.target.value)} />
                <button className="col-span-2 md:col-span-1 rounded-lg p-1 bg-gray-800 cursor-pointer hover:text-golden-1 hover:bg-gray-700 active:bg-gray-800" type="button" onClick={onIncreaseCard} > เพิ่ม </button>
            </div>
            {listContact}
        </div>
    )
}

function Question({ title, cards, onTitleChange, onQuestionChange, onAnswerChange, onIncreaseCard, onRemoveCard }) {
    let list = cards?.map(({ answer, question }, indexCard) => {
        return (
            <div className=" grid grid-cols-13 grid-rows-3 md:grid-rows-1 gap-4 px-4 items-center  border-gray-800 rounded-lg " key={indexCard}>
                <input className=" col-span-full md:col-span-6 md:row-start-1 row-start-1" type="text" name="" placeholder="คำถาม ?" value={question} onChange={e => onQuestionChange(indexCard, e.target.value)} />
                <input className=" col-span-full md:col-span-6 md:row-start-1 row-start-2" type="text" name="" placeholder="กรุณากรอกคำตอบ" value={answer} onChange={e => onAnswerChange(indexCard, e.target.value)} />
                <button className=" col-span-full row-span-1  md:col-span-1 md:row-start-1 row-start-3  p-2 px-4 bg-red-800 rounded-lg cursor-pointer hover:text-golden-1 " type="button" onClick={() => onRemoveCard(indexCard)}>ลบ</button>
            </div>
        )
    })

    return (
        <div className=" col-span-full border flex flex-col gap-4 p-4 rounded-lg border-gray-800 min-h-[40vh]">
            <div className="grid grid-cols-12 gap-4 items-center px-4">
                <input className=" col-span-9 col-start-2 md:col-span-11 text-center text-4xl" type="text" name="" value={title || ""} onChange={e => onTitleChange(e.target.value)} />
                <button className=" col-span-2 md:col-span-1 h-full  bg-gray-800 rounded-lg  hover:text-golden-1 cursor-pointer " type="button" onClick={onIncreaseCard}>เพิ่ม</button>
            </div>
            {list}
        </div>


    )

}
function Address({ address, onAddressChange }) {
    return (
        <div className=" col-span-full md:col-span-1 address flex flex-col md:flex-row border border-gray-800 rounded-lg gap-4 justify-around p-4 *:w-full">
            <div className="  p-4 flex flex-col border border-gray-800 gap-4">
                <h1 className="text-description-1 font-bold" htmlFor="">ที่อยู่</h1>
                <textarea className="p-4 min-h-[20vh]" type="text" name="" defaultValue={address} onChange={(e) => { onAddressChange(e.target.value) }} />
            </div>
        </div>

    )

}
function Notification({ isShow, msg, onCloseNotification }) {
    return (
        isShow &&
        <div className=" fixed  top-0 left-0  w-full h-full bg-black/50 z-50 flex justify-center items-center backdrop-blur-xs delay-300" >
            <div className=" w-[60vw] aspect-square md:max-w-[30vw] xl:max-w-[15vw]  bg-gray-800 flex flex-col justify-around items-center rounded-2xl gap-10 p-8 pb-4 ">
                <h1 className=" text-gray-400 font-black">ข้อความ</h1>
                <h1 className=" text-xl">{msg}</h1>
                <button className=" text-white p-4 py-2 bg-gray-700 rounded-lg  hover:cursor-pointer hover:text-golden-1 hover:bg-gray-600 active:bg-gray-900 active:text-golden-1 active:scale-90 duration-150 " type="button" onClick={onCloseNotification}>รับทราบ</button>
            </div>
        </div>
    )
}

export default function FormContent() {
    const { Content } = useLoaderData();
    const { isLoading, notification, logo, navbar, viewBoard, viewBoardFocus, newViewBoard, contactCard, contactTitle, qaTitle, qaCard, address, socialMedia, bookingCard, bookingTitle, event } = useContent(Content.data)
    return (
        <form className=" form-content pt-20 pb-16 xl:w-[1070px] grid grid-cols-2 gap-4 ">
            <Navbar logo={logo} navbar={navbar} onTitleChange={event.changeNavbarTitle} onLogoChange={event.save} />
            <ViewBoard
                viewBoards={viewBoard}
                viewBoardFocus={viewBoardFocus}
                newViewBoard={newViewBoard}
                onRemoveViewBoard={event.removeViewBoard}
                onSetToImageFocus={event.setImageToViewBoardFocus}
                onAddViewBoard={event.save}
                onSend={event.save}
            />
            <BookingStep
                bookingTitle={bookingTitle}
                bookingList={bookingCard}
                onTitleChange={event.changeBookingTitle}
                onSubtitleChange={event.changeBookingSubTitle}
                onDetailChange={event.changeBookingDetail}
                onIncreaseDetail={event.increaseBookingDetail}
                onRemoveDetail={event.removeBookingDetail}
            />
            <Contact
                title={contactTitle}
                cards={contactCard}
                onTitleChange={event.changeTitleContact}
                onTitleCardChange={event.changeTitleContactCard}
                onIncreaseCard={event.increaseContactCard}
                onRemoveCard={event.removeContactCard}
                onLinkChange={event.changeLinkContactCard}
                onTextChange={event.changeTextContactCard}
                onIncreaseDetail={event.increaseContactDetail}
                onRemoveDetailCard={event.removeContactDetailCard}
            />
            <Question
                title={qaTitle}
                cards={qaCard}
                onTitleChange={event.changeTitleQuestion}
                onIncreaseCard={event.increaseQuestionCard}
                onRemoveCard={event.removeQuestionCard}
                onQuestionChange={event.changeQuestion}
                onAnswerChange={event.changeAnswer}
            />
            <Address address={address} onAddressChange={event.changeAddress} />
            <SocialMedia socialList={socialMedia} onChangeType={event.changeSocialType} onChangeURL={event.changeSocialUrl} onRemoveList={event.removeSocial} onAddList={event.increaseSocial} />

            <ButtonSave onClick={event.save} />
            <Notification isShow={notification.isShow} msg={notification.msg} onCloseNotification={event.closeNotification} />
            <Loading logo={logo} isLoading={isLoading} />
        </form>
    )
};