import Employee from "./component/employee";
import Show from "./component/show";
import { useState } from "react";
function App(){
  const[role,setRole] = useState('developer')
  const showEmployee = true
  return (
    <div> 
    
    {showEmployee ? (<>
    <input
      type="text"
      onChange = {(e)=>{
        setRole(e.target.value)
      }}
    
    />
    <Employee name = "daniel"  role="intern"/>
    <Employee name="nike" role={role} />
    <Employee name="dare  "/> 
    



    </>)
    : (<Show/>)}



</div>
    
    
   


  )
}


export default App