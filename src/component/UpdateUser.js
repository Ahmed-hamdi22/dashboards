//context
import React,{useContext,  useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { USer } from '../Context/UseCotext';
import { useEffect } from 'react';

const UpdateUser = () => {
  const styleRigster ={
    display: "flex",
    justifycontent: "center",
    alignitems: "center",
    margintop:" 40px",
};
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [reptpass,setreptpass] = useState("");
    const  [accept, setaccpet] = useState(false);
    const [EmailError ,setEmailError]  = useState(false);

   const nav = useNavigate();
   const context = useContext(USer);
   const token = context.auth.token;

    const id = window.location.pathname.split("/").slice(-1)[0];

   useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`,{
      headers:{
       
    Authorization: "Bearer " + token,
      },
    })
    .then(res=>res.json())
    .then(data=>{
      setname(data[0].name);
      setemail(data[0].email);
    });
   }, []);
    async function submit (e){
      e.preventDefault();
      setaccpet(true);

    try{
        let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`,{
          name:name,
          email:email,
          password:password,
          password_confirmation:reptpass,
      },
      {
        headers:{
          Accpet: "application/json",
          Authorization: "Bearer " +token,
        }
      }
      );
      
      nav("/dashboard/user");
    

    }catch(err){
      if(err.response.status === 422){
        setEmailError(true);
      }
     setaccpet(true);
    }

    }

    
  return (
   <div className='parent' >
    <div className='register ' style={styleRigster}>
    <form  onSubmit={submit}>
      <label htmlFor='name'>name</label>
      <input
      id='name'  placeholder='name'type='text'
       value={name}
  
      onChange={(e)=>setname(e.target.value)}
      
      />
      {
      name.length==="" && accept&&
     ( <p>user is required</p>)
     }
       <label htmlFor='email'>email</label>
      <input id='email' placeholder='email' 
      type='email'
      required
         value={email}
      onChange={(e)=>setemail(e.target.value)}
/>
{accept && EmailError &&(
<p> email already token</p>)}
<label htmlFor='password'>password</label>
      <input
      id='password'
      placeholder='password'
      type='password'
      value={password}
      onChange={(e)=>setpassword(e.target.value)}
      />
           {
            password.length < 8 && accept&&(<p style={{color:"red"}}>password must be more 8 ch</p>)}


      <label htmlFor='reppass'>reptpass</label>
      <input
      id='reppass'
      placeholder='reppass'
      type='password'
      value={reptpass}
      onChange={(e)=>setreptpass(e.target.value)}
      />
      {
          reptpass!==password&&accept&&<p style={{color:"red"}}>repetpassword must be=password</p>
      }
       <div  style={{textAlign:"center"
     
      }}>
         <button type='submit'  >Update-User</button>
</div>
    </form>
    </div>
    </div>
  )
}



export default UpdateUser 


// //component طريقة
// import React,{useState,useEffect} from 'react'


// import Form from "./Form";
// import"../index.css"
// const UpdateUser = () => {
//     const [name, setname] = useState("");
//     const [email, setemail] = useState("");

//     const id = window.location.pathname.split("/").slice(-1)[0];
//     useEffect(() => {
//       fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
//       .then(res=>res.json())
//       .then(data=>{
//         setname(data[0].name);
//         setemail(data[0].email);
//       });
//      }, []);
  
//   return (
    
//    <>
//    <h2>Update user</h2>
//     <div className='parent' >
//     <Form button ="Update"
//      name={name} email ={email} 
//      endpoint={`user/update/${id} `}
//      navigate ="dashboard/user"
//      hasLocalStorage ={false}/>
     
//   </div>
//    </>
  
//   )
// }

// export default UpdateUser









// الطريقة العادية 

// import React,{useState,useEffect} from 'react'
// import axios from 'axios'
// import"../index.css"
// const UpdateUser = () => {
//     const [name, setname] = useState("");
//     const [email, setemail] = useState("");
//     const [password, setpassword] = useState("");
//     const [reppass,setreppass] = useState("");
//     const  [accept, setaccpet] = useState(false);
 
//     const id = window.location.pathname.split("/").slice(-1)[0];
//     useEffect(() => {
//       fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
//       .then(res=>res.json())
//       .then(data=>{
//         setname(data[0].name);
//         setemail(data[0].email);
//       });
//      }, []);
//  async function submit (e){
//     let flag= true;
//   e.preventDefault();
//   setaccpet(true)
//   if (name === ""|| password.length<8||reppass!==password){
//   flag=false
//   } else flag = true;
//   try{
//   if( flag ){

//    let res= await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`,{
//       name:name,
//       email:email,
//       password:password,
//       password_confirmation:reppass,
//     });
//     if(res.status===200){
//       window.localStorage.setItem("email",email)
//       window.location.pathname="/dashboard/user"
//     }
//   } 
// } catch (err){
//     console.log(err) 
//  }
//   }   
//   return (
//     <>
//     <div className='parent' >
//     <div className='register '>
//       <form onSubmit={submit}>
//         <label htmlFor='name'>name</label>
//         <input
//         id='name'  placeholder='name'type='text' value={name}
//         onChange={(e)=>setname(e.target.value)}
        
//         />
//         {
//         name.length ==="" && accept&&
//         (<p>user</p>)
//        }
//          <label htmlFor='email'>email</label>
//         <input id='email' placeholder='email' type='email'   value={email}
//         onChange={(e)=>setemail(e.target.value)}
// />
// <label htmlFor='password'>password</label>
//         <input
//         id='password'
//         placeholder='password'
//         type='password'
//         value={password}
//         onChange={(e)=>setpassword(e.target.value)}
//         />
//              {
//               password.length < 8 && accept&&(<p style={{color:"red"}}>password must be more 8 ch</p>)}


//         <label htmlFor='reppass'>reptpass</label>
//         <input
//         id='reppass'
//         placeholder='reppass'
//         type='password'
//         value={reppass}
//         onChange={(e)=>setreppass(e.target.value)}
//         />
//         {
//             reppass!==password&&accept&&<p style={{color:"red"}}>repetpassword must be=password</p>
//         }
//          <div  style={{textAlign:"center"
       
//         }}>
//            <button type='submit' >update</button>
//  </div>
//       </form>
//       </div>
//   </div>
//   </>
//   )
// }





// export default UpdateUser







