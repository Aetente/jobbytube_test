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
import { Navbar,Glyphicon,Nav,NavItem,FormGroup,FormControl,Button,InputGroup,Grid,Row,Col } from 'react-bootstrap'
import { Route } from 'react-router-dom'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMainWindow from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styled from 'styled-components';

import './style.css'

const noPadding = {
  padding: 0
}


const FullDiv = styled.div`
  width: 100%;
  min-height: 100vh;
`;
const GridDown = styled(Grid)`
  margin-top: 5em;
`;

const RightBorderCol = styled(Col)`
  border-right: 1px solid black
`


export class MainWindow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  constructor(){
    super();
    this.state = {
      showSideMenu: false
    }
  }

  selectFilter = (eKey,e) => {
    this.setState({showSideMenu:!this.state.showSideMenu});
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
          <Nav onSelect={()=>{this.selectFilter()}}>
            <NavItem eventKey={1}>
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
        <FullDiv className='container'>
          {this.state.showSideMenu?(
            <GridDown>
              <Row>
                <RightBorderCol xs={3}>filters</RightBorderCol>
                <Col xs={9}>content</Col>
              </Row>
            </GridDown>
          ):
          (
            <GridDown>
              <Row>
                <Col xs={12}>content</Col>
              </Row>
            </GridDown>
          )}
        </FullDiv>
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
