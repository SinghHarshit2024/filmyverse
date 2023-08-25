import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import{addDoc} from 'firebase/firestore';
import { moviesRef } from "./firebase/Firebase";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
function AddMovie() {
  const useAppstate = useContext(Appstate);
  const [form, setform] = useState({
    MovieName: "",
    Year: "",
    Description: "",
    img: "",
    rated:'0',
    rating:'0' 
  });
  const Navigate = useNavigate();
  const [loading, setloading] = useState(false);
  
  const addmovie = async() =>{
    setloading(true);
     try{
      if(useAppstate.login){
        await addDoc(moviesRef, form);
    swal({
      title:"Successfully Added",
      icon:"success",
      buttons:false,
      timer:3000
    })
    setform({
      MovieName:"",
      Year:'',
      Description:"",
      img:"",
    })
      }else{
        Navigate('/login')
      }
     }
    catch(err){
      swal({
        title:err.message,
        icon:"error",
        buttons:false,
        timer:3000
      })
      setloading(false);
    }
  }
  return (
    <div className="text-white mt-20">
      <section class="text-gray-300 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-300">
                    Movie Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.MovieName}
                    onChange={(e) =>
                      setform({ ...form, MovieName: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-300">
                    Year
                  </label>
                  <input
                    type="number"
                    id="email"
                    name="email"
                    value={form.Year}
                    onChange={(e) => setform({ ...form, Year: e.target.value })}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-300">
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.img}
                    onChange={(e) => setform({ ...form, img: e.target.value })}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></input>
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.Description}
                    onChange={(e) =>
                      setform({ ...form, Description: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button onClick={addmovie} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white"/>: 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AddMovie;
