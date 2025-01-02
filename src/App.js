import { useEffect, useState } from "react";
const KEY = "f8f1b15c";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('batman');

  useEffect(() => {

    // 1st step create object controller !!
    const controller = new AbortController();

    // 2nd step link cleaner to api !!
    fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => data.Response === "True" && setMovies(data.Search))

    // ! Only show error in log (fofr developer to troubleshoot)
    .catch((err) => console.log(err));

    // 3rd step call the abort in return !!
    return () => controller.abort();
  }, [query]);

  // !! fetch re-renders many times because it is in the App component,, the STATE (movies) changes = re-renders many times in line 9

  return (
    <div>
      <h1>Movies</h1>
      <input type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)}/>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
