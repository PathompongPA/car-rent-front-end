import { Document, Font, Image, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
import font from "../../../../assets/font/IBM_Plex_Sans_Thai/IBMPlexSansThai-Medium.ttf"
import { Box } from "../../car.page/components";
function fomatDate(date) {
    const d = new Date(date);
    const pad = n => n.toString().padStart(2, "0");
    const formatted =
        `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ` +
        `${pad(d.getHours())}:${pad(d.getMinutes())}`;

    return formatted;
}

function DocumentCustomer({ name, lastName, phone, idCard, driverLicense, facebook, updatedAt }) {
    Font.register({ family: "IBMPlexSansThai", src: font });
    const styles = StyleSheet.create({
        page: {
            fontFamily: "IBMPlexSansThai",
            flexDirection: 'row',
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
            marginTop: 16,
        },
        section: {
            fontSize: 12,
            margin: 8,
            padding: 8,
            flexGrow: 1,
            gap: 16
        },
        title: {
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
        },
        subtitle: {
            fontSize: 14,
            fontWeight: "bold",
        },
        text: {
            fontSize: 10,
            paddingHorizontal: 8,
            color: "rgb(69, 69, 69)"
        },
        stamp: {
            display: "flex",
            top: "8px",
            fontSize: 8,
            color: "grey"
        },
        row: {
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            justifyContent: "space-between"
        }

    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.stamp}>วันที่ : {fomatDate(Date.now())}</Text>
                        <Text style={styles.stamp}>แก้ไขล่าสุด : {fomatDate(updatedAt)}</Text>
                    </View>
                    <Text style={styles.title}>ข้อมูลลูกค้า</Text>
                    <Text style={styles.subtitle}> ข้อมูลทั่วไป</Text>
                    <View >
                        <Text style={styles.text}>ชื่อ : {name} {lastName}</Text>
                        <Text style={styles.text}>เบอร์โทร : {phone}</Text>
                    </View>
                    <Text style={styles.subtitle}> เอกสาร</Text>
                    <View style={{ display: 'flex', flexDirection: "column", alignItems: "center", gap: "8px" }}>
                        <Image style={{ width: "90%", marginTop: "8px" }} src={idCard} />
                        <Image style={{ width: "90%", marginTop: "8px" }} src={driverLicense} />
                        <Image style={{ width: "90%", marginTop: "8px" }} src={facebook} />
                    </View>
                    <Text style={styles.subtitle}>ประวัติการจอง</Text>
                </View>
            </Page>
        </Document >)
}
export default function CustomerPdf({ customerPdf, customerEvent }) {
    return (
        <Box variant={"col"} className={" fixed top-0 left-0 bg-black/50 w-full h-full flex justify-center hover:cursor-pointer z-50 items-center"} onClick={customerEvent.pdf.close} >
            <Box className={"w-[90%] md:w-[80%] h-[80%]"}>
                {customerPdf &&
                    <PDFViewer style={{ height: "100%", width: "100%", aspectRatio: 'A4', }}>
                        <DocumentCustomer name={customerPdf?.customerName} lastName={customerPdf?.customerLastName} phone={customerPdf?.customerPhone} idCard={customerPdf?.customerIdCard} driverLicense={customerPdf?.customerDriverLicense} facebook={customerPdf?.customerFacebook} createdAt={customerPdf?.createdAt} updatedAt={customerPdf?.updatedAt} />
                    </PDFViewer>
                }
            </Box>
        </Box>
    )


};
