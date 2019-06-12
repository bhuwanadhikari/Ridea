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
      <div className='bodyWrapper'>
      <iframe title='Maps in Ridea app' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56239.647840202364!2d83.99021427673622!3d28.23834772153084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcd98c6b6d110d582!2sPaschimanchal+Campus+(I.O.E)!5e0!3m2!1sen!2snp!4v1560354940027!5m2!1sen!2snp"     
        allowfullscreen style={{border:0 ,height:'100vh', width:'100vw'}}>
        </iframe>
           </div>
      </div>
  );
}
}


export default App;
