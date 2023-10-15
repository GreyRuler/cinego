import HallItem from "./HallItem";

export default function Movie({movie}) {
    return (
        <section className="movie">
            <div className="movie__info">
                <div className="movie__poster">
                    <img className="movie__poster-image" alt={movie.alt} src={`${import.meta.env.VITE_API_BASE_URL}/${movie.image}`}/>
                </div>
                <div className="movie__description">
                    <h2 className="movie__title">{movie.name}</h2>
                    <p className="movie__synopsis">{movie.description}</p>
                    <p className="movie__data">
                        <span className="movie__data-duration">{movie.duration} минут</span>
                        <span className="movie__data-origin">{movie.origin}</span>
                    </p>
                </div>
            </div>
            {Object.keys(movie.halls).map((hall) => <HallItem hall={movie.halls[hall]} key={hall}/>)}
        </section>
    )
}
