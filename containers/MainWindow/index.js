/**
 *
 * MainWindow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Navbar,Glyphicon,Nav,NavItem,FormGroup,FormControl,Button,InputGroup } from 'react-bootstrap'
import { Route } from 'react-router-dom'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMainWindow from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import './style.css'

const noPadding = {
  padding: 0
}



export class MainWindow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  selectLogin = (eKey,e) => {
    // console.log(eKey)
    // console.log(e);
    this.context.router.history.push("/");
  }
  
  render() {
    return (
      <div>
        <Helmet>
          <title>MainWindow</title>
          <meta name="description" content="Description of MainWindow" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        {/* <p>{this.props.location.state.username?this.props.location.state.username:'help'}</p> */}
        <Navbar fixedTop>
          <Nav>
            <NavItem>
              <Button>
                <Glyphicon glyph='glyphicon glyphicon-menu-hamburger'/>
              </Button>
            </NavItem>
            
            <NavItem>
            <Navbar.Toggle/>
              <Navbar.Collapse>
                  <Navbar.Form>
                    <FormGroup>
                      <InputGroup>
                        <FormControl  type="text" placeholder="Search" />
                        <InputGroup.Button>
                          <Button type="submit"><Glyphicon glyph='glyphicon glyphicon-search'/></Button>
                        </InputGroup.Button>
                      </InputGroup>
                    </FormGroup>
                  </Navbar.Form>
              </Navbar.Collapse>
            </NavItem>
            </Nav>
            
            {this.props.location.state&&this.props.location.state.username?
              (<Nav pullRight>
                <Navbar.Text>{this.props.location.state.username}</Navbar.Text>
              </Nav>):(
              <Nav pullRight>
                <NavItem>
                  <Route  
                    render={({history})=>(
                        <Button
                          onClick={()=>{history.push('/login')}}>Log In</Button>
                    )
                  }
                  />
                </NavItem>
                <NavItem>
                <Route  
                  render={({history})=>(
                      <Button
                        onClick={()=>{history.push('/login')}}>Sign up</Button>
                  )
                }
                />
              </NavItem>
              </Nav>
              )
            }
          
        </Navbar>
      </div>
    );
  }
}

MainWindow.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainwindow: makeSelectMainWindow(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mainWindow', reducer });
const withSaga = injectSaga({ key: 'mainWindow', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MainWindow);
