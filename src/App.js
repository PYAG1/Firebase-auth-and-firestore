import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { app,database } from './firebase';
import {getAuth,signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { collection,addDoc,getDocs,doc,updateDoc,deleteDoc } from 'firebase/firestore';
import { async } from '@firebase/util';




function App() {
  const [contact,setcontact]= useState([])
  const [form,setform]= useState({
    name:'',
    email:'',
    password:''
  });

  const auth= getAuth()
  const dabase= collection(database,'users')

  function handlein(e){
    e.preventDefault();
    const {name,value}= e.target;
    setform(prev=>{
     return {...prev,
      [name]:value
    }
    })



  }

  function add(){ 
    setcontact(prev=>{
      return [...prev, form]
    })
    addDoc(dabase,form)
    .then(()=>{
      alert('data sent')
    })
    .catch((err)=>{
      alert(err.message)
    })
    /*signInWithEmailAndPassword(auth,form.email,form.password)
    .then((response)=>{
      console.log(response.user)

    })
    .catch((err)=>{
      alert(err.message)
    })*/
  }
  
  console.log(form);

  console.log(contact)

  const getdocs = async ()=>{
   const values= await getDocs(dabase);
   setcontact(values.docs.map((item)=>{
    return {...item.data(),id:item.id}
   }))
  };

const updating=(id)=>{
let dataup = doc(database,'users',id);
updateDoc(dataup,{
  name:'mascot'
})
.then(()=>{
  alert('info updated')
  getdocs()
})
.catch((err)=>{
  alert(err)
})

}

useEffect(()=>{
  getdocs()

},[]);

  return (
    <div>
      <div className=' p-4'> 
        <form>
        <input type='text' name='name' placeholder='type your name' value={form.name} onChange={handlein}/>
          <input type='email' name='email' placeholder='type your email' value={form.email} onChange={handlein}/>
          <input type='password' name='password' placeholder='type your passwors' value={form.password} onChange={handlein}/>

        </form>
        <button onClick={getdocs}>Sign up</button>
        {contact.map((item)=>{
          return (
            <div>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.password}</p>

              <button className=' outline border border-solid' onClick={()=> updating(item.id)}>import</button>
              <hr/>
              

            </div>
          )

        })}

      </div>
     

    </div>
  );
}

export default App;
