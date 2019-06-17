
import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDrawer: false,
    }
  }

  drawerToggleClickHandler = () => {
    this.setState({ showDrawer: !this.state.showModal });
  }
  onBackdropClickHandler = () => {
    this.setState({ showDrawer: false })
  }


  render() {
    return (
      <div className="App">
        <NavBar clicked={this.drawerToggleClickHandler} />

        
        <div className='BodyWrapper'>
          
        </div>
        <SideDrawer
          show={this.state.showDrawer}
          drawerClosed={() => {
            this.setState({ showDrawer: false });
          }}
        />

        <Footer />
      </div>
    );
  }
}


export default App;
