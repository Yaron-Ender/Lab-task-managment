import { useEffect } from "react";
import { Outlet,NavLink,useNavigate } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from '../../hooks/useDocument';
import { useLogout } from '../../hooks/useLogout';
import { useStyle } from '../../hooks/useStyle'; 
import homeicon  from '../../asstes/homeicon.svg' 
const Navbar = () => {
  const { openDatabaseNavbar } = useStyle()
  const { logout,error} = useLogout()
  const { user } = useAuthContext()
  const { document,error:errorFromFirestore } =useDocument('users',user.uid)
  const navigate = useNavigate();
  useEffect(()=>{
  //supervisor immediatly direct to supervisor
  if(document&&document['position']['supervisor']){
    // navigate('/workers/supervisor')
    navigate("/workers");
  }
//workers immediatly direct to Workers comp
  if (document && !document["position"]["manager"] && !document["position"]['supervisor']) {
    navigate("/workers");
  }

},[document,navigate])
    return (
      <div>
    <nav className="main-navbar">
    {!error&&document&&(
      <>
    <div className="main-nav-link-icon-container">
    <div className="home-icon">
      <img src={homeicon} alt="home-icon" onClick={()=>{navigate('/')}}/>
    </div>
      {/* only manager can see the database and the "assignment"  */}
    <>  
    {document['position']['manager']&&  
    <div className="main-navbar-link-btn">   
    <NavLink to="database"
    onClick={()=>{openDatabaseNavbar()}}
    >database</NavLink>
    <NavLink to="assignment"
    >dashboard</NavLink>
    </div>
    }
    <div className="mian-nav-workers-dashboard-btn">
    {!document['position']['manager']&&
      <NavLink to="workers"
    >dashboard</NavLink>
    }
    </div>
    </>
    </div>
    {user&&<p className="welcome-user">hello <span>{user.displayName}</span></p>}
      </>
    )}
  <p onClick={logout} className='login-link'>Logout</p>
  {error&&<p>{error}</p>}
  {/* if we didn't get docuemnt */}
  {errorFromFirestore&&<h3>user not found</h3>}
  </nav>
    <Outlet />
      </div>
    );
};

export default Navbar;