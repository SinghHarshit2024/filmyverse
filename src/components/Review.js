import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "./firebase/Firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

function Review({ id, prevRating, userRated }) {
  const useAppstate = useContext(Appstate);
  const Navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [loading, setloading] = useState(false);
  const [form, setform] = useState("");
  const [data, setdata] = useState([]);
  const [reviewsloading, setreviewsloading] = useState(false);
  const [newAdded , setNewAdded]=useState('0');
  const sendReview = async () => {
    setloading(true);
    try {
      if(useAppstate.login){
      await addDoc(reviewsRef, {
        movieid: id,
        name: useAppstate.username,
        rating: rating,
        thought: form,
        timestamp: new Date().getTime(),
      });
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });
      setRating(0);
      setform("");
      setNewAdded(newAdded+1);
      swal({
        title: "Review Sent",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
    }else{
      Navigate('/login')
    }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setloading(false);
  };

  useEffect(() => {
    async function getData() {
      setreviewsloading(true);
      setdata([]);
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setdata((prev) => [...prev, doc.data()]);
      });
      setreviewsloading(false);
    }
    getData();
  }, [newAdded]);

  return (
    <div className="mt-4 w-full text-white">
      <ReactStars
        size={25}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={form}
        onChange={(e) => setform(e.target.value)}
        placeholder="Share Your Thoughts...."
        className="w-full p-2 header outline-none"
      />
      <button
        onClick={sendReview}
        className="w-full flex justify-center  p-2 bg-green-500"
      >
        {loading ? <TailSpin height={25} color="white" /> : "Share"}
      </button>

      {reviewsloading ? 
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
       : 
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div className=" border-gray-200 header border-b p-2 mt-2 w-full" key={i}>
                <div className="flex items-center">
                <p className="text-blue-500">{e.name}</p>
                <p className="ml-3 text-xs">{new Date(e.timestamp).toLocaleString()}</p>
              </div>
              <ReactStars
              size={15}
              half={true}
              value={e.rating}
              edit={false}
              />
              <p>{e.thought}</p>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default Review;
