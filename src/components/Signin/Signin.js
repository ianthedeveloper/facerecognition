import React from 'react';
import './signin.css';

class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signinEmail: '',
      signinPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signinEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signinPassword: event.target.value});
  }

  onSignin = () => {    
    fetch("http://localhost:3003/signin", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data === 'Success'){
        this.props.onRouteChange('home');
      }
    })
  }


  render(){
    const { onRouteChange } = this.props;
    return(
        <div className='container ba br3 dark-gray w--white-10 w-100 w-50-m w-25-l mw6 shadow-5 center'>
            <div className="pa4 black -80">
                <div className="measure">
                  <div id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                    <div className="mt3">
                      <label className="db fw6 lh-copy f5" htmlFor='email'>Email</label>
                      <input 
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="email" 
                      name="email-address"  
                      id="email-address"
                      onChange={this.onEmailChange}
                      />
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f5" htmlFor='password'>Password</label>
                      <input 
                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="password" 
                      name="password"  
                      id="password"
                      onChange={this.onPasswordChange}
                      />
                    </div>
                    {/* <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                  </div>
                  <div className="">
                    <input 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                        type="submit" 
                        value="Sign in"
                        onClick={this.onSignin}
                    />
                  </div>
                  <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} className="f5 link dim black db b ph3 pv1 input-reset ba b--black bg-transparent grow pointer dib">REGISTER</p>
                    {/* <a href="#0" class="f6 link dim black db">Forgot your password?</a> */}
                  </div>
                </div> 
            </div>
        </div>
    )
  }
}


export default Signin;