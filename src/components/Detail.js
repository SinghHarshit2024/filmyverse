import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom';
import Review from './Review';
// import { moviesRef } from './firebase/Firebase';
import {getDoc,doc} from 'firebase/firestore';
import { db } from './firebase/Firebase';
import { ThreeCircles } from 'react-loader-spinner';
function Detail() {
    const{id} = useParams();
    const[data, sdata] = useState({
        MovieName:" ",
        Year:"",
        img:"",
        Description:"",
        rating:"0",
        rated:"0",
    });

    const[loading,sloading]=useState(false);

    useEffect(()=>{
        async function getData(){
            sloading(true);
            const _doc = doc(db,"movies",id);
            const _data = await getDoc(_doc);
            sdata(_data.data());
            sloading(false);
        }
        getData();
    },[])
  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
        {loading? <div className='h-96 flex items-center justify-center w-full'><ThreeCircles height={50}/></div>:
        <>
       <img className='h-96 md:sticky md:top-24' src={data.img} alt='abc'/>
       <div className='md:ml-4 ml-0 w-full md:w-1/2'>
        <h1 className='text-gray-500 text-3xl font-bold'>{data.MovieName} <span className='text-2xl'>({data.Year})</span></h1>

        <ReactStars
        size={20}
        half={true}
        value={data.rating/data.rated}
        edit={false}
        />

        <p className='mt-2 text-white'>{data.Description} </p>
       
       <Review id={id} prevRating={data.rating} userRated={data.rated}/>
    </div>
    </>
    }
    </div>
     
  )
}

export default Detail;
