// https://material-ui.com/demos/lists/

// https://material.io/tools/icons/?style=baseline

import React, {Component} from "react";

import { Redirect } from "react-router-dom";

import { connect } from 'react-redux'

import axios from 'axios';
import PropTypes from 'prop-types';

import {
	Grid,
	Paper,
	AppBar, Toolbar, Typography,
	IconButton, Icon, Button,
	FormControl, InputLabel, Select, MenuItem,
	FormHelperText, Input,
	Tabs, Tab,
	Menu, List , ListItem ,Avatar,ListItemText
} from '@material-ui/core/';

import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TierraIcon from '@material-ui/icons/PinDrop';
import GoogleIcon from '@material-ui/icons/Equalizer';
import FacebookIcon from '@material-ui/icons/Share';
import Token from '@material-ui/icons/CardMembership';
import Cicle from '@material-ui/icons/Brightness1'




import Sad from './images/sad.png';
import Wow from './images/wow.png';
import Angry from './images/angry.png';
import Like from './images/like.png';
import Haha from './images/haha.png';
import Love from './images/love.png';

import { withStyles } from '@material-ui/core/styles';

import Maps from '../../components/googleMaps';

import * as actions from '../../actions/auth.js';
import {api,request} from '../../actions/request';
import Modal from "../../components/token/modal";
import ModalSeccion from "../../components/secciones/modal";

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


const D3 = [
	{has: '#ensenada54', lat: 31.8664105,lng:-116.6111767},
	{has: '#ensenada93',lat: 31.855366, lng: -116.584063},	
	{has: '#ensenada114',lat: 31.832876, lng: -116.597712},	
];

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			tabActive : 0,
			page: '',
			post: '',
			tab: 0,
			anchorEl: null,
			paginas : [],
			publicaciones : [],
			reacciones : [{
				sad: 0,
				like: 0,
				love: 0,
				haha: 0,
				angry: 0,
				wow: 0
			}],
			color: '',
			lat : '',
			long : '',
			zoom : '',
			kmz : 'distritos.kmz',
			circulos:[],
			modal_token:false,
			modal_secciones:false,

		};

		this._handleChangeSelect = this._handleChangeSelect.bind(this);
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggle_seccion = this.toggle_seccion.bind(this);
		
		this.myRef = React.createRef();

	}

	componentDidMount() {
		let self=this;

		 request.get('api/configuracion')
        .then(function(response)
        {
            if(response.status === 200)
            {
                console.log(response.data);
               self.paginas(response.data.access_token);
            }
        });
       
    

    }
    toggle(evt)
    {
        console.log("entro");

        this.setState({
            modal_token       : !this.state.modal_token,
           
            
        });


    }
     toggle_seccion(evt)
    {
        console.log("entro");

        this.setState({
            modal_secciones       : !this.state.modal_secciones,
           
            
        });


    }

    paginas (token_facebook) {
    	 let urlfb = 'https://graph.facebook.com/v3.0/me';
        //let token = 'EAACEdEose0cBAM8ZBAwqi0RhRKsOdb3QIlbm77bYrpIQ2Om1QBEisi6e30dZB6gs2Y83XtH9GthxjBbjpFZAhToCNIdK5IVjBMtQkTQjAF4LBOZAZAL28CJq3bOFn70ZBf8XxJ4tk24xyhIj74ZA7Sesw9QERS66wHeZADgcvGq95EcZAZB3gzmKD1WGgSIllxHCxaZA4OVYHk8vwZDZD';

        let token = token_facebook;
        console.log(token_facebook);

        let consulta = '?fields=accounts%7Bname%2Caccess_token%7D&access_token=';
        let paginas = [];
        let _self = this;
        axios.get(urlfb+consulta+token)
        .then(response => {
             response.data.accounts.data.some(function(obj) {
                    paginas.push({

						
                        
                        value : obj.id,
                        label : obj.name,
                        token : obj.access_token,
                        publicaciones : [],


                    });
                                     
                });
             	 _self.setState({
		            paginas : paginas,
		        }); 
             // 	 paginas.some(function(obj,index){
            	// 	console.log(index);
            	// 	_self.publicaciones(obj.token,obj.value, index)
            	// });  
            });

            //get publicaciones 



    }

    // publicaciones(token_page , id_page , index ){

    // 	let urlfb = 'https://graph.facebook.com/v3.0/'+id_page+'?fields=feed.limit(5)&access_token=';
    // 	let {paginas} = this.state;
    // 	let token = token_page;
    // 	let _self = this;
    // 	let publicaciones = [];
    // 	axios.get(urlfb+token)
    //     .then(response => {
    //         console.log(response)
    //          response.data.feed.data.some(function(obj) {
    //                 publicaciones.push({
                        
    //                     value : obj.id,
    //                     label : obj.message,
    //                     access_token : token_page,
    //                     reacciones : []


    //                 });

    //             paginas[index].publicaciones = publicaciones;    
    //                 _self.setState({
    //                     paginas : paginas,
    //                 }); 
                                     
    //             });

				// paginas.some(function(obj, index){
				// 	let page_index = index;
				//     obj.publicaciones.some(function(obj, index){
				//     	_self.reacciones=(obj.value,obj.access_token, page_index);
				//     });
				// });
    //         });

    // }

    reacciones(idPublicacion, access_token_page, index, index_page){
        let reacciones = [];
        let {paginas} = this.state;
        let self = this;
        let query = "?fields=reactions.type(LIKE).limit(0).summary(total_count).as(LIKE)%2Creactions.type(LOVE).limit(0).summary(total_count).as(LOVE)%2Creactions.type(SAD).limit(0).summary(total_count).as(SAD)%2Creactions.type(WOW).limit(0).summary(total_count).as(WOW)%2Creactions.type(ANGRY).limit(0).summary(total_count).as(ANGRY)%2Creactions.type(HAHA).limit(0).summary(total_count).as(HAHA)";
        let url_fb = "https://graph.facebook.com/v3.0/"
        let access_token = "&access_token="+access_token_page;
        
        axios.get(url_fb+idPublicacion+query+access_token)
        .then(response => {
 
            reacciones.push({
                
                angry : response.data.ANGRY.summary.total_count,
                haha : response.data.HAHA.summary.total_count,
                love : response.data.LOVE.summary.total_count,
                like : response.data.LIKE.summary.total_count,
                sad : response.data.SAD.summary.total_count,
                wow : response.data.WOW.summary.total_count,


            });

            paginas[index_page].publicaciones[index].reacciones = reacciones;
            self.setState({
                paginas : paginas,
            }); 


            });

    }

	_handleChangeSelect(e) {
		
		if(e.target.name === "page") {

			let {paginas} = this.state;
			let index = e.target.value;
			let token = paginas[index].token;
			let id_page = paginas[index].value;
			let publicaciones = [];
			let self = this;
			let circulos=[];
			let matches=[];

			let urlfb = 'https://graph.facebook.com/v3.0/'+id_page+'?fields=posts&access_token=';

			axios.get(urlfb+token)
			.then(response => {

				response.data.posts.data.some(function(obj) {

					if(obj.message) {

						let regex = /#ensenada?\d+/;
						let match = regex.exec(obj.message);
						let hash = null;

						if(match !== null) {

							matches.push(match[0]);
							hash = match[0];

							// const resultado = D3.find( seccion => seccion.has === match[0] );

							// if (typeof(resultado) !== "undefined") {
							// 	circulos.push({
							// 		lat : resultado["lat"],
							// 		lng : resultado["lng"],
							// 	});
							// }

						}

						publicaciones.push({
							value : obj.id,
							label : obj.message.substring(0,35)+"...",
							token : obj.access_token,
							hash: hash
						});

					}

				});

				// find matches
				request.post('/api/secciones_has/', {

					matches: matches

				}).then(response => {

					let circulos = response.data
					// publicaciones

					// console.log("circulos --->", circulos);
					// console.log("publicaciones --->", publicaciones);

					for(let i in circulos) {

						let has = circulos[i].has;

						for(let j in publicaciones) {

							let pub = publicaciones[j];

							// console.log(has, pub.hash);

							if(pub.hash == has) {
								publicaciones[j].lat = circulos[i].lat;
								publicaciones[j].lng = circulos[i].lng;
							}

						}

					}


					// console.log("final -->", publicaciones);

					self.setState({
						circulos: circulos,
						publicaciones : publicaciones,
					});

					self.coordenadas(id_page);


				})
				.catch(error => {

					console.log(error);

				});

			});

		} // end Pages if

		else if(e.target.name === "post") {

			let page = this.state.page;
			let {paginas ,publicaciones} = this.state;
			let idPublicacion = publicaciones[ e.target.value ].value;
			let page_token = paginas[page].token;
			let reacciones = [];
			let self = this;
			let query = "?fields=reactions.type(LIKE).limit(0).summary(total_count).as(LIKE)%2Creactions.type(LOVE).limit(0).summary(total_count).as(LOVE)%2Creactions.type(SAD).limit(0).summary(total_count).as(SAD)%2Creactions.type(WOW).limit(0).summary(total_count).as(WOW)%2Creactions.type(ANGRY).limit(0).summary(total_count).as(ANGRY)%2Creactions.type(HAHA).limit(0).summary(total_count).as(HAHA)";
			let url_fb = "https://graph.facebook.com/v3.0/"
			let access_token = "&access_token="+page_token;

			axios.get(url_fb+idPublicacion+query+access_token).then(response => {

				reacciones.push({  
					angry : response.data.ANGRY.summary.total_count, //
					haha : response.data.HAHA.summary.total_count, //
					love : response.data.LOVE.summary.total_count, //
					like : response.data.LIKE.summary.total_count, //
					sad : response.data.SAD.summary.total_count, //
					wow : response.data.WOW.summary.total_count, //
				});

				self.setState({reacciones : reacciones,});

				let neg = parseInt(response.data.ANGRY.summary.total_count) + parseInt(response.data.SAD.summary.total_count);
				let pos = parseInt(response.data.LOVE.summary.total_count) + parseInt(response.data.LIKE.summary.total_count) + parseInt(response.data.WOW.summary.total_count);

				if(pos > neg)
					this.setState({color: '#1E90FF'});
				else if(neg > pos)
					this.setState({color: '#ff3300'});
				else
					this.setState({color: '#ff6600'});

				// console.log(self.state.publicaciones);
				// console.log(idPublicacion);

				for(let i in self.state.publicaciones) {

					let r = self.state.publicaciones[i];

					if(r.value == idPublicacion) {

						self.setState({
							lat: r.lat,
							long: r.lng,
							zoom: 12,
						});

						// #1E90FF azul
						// #ff6600 naranja
						// #ff3300 rojo

						console.log(':) -->', r.lat, r.lng);

						// return;
					}

				}

			});

		}

		this.setState({ [e.target.name]: e.target.value });

	}


	coordenadas(id){
		switch(id){
			//Viancca Barreto
			case  "1627463167374165":
					this.setState({
                    lat : 32.493699,
                    long : -116.959654,
                    zoom : 12,
                    // kmz : 'secciones',
                });
				break;
			//Celestino Salcedo Flores
			case  "1670414819732611":
				this.setState({
                    lat : 32.619812,
                    long : -115.456473,
                    zoom : 12,
                    // kmz : 'secciones',
                });
				break;
			//Mario Madrigal
			case  "411052376013391":
				this.setState({
                    lat : 32.461746,
                    long : -117.043863,
                    zoom : 12,
                    // kmz : 'secciones',
                });
				break;
			//Adriana Lopez Quintero
			case "1277594875598974":
				this.setState({
                    lat : 32.155425,
                    long : -116.133693,
                    zoom : 8,
                    // kmz : 'secciones',              
 				});
				break;
			// /Erika Santana
			case "496428537221963":
				this.setState({
                    lat : 32.493699,
                    long : -116.959654,
                    zoom : 12,
                    // kmz : 'secciones',
                });
				break;
			//Génesis Márquez Rubalcava
			case  "351741994978553":
				this.setState({
                    lat : 31.865930,
                    long : -116.597069,
                    zoom : 13,
                    // kmz : 'secciones',
                });
				break;
			//Lauro Aréstegui
			case  "242601132597540":
				this.setState({
                    lat : 32.619812,
                    long : -115.456473,
                    zoom : 12,
                    // kmz : 'secciones',
                });
            case "591668464524390":
            	this.setState({
                    lat : 31.865930,
                    long : -116.597069,
                    zoom : 13,
                    // kmz : 'secciones',
                });
				break;

           //fail
			case  "591668464524390":
				this.setState({
                    lat : 31.865930,
                    long : -116.597069,
                    zoom : 13,
                    // kmz : 'secciones',
                });
				break;
				
			
		}
	}

	_handleChangeTab(e, v) {
		this.setState({ 'tabActive': v });
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
		if(index === 2){
			this.props.sigout();
		}

		// close
		this.setState({ anchorEl: null });

	}

	render() {

		const { classes } = this.props;

		let {lat , long , zoom , kmz , reacciones,circulos} = this.state;

		const { tab, auth, anchorEl , paginas , publicaciones} = this.state;
		const open = Boolean(anchorEl);
		
		const { from } = this.props.location.state || { from: { pathname: "/" } };

		let {tabActive} = this.state;

		console.log(this.myRef)

		if(!this.props.auth.authenticated)
			return <Redirect to={from} />;

		return(

			<Grid container className={classes.root} spacing={8}>
				<AppBar>
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.flex}>
							We Natives
						</Typography>
						<IconButton color="inherit" onClick={() => {

							window.location.href = 'http://encuestasbc.org/verify/#/app';

						}} className={classes.button} aria-label="Delete">
							<DashboardIcon />
						</IconButton>
						<IconButton color="inherit" onClick={this.toggle} className={classes.button} aria-label="Delete">
							<Token  />						
						</IconButton>	
						<IconButton color="inherit" onClick={this.toggle_seccion} className={classes.button} aria-label="Delete">
							<SettingsIcon  />
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
								["Profile", "Account","Log Out"].map((option, index) => (
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

				<Grid item xs={4}>
					<Paper style={{height: '532px'}}>
						<AppBar position="static">
				          <Tabs value={tabActive} onChange={this._handleChangeTab}>
				            <Tab label="General" />
				            <Tab label="Percepción" />
				            <Tab label="Preocupaciones" />
				          </Tabs>
				        </AppBar>
				        {tabActive === 0 && 
				        <table width="100%">
				        	<tbody>
				        		<tr aling="center">
				        			<th>{'Distrito'}</th>
				        			<th>{'municipio'}</th>
				        			<th>{'seccion'}</th>
				        			<th>{'Habitantes Seccion'}</th>
				        			
				        		</tr>
			        			<tr aling="center">
				        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.distrito : ''}</td>
				        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.municipio : ''}</td>
				        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.seccion : ''}</td>
				        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.habitantes_seccion : ''}</td>
			        			</tr>
			        		</tbody>
			        	</table>}
				        {tabActive === 1 && 
				        	<table width="100%">
				        		<tbody>
					        		<tr aling="center">
					        			<th>{'Pan'}</th>
					        			<th>{'Pri'}</th>
					        			<th>{'Morena'}</th>
					        			<th>{'Otros'}</th>
					        			<th>{'Candidato'}</th>
					        		</tr>
				        			<tr aling="center">
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.p_pan : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.p_pri : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.p_morena : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.p_otros : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.c_pan : ''}</td>
				        			</tr>
				        		</tbody>
				        	</table>
				        	}
				        {tabActive === 2 && 
				        	<div>
				        	<table width="100%">
				        		<tbody>
					        		<tr aling="center">
					        			<th>{'#Seguridad'}</th>
					        			<th>{'#Servicios Publicos'}</th>
					        			<th>{'#Empleo'}</th>
					        			<th>{'#Infraestructura urbana'}</th>
					        		</tr>
				        			<tr aling="center">
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.seguridad : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.servicios_publicos : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.empleo : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.infrastructura_urbana : ''}</td>
				        			</tr>
				        		</tbody>
				        	</table>
				        	<br/><br/>
				        	<table width="100%">
				        		<tbody>
					        		<tr >
					        			<th aling="center">{'#Agua'}</th>
					        			<th aling="center">{'#Gasolina'}</th>
					        			<th aling="center">{'#Basura'}</th>
					        			<th aling="center">{'#varios'}</th>
					        		</tr>
				        			<tr >
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.agua : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.gasolina : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.basura : ''}</td>
					        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.varios : ''}</td>
				        			</tr>
				        		</tbody>
				        	</table>
				        	
				        	</div>
				        }
					</Paper>
				</Grid>
				<Grid item xs={8}>
					<Grid xs={12}>
						<paper>
							<br/>
							Pri<div style={{padding: '8px', background: '#aa0000', display: 'inline-block',  borderRadius: '50%' , margin : '0px 5px' , fontSize:'10px' }}></div>
							Pan<div style={{padding: '8px', background: '#0000ff', display: 'inline-block',  borderRadius: '50%' , margin : '0px 5px'}}></div>
							Morena<div style={{padding: '8px', background: '#aa5500', display: 'inline-block',  borderRadius: '50%', margin : '0px 5px'}}></div>
							Pan/Morena<div style={{padding: '8px', background: '#ffff00', display: 'inline-block',  borderRadius: '50%', margin : '0px 5px'}}></div>
							Pri/Morena<div style={{padding: '8px', background: '#000000', display: 'inline-block',  borderRadius: '50%', margin : '0px 5px'}}></div>
							Otro<div style={{padding: '8px', background: '#005500', display: 'inline-block',  borderRadius: '50%', margin : '0px 5px'}}></div>
						</paper>
					</Grid>
					<br/>
					<Grid xs={12}>
					<Paper className={classes.paper}>
						<Maps lat={lat} lng={long} zoom={zoom} kmz={kmz} circulos={circulos} color={this.state.color} ref={this.myRef}/>
					</Paper>
					</Grid>
				</Grid>
				 {
					this.state.modal_token&& 
						<Modal 
							open={this.state.modal_token} 
							toggle={this.toggle}
						/>
				}
				<ModalSeccion 
					open={this.state.modal_secciones} 
					toggle={this.toggle_seccion} 
				/>

				{/*<Grid item xs={12}>
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
						{tab === 0 && <Typography>Item Two</Typography>}
						{tab === 1 && <Typography>Item Two</Typography>}
						{tab === 2 && <Typography>Item Three</Typography>}
					</Paper>
				</Grid>*/}

			</Grid>
		)
	}

}

const AppWithStyles = withStyles(styles)(App);

const mapStateToProps = (state, ownProps) => ({
	auth: state.auth,
	secciones : state.secciones
})

const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	actions,
)(AppWithStyles)


