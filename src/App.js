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
 
    createUserWithEmailAndPassword(auth,form.email,form.password)
    .then((response)=>{
      console.log(response.user)

    })
    .catch((err)=>{
      alert(err.message)
    })
    addDoc(dabase,form)
    .then(()=>{
      alert('data sent')
    })
    .catch((err)=>{
      alert(err.message)
    })

  }
  
  console.log(form);

  console.log(contact)

  const getdocs = async ()=>{
   const values= await getDocs(dabase);
   setcontact(values.docs.map((item)=>{
    return {...item.data(),id:item.id}
   }))
   
  console.log(values)
  };


const updating=(id)=>{
let dataup = doc(database,'users',id);
updateDoc(dataup,{
  name:  `${acupdate}`
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

const [update,setupdate]= useState('')

const [acupdate,acsetupdate]= useState('')

const deleteData=(id)=>{
  let datadelete = doc(database,'users',id)
  deleteDoc(datadelete)
  .then(()=>{
    alert('info deleted')
    getdocs()
  })
  .catch((err)=>{
    alert(err)
  })
}

  return (
    <div>
      <div className=' p-4'> 
    
        <form>
        <input type='text' name='name' placeholder='type your name' value={form.name} onChange={handlein}/>
          <input type='email' name='email' placeholder='type your email' value={form.email} onChange={handlein}/>
          <input type='password' name='password' placeholder='type your passwors' value={form.password} onChange={handlein}/>

        </form>
        <button onClick={add}>Sign up</button>
        {contact.map((item)=>{
          return (
            <div className=' p-3'>
              <p className=' text-2xl'>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.password}</p>
              <div className=' flex pb-[1em]'>
              <input type='text' placeholder=' enter your update ' onChange={(e)=>{setupdate(e.target.value)}}/>
              <button onClick={()=>{
                              updating(item.id)
                              acsetupdate(update)
              
              }

                }>Add update</button>

              </div>
              <button onClick={()=>deleteData(item.id)}>delete</button>

             

              <button className=' p-2 border border-solid' onClick={()=> updating(item.id)}>import</button>
              <hr/>
              

            </div>
          )

        })}

      </div>
     

    </div>
  );
}

export default App;
