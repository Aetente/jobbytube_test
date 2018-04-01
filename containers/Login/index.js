/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap'
import { Route } from 'react-router-dom'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {signIn} from './actions'

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  top: '50%',
  border: '1px solid #c7d1de',
  transform: 'translateY(-50%)',
  position: 'absolute',
  alignSelf: 'center'
}

const headLog = {
  backgroundColor: '#969faa',
  height: '30px'
}

const gridStyle = {
  padding: '1em',
  maxWidth: '568px',
  paddingTop: '0'
}

const widthToMax = {
  width: '100%'
}

const margFromTop = {
  marginTop: '15px'
}

const holdEmail= {
  marginTop: '2em'
}

const holdPass= {
  marginTop: '0.5em'
}

const holdButtons = {
    marginTop: '1em'
}

const signInHold = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const signInButton ={
  width: '80%',
  backgroundColor: '#47525e',
  color: 'white'
}

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={centerStyle}>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
          <Grid style={gridStyle}>
            <Row className='show-grid'>
                <Col style={headLog} md={12}/>
            </Row>
            <Row style={holdEmail} className='show-grid'>
              <Col style={widthToMax} xs={1} md={1}>
                <input id='email' style={widthToMax} className='form-control' placeholder='Email' type="text"/>
              </Col>
            </Row>
            <Row style={holdPass} className='show-grid'>
              <Col style={widthToMax} xs={1} md={1}>
                <input id='pass' style={widthToMax} className='form-control' placeholder='Password' type="text"/>
              </Col>
            </Row>
            <Row style={holdButtons} className='show-grid'>
              <Col xs={6} md={6}>
                <a>Forgot your password?</a>
              </Col>
              <Col style={signInHold} xs={6} md={6}>
                <Route render={({ history }) => (
                    <Button style={signInButton}
                      onClick={
                        ()=>{
                          this.props.onSubmitEmailPass(
                            document.getElementById('email').value,
                            document.getElementById('pass').value
                            )
                            history.push({
                              pathname:'/main',
                              state: {username: document.getElementById('email').value}
                              })
                        }
                      }
                    >Sign in</Button>
              )}
              />
              </Col>
            </Row>
          </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onSubmitEmailPass: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitEmailPass: (email,pass) => dispatch(signIn(email,pass)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
