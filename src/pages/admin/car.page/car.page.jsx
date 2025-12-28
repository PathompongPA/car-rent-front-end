import { useLoaderData, useRevalidator } from "react-router";
import { Box, Btn, CardBrand, CardCar, FormCreateBrand, FormEditBrand, FormEditCar, Loading, Modal, Title } from "./components";
import { useAlertMsg, useBrand, useCar } from "./hook";
import Alert from "./components/alert.component";

export default function CarPage() {
    let revalidator = useRevalidator()
    const { Brand, Car } = useLoaderData();
    const alert = useAlertMsg();
    const { brands, isReOder, brandEvent, isEditBrand, isCreateBrand, newBrand, editPosition } = useBrand(Brand);
    const { cars, carEvent, positionEditCar, isReOderCar, isEditCar } = useCar(Car.data, alert.event);

    const onOpenBrandEdit = (index) => { brandEvent.editBrand(index); }
    const onOpenBrandCreate = () => { brandEvent.createBrand(); }
    const onDragStart = (index, e) => { brandEvent.drag.start(index, e) }
    const onDragOver = (index, e) => { e.preventDefault(); brandEvent.drag.over(index, e) }
    const onDragLeave = (e) => { brandEvent.drag.leave(e) }
    const onDrop = (e) => { brandEvent.drag.drop(e) }
    const onCancelEditBrand = () => { brandEvent.cancelOrder(); }
    const onCancelCreateBrand = () => { brandEvent.clearNewBrand(); }
    const onSaveEditBrand = () => { brandEvent.updateBrand() }
    const onSaveBrandOder = () => { brandEvent.updateOrder() }
    const onCancelBrandOrder = () => { brandEvent.cancelOrder() }
    const onChangeImageEditBrand = (image) => brandEvent.changeImage(image)
    const onChangeNameEditBrand = (name) => brandEvent.changeName(name)

    const onChangeImageNewBrand = (image) => brandEvent.changeImageCreate(image)
    const onChangeNameNewBrand = (name) => brandEvent.changeNameCreate(name)
    const onSaveNewBrand = () => { brandEvent.saveNewBrand() }


    const onSaveOrderCar = () => { carEvent.order.save() }
    const onCancelOrderCar = () => { carEvent.order.cancel() }
    const onClickCar = (index) => { carEvent.edit.open(index) }
    const onDragStartCar = (index, e) => { carEvent.drag.start(index, e) }
    const onDragOverCar = (index, e) => { e.preventDefault(); carEvent.drag.over(index, e) }
    const onDragLeaveCar = (e) => { carEvent.drag.leave(e) }
    const onDropCar = (e) => { carEvent.drag.drop(e) }

    const oncloseAlert = () => { alert.event.clear() }

    let ToolBar = Box
    let BrandManager = Box
    let ListBrand = Box
    let CarManager = Box
    let ListCar = Box


    return (
        <Box className="my-18 w-full max-w-[1070px] gap-8 p-4 " variant="col">

            <BrandManager variant={"col"} className="gap-4">
                <ToolBar variant="row-between">
                    <Title variant="secondary">ยี่ห้อ</Title>
                    <Box>
                        {isReOder &&
                            <Box>
                                <Btn variant="ghost" size="small" onClick={onSaveBrandOder}>บันทึก</Btn>
                                <Btn variant="ghost" size="small" onClick={onCancelBrandOrder} >ยกเลิก</Btn>
                            </Box>
                        }
                        <Btn variant="primary" onClick={onOpenBrandCreate}>เพิ่มยี่ห้อใหม่</Btn>
                    </Box>
                </ToolBar>
                <ListBrand className={"grid grid-cols-4 md:grid-cols-8"}>
                    {brands?.map(({ brandName, brandImg, cars }, index) =>
                        <CardBrand
                            name={brandName}
                            img={brandImg}
                            isActive={cars.length <= 0}
                            onOpenEdit={(e) => onOpenBrandEdit(index, e)}
                            onDragStart={(e) => onDragStart(index, e)}
                            onDragOver={(e) => onDragOver(index, e)}
                            onDragLeave={(e) => onDragLeave(e)}
                            onDrop={(e) => onDrop(e)}
                            key={index}
                        />
                    )}
                </ListBrand>

            </BrandManager>
            {isEditBrand && brands &&
                <Modal >
                    <FormEditBrand title={"แก้ไข"}
                        name={brands[editPosition]?.brandName}
                        img={brands[editPosition]?.brandImg}
                        onChangeImage={onChangeImageEditBrand}
                        onChangeName={onChangeNameEditBrand}
                        onCancel={onCancelEditBrand}
                        onSave={onSaveEditBrand}
                    />
                </Modal>
            }
            {isCreateBrand && newBrand &&
                <Modal >
                    <FormCreateBrand title={"เพิ่ม"}
                        name={newBrand?.brandName}
                        img={newBrand?.brandImg}
                        onChangeImage={onChangeImageNewBrand}
                        onChangeName={onChangeNameNewBrand}
                        onCancel={onCancelCreateBrand}
                        onSave={onSaveNewBrand}
                    />
                </Modal>
            }

            <CarManager variant="col" className={"gap-4"}>
                <ToolBar variant="row-between" >
                    <Title variant="secondary">รถ</Title>
                    <Box>
                        {isReOderCar &&
                            <Box>
                                <Btn variant="ghost" size="small" onClick={onSaveOrderCar}>บันทึก</Btn>
                                <Btn variant="ghost" size="small" onClick={onCancelOrderCar} >ยกเลิก</Btn>
                            </Box>
                        }
                        <Btn variant="primary" onClick={onOpenBrandCreate}>เพิ่มรถใหม่</Btn>
                    </Box>
                </ToolBar>
                <ListCar className="grid grid-cols-2 md:grid-cols-3">
                    {cars?.map(({ carThumbnail, carName, brand, isDelete }, index) =>
                        <CardCar
                            name={carName}
                            brand={brand.brandName}
                            img={carThumbnail}
                            isShow={isDelete}
                            onToggleHide={() => carEvent.toggleHide(index)}
                            onClick={() => { onClickCar(index) }}
                            onDragStart={(e) => onDragStartCar(index, e)}
                            onDragOver={(e) => onDragOverCar(index, e)}
                            onDragLeave={(e) => onDragLeaveCar(e)}
                            onDrop={(e) => onDropCar(e)}
                            key={index}
                        />
                    )}
                </ListCar>
            </CarManager>

            {isEditCar &&
                <Modal>
                    <FormEditCar
                        allBrand={brands}
                        thumbnail={cars[positionEditCar].carThumbnail}
                        name={cars[positionEditCar].carName}
                        images={cars[positionEditCar].Imgs}
                        brandId={cars[positionEditCar].brandId}
                        description={cars[positionEditCar].carDescription}

                        onChangeName={carEvent.edit.name.change}
                        onChangeBrand={carEvent.edit.brand.change}
                        onDeleteImage={carEvent.edit.images.delete}

                        offer={cars[positionEditCar].offers}
                        onAddOffer={carEvent.edit.offer.add}
                        onDeleteOffer={carEvent.edit.offer.delete}
                        onChangePrice={carEvent.edit.offer.changePrice}
                        onChangeDay={carEvent.edit.offer.changeDay}

                        onChangeDescription={carEvent.edit.description.change}
                        onChangeThumbnail={carEvent.edit.thumbnail.change}
                        onAddImages={carEvent.edit.images.add}
                        onClose={carEvent.edit.close}
                        onSave={carEvent.edit.save}

                        onDragStart={carEvent.edit.images.drag.start}
                        onDragOver={carEvent.edit.images.drag.over}
                        onDragLeave={carEvent.edit.images.drag.leave}
                        onDrop={carEvent.edit.images.drag.drop}
                    />
                </Modal>
            }

            <Loading isLoading={revalidator.state === "loading"} />
            <Alert msg={alert.state.msg} onClose={oncloseAlert} />

        </Box>
    )
};
