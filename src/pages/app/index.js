// https://material-ui.com/demos/lists/

// https://material.io/tools/icons/?style=baseline

import React, {Component} from "react";

import { connect } from 'react-redux'

import {
	Grid,
	Paper,
	AppBar, Toolbar, Typography,
	IconButton, Icon, Button,
	FormControl, InputLabel, Select, MenuItem,
	FormHelperText, Input,
	Tabs, Tab,
	Menu, 
} from '@material-ui/core/';

import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TierraIcon from '@material-ui/icons/PinDrop';
import GoogleIcon from '@material-ui/icons/Equalizer';
import FacebookIcon from '@material-ui/icons/Share';

import { withStyles } from '@material-ui/core/styles';

import Maps from '../../components/googleMaps';

const styles = theme => ({
	root: {
		flexGrow: 1,
		paddingTop: 64,
	},
	flex: {
		flex: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary,
	},
	button: {
		margin: theme.spacing.unit,
	},
});

class App extends Component {

	constructor(props) {
		super(props)

		if (!props.authenticated) {
			props.history.push({ pathname: '/' });
		}

		this.state = {
			page: '',
			post: '',
			tab: 0,
			anchorEl: null,
		};

		this._handleChangeSelect = this._handleChangeSelect.bind(this);
		this._handleChangeTab = this._handleChangeTab.bind(this);
	}

	_handleChangeSelect(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	_handleChangeTab(e, v) {
		this.setState({ 'tab': v });
	}

	_handleAccountMenu(event) {
		this.setState({ anchorEl: event.currentTarget });
	};

	_handleCloseAccountMenu(event) {
		this.setState({ anchorEl: null });
	};

	_handleAccountMenuItem(evt, index) {
		
		// if(index === 0) {
		// 	makesomething
		// }
		// else if (index === 1) {
		// 	makesomething
		// }

		// close
		this.setState({ anchorEl: null });

	}

	render() {

		const { classes } = this.props;

		const { tab, auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return(
			<Grid container className={classes.root} spacing={8}>
				<AppBar>
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.flex}>
							Title
						</Typography>
						<IconButton color="inherit" className={classes.button} aria-label="Delete">
							<DashboardIcon />
						</IconButton>
						<IconButton color="inherit" className={classes.button} aria-label="Delete">
							<SettingsIcon />
						</IconButton>
						<IconButton
							color="inherit"
							className={classes.button}
							aria-owns={open ? 'menu-appbar' : null}
							aria-haspopup="true"
							onClick={this._handleAccountMenu.bind(this)}
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{vertical: 'top',horizontal: 'right',}}
							transformOrigin={{vertical: 'top', horizontal: 'right',}}
							open={open}
							onClose={this._handleCloseAccountMenu.bind(this)}
						>
							{
								["Profile", "Account"].map((option, index) => (
									<MenuItem
										key={index}
										onClick={event => this._handleAccountMenuItem(event, index)}
									>
										{option}
									</MenuItem>
								))
							}
						</Menu>
					</Toolbar>
				</AppBar>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="page-helper">Facebook page</InputLabel>
							<Select
								value={this.state.page}
								onChange={this._handleChangeSelect}
								input={<Input name="page" id="page-helper" />}
							>
								<MenuItem value="">
									<em>All</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
							<FormHelperText>Please select a facebook page</FormHelperText>
						</FormControl>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Maps />
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="post-helper">Facebook post</InputLabel>
							<Select
								value={this.state.post}
								onChange={this._handleChangeSelect}
								input={<Input name="post" id="post-helper" />}
							>
								<MenuItem value="">
									<em>All</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
							<FormHelperText>Please select a facebook post</FormHelperText>
						</FormControl>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Tabs
							value={this.state.tab}
							indicatorColor="primary"
							textColor="primary"
							onChange={this._handleChangeTab}
						>
							<Tab label="Facebook" icon={<FacebookIcon />} />
							<Tab label="Google Analytics" icon={<GoogleIcon />} />
							<Tab label="Land" icon={<TierraIcon />} />
						</Tabs>
						{tab === 0 && <Typography>Item One</Typography>}
						{tab === 1 && <Typography>Item Two</Typography>}
						{tab === 2 && <Typography>Item Three</Typography>}
					</Paper>
				</Grid>
			</Grid>
		)
	}

}

const AppWithStyles = withStyles(styles)(App);

const mapStateToProps = (state, ownProps) => ({
	authenticated: state.auth.authenticated,
})

const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppWithStyles)


