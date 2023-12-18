"use client";
import { useState } from "react";
import IPlaylist from "../playlist/iPlaylist";
import { apiEndPoint } from "../constants/constants";

export default function UpdatePlayList(props: IPlaylist) {
    const [name, setName] = useState(props.name);
    const [movies, setMovies] = useState<Array<string>>(props.movies);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await fetch(apiEndPoint, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ id: props.id, name: name, movies: movies })
        })
    }

    const handleChange = (e: any, i: number)=>{
        const {value}=e.target
        const onchangeVal = [...movies]
        onchangeVal[i]=value
        setMovies(onchangeVal)
    }

    const handleRemoveMovie = (index: number) => {
        const deleteVal = [...movies]
        deleteVal.splice(index,1)
        setMovies(deleteVal)
    }

    const handleAddMovie = () => {
        setMovies([...movies, '']);
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Name : 
                <input
                    type="text"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            {movies.map((movie, index) => (
                <div key={index}>
                    <label>Movie : 
                        <input
                            type="text"
                            value={movie}
                            onChange={(e)=>handleChange(e,index)}
                        />
                    </label>
                    <button type="button" onClick={() => handleRemoveMovie(index)}>
                        Remove Movie
                    </button>
                </div>
            ))}

            <button type="button" onClick={() => handleAddMovie()}>
                Add Movie
            </button>

            <button type="submit">Submit</button>
        </form>
    )
}