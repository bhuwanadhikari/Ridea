import React,{Component} from 'react';
import NavBar from './components/NavBar/NavBar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
// import mapbackground from './img/mapbackground.png'
class App extends Component{
  state={
    sideDrawerOpens:false
  }
 drawerToggleClickHandler =()=>{
    this.setState((prevState)=>({ sideDrawerOpens:!prevState.sideDrawerOpens}))

  }
  onBackdropClickHandler=()=>{
    this.setState({sideDrawerOpens:false})
}
  render(){
    let sidedrawer;
    let backdrop;
    if(this.state.sideDrawerOpens){
      sidedrawer=<SideDrawer/>;
      backdrop=  <Backdrop clicked={this.onBackdropClickHandler} />;
    }
  return (
    <div  style={{height:'100%'}}className="App">
      <NavBar clicked={this.drawerToggleClickHandler}/>
      {sidedrawer}
      {backdrop}
      <div className='bodyWrapper'></div>
      </div>
  );
}
}


export default App;
