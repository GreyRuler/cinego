import {useState} from "react";
import {Popup} from "../../popups/Popup.jsx";
import {MovieDeletePopup} from "../../popups/movie/MovieDeletePopup.jsx";
import {MovieEditPopup} from "../../popups/movie/MovieEditPopup.jsx";

export function Movie({movie}) {
    const [isShowEdit, setIsShowEdit] = useState(false)
    const [isShowDelete, setIsShowDelete] = useState(false)

    const onCloseEdit = () => setIsShowEdit(false)
    const onCloseDelete = () => setIsShowDelete(false)

    const onDelete = () => setIsShowDelete(true)
    const onEdit = () => setIsShowEdit(true)

    return (
        <div className="conf-step__movie" style={{backgroundColor: `#${movie.color}`}}>
            <div className='conf-step__movie-options'>
                <Popup title='Удаление сеанса' isShow={isShowDelete} onClose={onCloseDelete}>
                    <MovieDeletePopup onClose={onCloseDelete} movie={movie}/>
                </Popup>
                <Popup title='Редактирование сеанса' isShow={isShowEdit} onClose={onCloseEdit}>
                    <MovieEditPopup onClose={onCloseEdit} movie={movie}/>
                </Popup>
                <button className="conf-step__button conf-step__button-trash" onClick={onDelete}></button>
                <button className="conf-step__button conf-step__button-edit" onClick={onEdit}></button>
            </div>
            <div className='conf-step__movie-info'>
                <img className="conf-step__movie-poster" alt={movie.alt} src={`${import.meta.env.VITE_API_BASE_URL}/${movie.image}`}/>
                <div className="conf-step__paragraph">
                    <h3 className="conf-step__movie-title">{movie.name}</h3>
                    <p className="conf-step__movie-duration">{movie.duration} минут</p>
                </div>
            </div>
        </div>
    )
}
