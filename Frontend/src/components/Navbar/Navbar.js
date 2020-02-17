import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Redirect } from 'react-router';

// Be sure to include styles at some point, probably during your bootstraping
//import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Navbar.css'

let redirectNav = null, selectedNav, navbarTag = null;
class Navbar extends React.Component {
    navHandler = e => {
        selectedNav = e;
        if (e === 'businessHome') {
            redirectNav = <Redirect to='/businessHome' />
        }
        else if (e === 'displayMap') {
            redirectNav = <Redirect to='/displayMap' />
        }
        else if (e === 'subscriptions') {
            if (localStorage.getItem('cookie') === "Tester") {
                redirectNav = <Redirect to='/subscriptions' />
            } else if (localStorage.getItem('cookie') === "Manager") {
                redirectNav = <Redirect to='/managersubscription' />
            }
        }
        else if (e === 'rejections') {
            redirectNav = <Redirect to='/rejections' />
        }
        else if (e === 'community') {
            redirectNav = <Redirect to='/chat' />
        }
        else if (e === 'profile') {
            redirectNav = <Redirect to='/showProfile' />
        }
        else if (e === 'showProfile') {
            redirectNav = <Redirect to='/showProfile' />
        }
        else if (e === 'dashboard') {
            if (localStorage.getItem('cookie') === "Manager")
                redirectNav = <Redirect to='/manager/reports' />
            else if (localStorage.getItem('cookie') === "Tester")
                redirectNav = <Redirect to='/tester/reports' />
        }
        else if (e === 'addProject') {
            redirectNav = <Redirect to='/addProject' />
        }
        else if (e === 'allProjects') {
            redirectNav = <Redirect to='/allProjects' />
        }
        else if (e === 'approval_list') {
            redirectNav = <Redirect to='/approvalList' />
        }
        else if (e === 'logout') {
            localStorage.clear();
            redirectNav = <Redirect to='/login' />
        }
        else if (e === 'bug_create') {
            if (localStorage.getItem('cookie') === "Tester") {
                redirectNav = <Redirect to='/createBugReport' />
            }
        }
        else if (e === 'bug_list') {
            redirectNav = <Redirect to='/bugList' />
        }
        else if (e === 'tester_location') {
            if (localStorage.getItem('cookie') === 'Manager') {
                redirectNav = <Redirect to='/testerLocation' />
            }
        }
        else if (e === 'file_browser') {
            if (localStorage.getItem('cookie') === 'Tester') {
                redirectNav = <Redirect to='/testerFileBrowser' />
            }
            else {
                redirectNav = <Redirect to='/managerFileBrowser' />
            }
        }
        else if (e === 'all_users') {
            redirectNav = <Redirect to='/admin/viewAllUsers' />
        }
        else if (e==='bill')
        {
            redirectNav = <Redirect to='/bill' />
        }
        this.setState({});
    }
    render() {
        if (!localStorage.getItem('cookie')) {
            navbarTag = <SideNav
                onSelect={(selected) => {
                    this.navHandler(selected);

                }}>
                <SideNav.Toggle />
                <SideNav.Nav selected={selectedNav}>

                    <NavItem eventKey="businessHome">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>

                        <NavText>
                            Home
                </NavText>
                    </NavItem>
                    <NavItem eventKey="displayMap">
                        <NavIcon>
                            <i className="fas fa-map-marker-alt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            TomTom Map
                         </NavText>
                    </NavItem>
                    
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                            <i className="fa fa-fw fa-chart-line" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Dashboard
                </NavText>
                    </NavItem>
                    <NavItem eventKey="profile">
                        <NavIcon>
                            <i className="fa fa-fw fa-id-card" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Profile
                </NavText>
                    </NavItem>

                    <NavItem eventKey="logout">
                        <NavIcon>
                            <i className="fa fa-fw fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Logout
                </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        }
        else if (localStorage.getItem('cookie') === 'Manager') {
            navbarTag = <SideNav
                onSelect={(selected) => {
                    this.navHandler(selected);

                }}>
                <SideNav.Toggle />
                <SideNav.Nav selected={selectedNav}>

                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>

                        <NavText>
                            Home
                        </NavText>
                    </NavItem> 
                    <NavItem eventKey="bill">
                        <NavIcon>
                            <i className="fa fa-fw fa-file-invoice" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Billing Rates
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="profile">
                        <NavIcon>
                            <i className="fa fa-fw fa-id-card" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Profile
                </NavText>
                    </NavItem>
                    {/* <NavItem eventKey="showProfile">
                        <NavIcon>
                            <i className="fa fa-fw fa-user-tie" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {//localStorage.getItem('name')
                            }
                            UpdateProfile
                </NavText>
                    </NavItem> */}

                    <NavItem eventKey="logout">
                        <NavIcon>
                            <i className="fa fa-fw fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Logout
                </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        }
        return (
            <div>
                {redirectNav}
                {navbarTag}
            </div>
        )
    }
}
export default Navbar;
