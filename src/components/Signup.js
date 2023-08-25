import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {getAuth , RecaptchaVerifier , signInWithPhoneNumber} from 'firebase/auth';
import app from "./firebase/Firebase";
import swal from "sweetalert";
// import { ReactDOM } from "react";
import { addDoc } from "firebase/firestore";
import { usersRef } from "./firebase/Firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const auth = getAuth(app);

function SignUp() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const [otpsent, setotpsent] = useState(false);
  const[OTP,setOTP]=useState("");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }
  const requestOtp = () =>{
    setloading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth,`+91${form.mobile}`,appVerifier).then(confirmationResult=>{
        window.confirmationResult = confirmationResult;
        swal({
            text:"OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
        });
        setotpsent(true);
        setloading(false);
    }).catch((error)=>{
        console.log(error)
    })
  }

  const verifyOTP = ()=>{
    try{
        setloading(true);
        window.confirmationResult.confirm(OTP).then((result)=>{
           uploadData();
            swal({
                text:"Successfully Registered",
                icon:"success",
                buttons:false,
                timer:3000,
            })
            navigate('/login');
            setloading(false);
        })
    }
    catch(error){
        console.log(error);
    }
  }


  const uploadData = async()=>{
    try{
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(form.password,salt);
    await addDoc(usersRef,{
        name:form.name,
        password:hash,
        mobile:form.mobile
    });
    }catch(err){
      console.log(err);
    }
  }

  return (
      <div className="w-full flex flex-col mt-8 items-center">
            <h1 className="text-xl font-bold text-white ">Sign Up</h1>
            {otpsent?<> <div class="p-2 md:w-1/3 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-300">
                  OTP
                </label>
                <input
                  id="message"
                  name="message"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></input>
              </div>
            </div>
            <div class="p-2 w-full">
              <button onClick={verifyOTP} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
              </button>
            </div></>: <>
            
            
            <div class="p-2 md:w-1/3 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-300">
                  Name
                </label>
                <input
                  id="message"
                  name="message"
                  value={form.name}
                  onChange={(e) => setform({ ...form, name: e.target.value })}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></input>
              </div>
            </div>

            <div class="p-2 md:w-1/3 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-300">
                  Mobile No.
                </label>
                <input
                  type="number"
                  id="message"
                  name="message"
                  value={form.mobile}
                  onChange={(e) => setform({ ...form, mobile: e.target.value })}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></input>
              </div>
            </div>

            <div class="p-2 md:w-1/3 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="message"
                  name="message"
                  value={form.password}
                  onChange={(e) =>
                    setform({ ...form, password: e.target.value })
                  }
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></input>
              </div>
            </div>

            <div class="p-2 w-full">
              <button class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg " onClick={requestOtp}>
                {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
              </button>
            </div>
        
          </>
        }
        <div>
          <p className="text-white">
            Already have an account{" "}
            <Link to={"/login"}>
              {" "}
              <span className="text-blue-500"> Login </span>
            </Link>
          </p>
        </div>
        <div id="recaptcha-container"></div>
    </div>
  );
}

export default SignUp;
