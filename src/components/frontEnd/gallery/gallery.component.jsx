import { Reveal } from "../../materials";
import useGallery from "./gallery.hook";
import { style } from "./gallery.style";

export default function GalleryCar() {
    const { ui, state, on } = useGallery();

    return (
        <Reveal>
            <div className={style.gallery()}>
                <div className={style.header()}>
                    <button className={style.btnPreCar()} onClick={on.click.btn.car.pre} data-is-show={state.isShow.btn.car.pre}>{`<`}</button>
                    <h1 className={style.titleHeader()}>{ui.title}</h1>
                    <button className={style.btnNextCar()} onClick={on.click.btn.car.next} data-is-show={state.isShow.btn.car.next}>{`>`}</button>
                </div>
                <div className={style.body()}>
                    <h1 className={style.titleOverlay()}></h1>
                    <img className={style.image()} src={state.img} />
                    <div className={style.images()}>
                        {state?.images?.map((img, index) =>
                            <img className={style.img()} src={img} key={index} onClick={on.click.image.mini} data-is-focus={state.indexImage === index} />
                        )}
                    </div>
                    <button className={style.btnPreImage()} onClick={on.click.btn.image.pre} >{`<`}</button>
                    <button className={style.btnNextImage()} onClick={on.click.btn.image.next} >{`>`}</button>
                </div>
            </div>
        </Reveal>
    )
};
