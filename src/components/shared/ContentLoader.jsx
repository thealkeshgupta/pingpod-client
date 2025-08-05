import { useState, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const ContentLoader = () => {
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <ClipLoader color="#86b2d7" loading size={75} speedMultiplier={1} />
    </div>
  );
};

export default ContentLoader;
