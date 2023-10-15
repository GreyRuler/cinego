import Movie from "./Movie";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axiosClient from "../../../api/axios-client.js";

export default function Movies() {
    const {selectDate} = useSelector((state) => state.navDateReducer.value)
    const [movies, setMovies] = useState([])
    const qParams = new URLSearchParams({
        from: selectDate,
        to: selectDate + 24 * 60 * 60 * 1000,
    })

    const getMoviesForInterval = async () => {
        const {data} = await axiosClient.get(`/movies-for-interval?${qParams}`)
        setMovies(data)
    }

    useEffect(() => {
        getMoviesForInterval()
    }, [selectDate])

    if (!Object.keys(movies).length) return (
        <div>Нет фильмов</div>
    )

    return <main>{Object.keys(movies).map((movie) => <Movie movie={movies[movie]} key={movie}/>)}</main>
}
