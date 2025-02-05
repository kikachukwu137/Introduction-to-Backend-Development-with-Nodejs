function Employee(props){
    return (<div>
        <p>{props.name}</p>
        {/* <p>{props.role ? props.role : 'No role'}</p> */}
        {props.role ? <p>{props.role}</p>:<p>No role</p>}

    </div>)
}


export default Employee;