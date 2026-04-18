import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import MovieDetail from "./MovieDetail";
import Watchlist from "./Watchlist";


const Body = () => {

   

    const appRouter = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      { path: "/movie/:movieId", element: <MovieDetail /> },
      { path: "/watchlist", 
        element: <Watchlist />
     },
    ]);

  


  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body