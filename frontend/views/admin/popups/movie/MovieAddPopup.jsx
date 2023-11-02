import {Fragment, useRef} from "react";
import axiosClient from "../../../../api/axios-client.js";
import {useDispatch} from "react-redux";
import {Input} from "../Input.jsx";
import {setMovies} from "../../../../reducers/admin/movies/slice.js";
import {InputFile} from "../InputFile.jsx";

export function MovieAddPopup({onClose}) {
    const dispatch = useDispatch()
    const name = useRef(null)
    const description = useRef(null)
    const duration = useRef(null)
    const origin = useRef(null)
    const file = useRef(null)

    const form = () => {
        const items = {
            name: name.current.value,
            description: description.current.value,
            duration: duration.current.value,
            origin: origin.current.value,
            file: file.current.files[0],
            color: Math.floor(Math.random() * 16777215).toString(16),
        }
        const formData = new FormData()
        for (const [key, value] of Object.entries(items)) {
            formData.append(key, value)
        }
        return formData
    }

    const onSubmit = async () => {
        await axiosClient.post('/movies', form())
        const {data} = await axiosClient.get('/movies')
        dispatch(setMovies(data))
        onClose()
    }

    return (
        <Fragment>
            <Input refInput={name} attrName={'name'} title={'Название фильма'}/>
            <Input refInput={description} attrName={'description'} title={'Описание фильма'}/>
            <Input refInput={duration} attrName={'duration'} title={'Длительность фильма'} type={'number'}/>
            <Input refInput={origin} attrName={'origin'} title={'Страна выпуска'}/>
            <InputFile refInput={file} attrName={'file'} title={'Постер для фильма'}/>
            <div className="conf-step__buttons text-center">
                <button className="conf-step__button conf-step__button-accent" onClick={onSubmit}>Добавить фильм
                </button>
                <button className="conf-step__button conf-step__button-regular" onClick={onClose}>Отменить</button>
            </div>
        </Fragment>
    )
}
