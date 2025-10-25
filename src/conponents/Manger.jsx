import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manger = () => {
  const [showPass, setShowPass] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  }



  useEffect(() => {
    let passwords = localStorage.getItem("passwords")

    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }

  }, [])


  // const savePassword = () => {

  //   setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
  //   localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
  //   console.log(...passwordArray, form)

  // }
  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newEntry = { ...form, id: uuidv4() };
      const updatedArray = [...passwordArray, newEntry];


      setpasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      console.log("Saved:", newEntry);
      setform({ site: "", username: "", password: "" })
      toast(`Pasword saved 🎉 `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        
        theme: "dark",
        transition: Bounce,
      });

    }
    else {
      toast(`Pasword cannot be saved length>3 💀 `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  }





  const deletePassword = (id) => {

    console.log("Deleting password with id", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {

      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast(`Deleted password: `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  const editPassword = (id) => {
    console.log("Editing password with id", id)
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))


  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>

        <div className=" text-white p-2  md:px-0          md:mycontainer relative z-10">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-green-700">&lt; Pass</span>
            <span className="text-green-700">OP / &gt;</span>
          </h1>

          <p className="text-green-900 text-lg text-center">
            Your Own Password Manager
          </p>

          <div className="flex p-4 flex-col text-black gap-8 items-center">
            <input value={form.site} onChange={handleChange}
              placeholder="Enter website URL"
              type="text" name="site"
              className="border border-green-500 rounded-full w-full p-4 py-1"
            />

            <div className="flex  justify-between gap-8 w-full">
              <input value={form.username} onChange={handleChange}
                placeholder="Enter Username"
                type="text" name="username"
                className="border border-green-500 rounded-full w-full p-4 py-1"
              />

              <div className="relative w-full">
                <input value={form.password} onChange={handleChange}
                  placeholder="Enter Password"
                  type={showPass ? "text" : "password"} name="password"
                  className="border border-green-500 rounded-full w-full p-4 py-1"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-green-600"
                >
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <button onClick={savePassword} className="w-fit flex items-center gap-2 bg-green-400 rounded-full px-4 py-2 hover:bg-green-300 font-bold border border-green-700">
              <lord-icon
                src="https://cdn.lordicon.com/tsrgicte.json"
                trigger="hover"
                colors="primary:#121331,secondary:#16c72e"
              ></lord-icon>
              Add Password
            </button>

          </div>

          <div className="passwords">
            <h2 className="font-bold text-black text-2xl py-4">Your passwords</h2>
            {passwordArray.length === 0 && <div>NO PASSWORDS TO SHOW</div>}
            {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className=" bg-green-800 text-white">

                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>

                </tr>
              </thead>
              <tbody className="text-black shadow-orange-200 font-extrabold bg-green-100">
                {passwordArray.map((item, index) => {
                  return <tr key={index}>

                    <td className=" flex items-center justify-center  py-2 border border-white text-center " ><a href={item.site} target="_blank"> {item.site}</a>
                      <div className="lordicon copy size-7 cursor-pointer " onClick={() => copyText(item.site)}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "padding-left": "3px" }}
                          src="https://cdn.lordicon.com/hmpomorl.json"
                          trigger="hover"
                          delay="1500"
                          state="in-reveal"
                        >
                        </lord-icon>
                      </div></td >
                    <td className=" py-2 border border-white text-center w-32" >{item.username}
                      <div className="size-7 cursor-pointer " onClick={() => copyText(item.username)}>


                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "padding-left": "3px" }}

                          src="https://cdn.lordicon.com/gyyhoycg.json"
                          trigger="hover"
                        >
                        </lord-icon></div>
                    </td >
                    <td className="py-2 border border-white text-center w-32" >{item.password}
                      <div className="size-7 cursor-pointer " onClick={() => copyText(item.password)}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}

                          src="https://cdn.lordicon.com/gyyhoycg.json"
                          trigger="hover"
                        >
                        </lord-icon></div>
                    </td >
                    <td className="py-2 border border-white text-center w-32">
                      <span className="cursor-pointer mx-1" onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          delay="1500"
                          state="in-dynamic"
                          style={{ "width": "25px", "height": "25px" }}
                        >
                        </lord-icon></span>
                      <span className="cursor-pointer mx-1" onClick={() => { deletePassword(item.id) }}><lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        state="morph-trash-in"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                      </span>

                    </td >
                  </tr>
                })}

              </tbody>
            </table>}
          </div>



        </div>
      </div >
    </>
  );
};

export default Manger;


