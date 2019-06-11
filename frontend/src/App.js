import React,{Component} from 'react';
import NavBar from './components/NavBar/NavBar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import { lookupService } from 'dns';

class App extends Component{
  state={
    sideDrawerOpens:false
  }
 drawerToggleClickHandler =()=>{
    this.setState((prevState)=>({ sideDrawerOpens:!prevState.sideDrawerOpens}))

  }
  render(){
    let sidedrawer;
    let backdrop;
    if(this.state.sideDrawerOpens){
      sidedrawer=<SideDrawer/>;
      backdrop=  <Backdrop/>;
    }
  return (
    <div  style={{height:'100%'}}className="App">
      <NavBar clicked={this.drawerToggleClickHandler}/>
      {sidedrawer}
      {backdrop}
      <div style={{marginTop:'12vh'}}>
      <p>this is paragraph content</p>
      </div>
     
    </div>
  );
}
}


export default App;
