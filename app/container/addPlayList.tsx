// "use client";
import { useContext, useState } from "react";
import IPlaylist from "../playlist/iPlaylist";

export default function AddPlayList() {
    const formData = {
        name : '',
        movies: []
    };
    const [playList, setPlayList] = useState<IPlaylist>(formData);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleRemoveMovie = (movie: string) => {
        setPlayList({...playList, movies: playList.movies.filter((m) => m !== movie)});
    }

    const handleAddMovie = (movie: string) => {
        setPlayList({...playList, movies: [movie]});
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Name : 
                <input
                    type="text"
                    name="Name"
                    value={formData.name}
                />
            </label>

            {formData.movies.map((movie) => (
                <div key={movie}>
                    <label>Movie : 
                        <input
                            type="text"
                            value={movie}
                        />
                    </label>
                    <button type="button" onClick={() => handleRemoveMovie(movie)}>
                        Remove Movie
                    </button>
                </div>
            ))}

            <button type="button" onClick={() => handleAddMovie}>
                Add Movie
            </button>

            <button type="submit">Submit</button>
        </form>
    )
}