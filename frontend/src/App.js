import React,{Component} from 'react';
import NavBar from './components/NavBar/NavBar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Footer from './components/Footer/Footer'

const styles={
  // transition: 'all 3s ease-in'
  'transition': 'width 2s ease-in',
  'transition-delay': '2s',
  'transitionn-timeout':'2s'
  // '--webkit-transition': 'width 2s'
}
class App extends Component{
  constructor(props) {
    super(props)
  
    this.state={
      sideDrawerOpens:false,
      width: '0%'
    }
  }
  
 drawerToggleClickHandler =()=>{
   this.setState({width:'70%'});
    this.setState((prevState)=>({ sideDrawerOpens:!prevState.sideDrawerOpens}))

  }
  onBackdropClickHandler=()=>{
    this.setState({sideDrawerOpens:false})
}

// onShowHandler = () => {
//   this.setState({myState:'block'});
// }

//this is test
  render(){
    let sidedrawer;
    let backdrop;
    if(this.state.sideDrawerOpens){
      sidedrawer=<SideDrawer Style={{...styles,width:this.state.width}}/>;
      backdrop=  <Backdrop clicked={this.onBackdropClickHandler}/>;
    }
  return (
    <div  style={{height:'100%'}}className="App">
      <NavBar clicked={this.drawerToggleClickHandler}/>
      {sidedrawer}
      {backdrop}
      <div className='BodyWrapper'>
        <iframe title='Maps in Ridea app' className='MapFrame' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56239.647840202364!2d83.99021427673622!3d28.23834772153084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcd98c6b6d110d582!2sPaschimanchal+Campus+(I.O.E)!5e0!3m2!1sen!2snp!4v1560354940027!5m2!1sen!2snp"     
         style={{border:'0',height:'100vh', width:'100vw', top:'0', left:'0',position:"absolute",'z-index':'-100'}}>
        </iframe>
      </div>
     <Footer/>
    </div>
  );
}
}


export default App;
