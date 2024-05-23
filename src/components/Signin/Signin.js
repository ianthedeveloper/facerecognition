import React from 'react';
import './signin.css';

const Signin = ({onRouteChange}) => {
    return(
        <div className='container ba br3 dark-gray w--white-10 w-100 w-50-m w-25-l mw6 shadow-5 center'>
            <div className="pa4 black -80">
                <div className="measure">
                  <div id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                    <div className="mt3">
                      <label className="db fw6 lh-copy f5" htmlFor='email'>Email</label>
                      <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f5" htmlFor='password'>Password</label>
                      <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    {/* <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                  </div>
                  <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                        type="submit" 
                        value="Sign in"
                        onClick={() => onRouteChange('home')}
                    />
                  </div>
                  <div className="lh-copy mt3">
                    <a href="#0" className="f5 link dim black db b ph3 pv1 input-reset ba b--black bg-transparent grow pointer dib">REGISTER</a>
                    {/* <a href="#0" class="f6 link dim black db">Forgot your password?</a> */}
                  </div>
                </div> 
            </div>
        </div>
    )
}

export default Signin;