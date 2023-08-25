import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Audio, ThreeDots } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "./firebase/Firebase";
import { Link } from "react-router-dom";
function Card() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  

  useEffect(() => {
    async function getData() {
      setloading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setloading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2 ">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          {" "}
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
           <Link to={`/detail/${e.id}`}><div
              key={i}
              className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer md:mt-0 mt-6"
            >
              <img className="h-60 md:h72" src={e.img} alt="abc" />
              <h1 className="text-red-500">
                {e.MovieName}
              </h1>
              <h1 className="flex items-center">
                <span className="text-gray-500">Rating: </span>
                <ReactStars size={20} half={true} edit={false} value={e.rating/e.rated} />
              </h1>
              <h1 className="text-red-500">
                <span className="text-gray-500">Year: </span>
                {e.Year}
              </h1>
            </div></Link>
          );
        })
      )}
    </div>
  );
}

export default Card;
