import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <p>Error: {error.status}</p>

      <Link to="-1">&larr; Go back</Link>
    </div>
  );
}

export default Error;
