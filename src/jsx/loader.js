import "../css/loader.css";
import PuffLoader from "react-spinners/PuffLoader";

export default function Loader(props) {
  return (
    <div>
      <div className="loader-container">
        <PuffLoader color="#335ef7" size={100} className="loader" />
      </div>
    </div>
  );
}
