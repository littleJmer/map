// https://material-ui.com/demos/lists/

// https://material.io/tools/icons/?style=baseline

import React, {Component} from "react";

import { Redirect } from "react-router-dom";

import { connect } from 'react-redux'

import axios from 'axios';

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

//
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
///

import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/RemoveRedEye';
import TierraIcon from '@material-ui/icons/PinDrop';
import GoogleIcon from '@material-ui/icons/Equalizer';
import FacebookIcon from '@material-ui/icons/Share';

//
import FolderIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';

import Maps from '../../components/googleMaps';

import * as actions from '../../actions/auth.js';

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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const comments = [
  'Realizo un comentario',
  'Dio Me gusta a una publicación',
  'Dio Me encanta a una publicación',
  'Dio Me asombra a una publicación',
  'Dio Me enoja a una publicación',
  'Dio Me entristece a una publicación',
  'Dio Me divierte a una publicación',
  'Compartio una publicación',
];

const people = [
	'Secretario General de Gobierno - Rueda Gómez Francisco',
	'Director Estatal de Protección Civil - Rosquillas Navarro Antonio Helenio',
	'Director de Administración, Secretaría General de Gobierno - Valdivia Martínez José Guadalupe',
	'Jefa de Servicios Administrativos de la Dirección de Administración, S.G.G. - Covarrubias Curiel Karina Elizabeth',
	'Director de Gobierno - Rascón Lepe Juan Francisco',
	'Jefe de Gobierno de la Dirección de Gobierno - Gaxiola Escoboza Luis',
	'Director de Atención al Migrante - Magallanes Cortés Gustavo',
	'Director de Desarrollo Político - Briceño Cinco Amintha Guadalupe',
	'Director de Asuntos Religiosos - Vásquez Hernández Ada Luz',
	'Directora de Enlace y Seguimiento - Salcedo Correa María Estela',
	'Director de Gestión y Atención a Grupos Sociales - Roque García Alejandro',
	'Director de Análisis e Información, Secretaría General de Gobierno - Islas León Guillermo Bernardo',
	'Subsecretario de Gobierno en Tijuana - Méndez Juárez Enrique',
	'Delegada de la Secretaría General de Gobierno en Tecate - Palomarez Ching Mónica Janette',
	'Delegado de la Secretaría General de Gobierno en Playas de Rosarito - Abarca Macklis Silvano',
	'Delegado de la Secretaría General de Gobierno en San Quintín - Dávalos López Arnoldo Moisés',
	'Subsecretario Jurídico - Lujano Sarabia Víctor Iván',
	'Director Jurídico de Normatividad Administrativa, Secretaría General de Gobierno - Díaz Meza Julio César',
	'Directora del Archivo General de Notarías - Llorenz Vivo Keila',
	'Director del Registro Civil en el Estado - Mayoral Murillo Javier',
	'Directora Jurídica Contenciosa, Secretaría General de Gobierno - Márquez Curiel Aída Berenice',
	'Director Jurídico Contencioso Tijuana - Villegas Muñoz Adriana Guadalupe',
	'Subsecretario de Gobierno para Asuntos Legislativos - López Núñez Pablo Alejo',
	'Director de Estudios y Proyectos Legislativos - Velardez Núñez José Fernando',
	'Coordinador de Proyectos Legislativos de la Secretaría General de Gobierno - Elvira Fuentes Saúl',
	'Director de Seguimiento Legislativo - Aguilar Coronado Luis Alberto',
	'Subsecretario de Enlace para Asuntos de Justicia - Armenta Zanabia Rubén Ernesto',
	'Director Estatal de Defensoría Pública - Santos Díaz Jesús Alejandro',
	'Director de Estudios para Asuntos de Justicia de la Subsecretaría de Enlace - Chiang Rodríguez Luis',
	'Director de Implementación y Seguimiento para Asuntos de Justicia - Espinoza Sandoval Blanca Estela',
	'Director de Planeación y Estudios Legislativos - Contreras Angulo Sergio Alberto',
	'Coordinador del Sistema Tradicional del Área Penal de la Defensoría Pública en Ensenada - Valeriano Aguilar Daniel',
	'Coordinadora de Defensoría de Oficio del Área Civil en Ensenada - Ochoa Segura Ivette Marina',
];

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			page: '',
			post: '',
			tab: 0,
			anchorEl: null,
			paginas : [],
			publicaciones : [],
			reacciones : [],
			lat : '',
			long : '',
			zoom : '',
			kmz : 'distritos.kmz',
			data: []
		};

		this.generateComments = this.generateComments.bind(this);

		// this._handleChangeSelect = this._handleChangeSelect.bind(this);
		// this._handleChangeTab = this._handleChangeTab.bind(this);
	}

	componentDidMount() {

       // this.paginas();

    	this.generateComments();
    

    }


    generateComments() {

    	let self = this;

    	let newElement = {
    		name: people[  (Math.floor((Math.random() * 33) + 1)-1) ],
    		comment: comments[  (Math.floor((Math.random() * 8) + 1)-1) ],
    	};

    	self.setState({
    		data: [
    			...self.state.data,
    			newElement,
    		]

    	});

    	setTimeout(() => {
    		self.generateComments();
    	}, 5000);

    }

    // paginas () {
    // 	let urlfb = 'https://graph.facebook.com/v3.0/me';
    //     let token = 'EAACEdEose0cBAMAsA5MSwc0fC77K3TVtwTHN9rukQPQ7D6IxZBmCbAr41NZCIqkGXtFMnH5VBwXKW29eR4ZA6ZCU7VHf8fOeV08M9SKh1U4H1dr6M9pROqXyCryxUaBGVroYDDfrhUGJI8GGator3CkIsT9jJkSY0NQvvun3vcx3myUHRDXQEXL3B7jmtvp78ZC1RKiAzggZDZD';
    //     let consulta = '?fields=accounts%7Bname%2Caccess_token%7D&access_token=';
    //     let paginas = [];
    //     let _self = this;
    //     axios.get(urlfb+consulta+token)
    //     .then(response => {
    //          response.data.accounts.data.some(function(obj) {
    //                 paginas.push({
                        
    //                     value : obj.id,
    //                     label : obj.name,
    //                     token : obj.access_token,
    //                     publicaciones : [],


    //                 });
                                     
    //             });
    //          	 _self.setState({
		  //           paginas : paginas,
		  //       }); 
    //          // 	 paginas.some(function(obj,index){
    //         	// 	console.log(index);
    //         	// 	_self.publicaciones(obj.token,obj.value, index)
    //         	// });  
    //         });

    //         //get publicaciones 



    // }

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

    // reacciones(idPublicacion, access_token_page, index, index_page){
    //     let reacciones = [];
    //     let {paginas} = this.state;
    //     let self = this;
    //     let query = "?fields=reactions.type(LIKE).limit(0).summary(total_count).as(LIKE)%2Creactions.type(LOVE).limit(0).summary(total_count).as(LOVE)%2Creactions.type(SAD).limit(0).summary(total_count).as(SAD)%2Creactions.type(WOW).limit(0).summary(total_count).as(WOW)%2Creactions.type(ANGRY).limit(0).summary(total_count).as(ANGRY)%2Creactions.type(HAHA).limit(0).summary(total_count).as(HAHA)";
    //     let url_fb = "https://graph.facebook.com/v3.0/"
    //     let access_token = "&access_token="+access_token_page;
        
    //     axios.get(url_fb+idPublicacion+query+access_token)
    //     .then(response => {
 
    //         reacciones.push({
                
    //             angry : response.data.ANGRY.summary.total_count,
    //             haha : response.data.HAHA.summary.total_count,
    //             love : response.data.LOVE.summary.total_count,
    //             like : response.data.LIKE.summary.total_count,
    //             sad : response.data.SAD.summary.total_count,
    //             wow : response.data.WOW.summary.total_count,


    //         });

    //         paginas[index_page].publicaciones[index].reacciones = reacciones;
    //         self.setState({
    //             paginas : paginas,
    //         }); 


    //         });

    // }

	// _handleChangeSelect(e) {
		

	// 	let {paginas} = this.state;
	// 	let index = e.target.value;
	// 	let token = paginas[index].token;
	// 	let id_page = paginas[index].value;
	// 	let publicaciones = [];
	// 	let self = this;

	// 	let urlfb = 'https://graph.facebook.com/v3.0/'+id_page+'?fields=feed&access_token=';

 //        axios.get(urlfb+token)
 //        .then(response => {
            
 //             response.data.feed.data.some(function(obj) {
 //             	if(obj.message)
 //                    publicaciones.push({
                        
 //                        value : obj.id,
 //                        label : obj.message.substring(0,35)+"...",
 //                        token : obj.access_token,


 //                    });

 //                    self.setState({
 //                        publicaciones : publicaciones,
 //                    }); 
                              
 //                });


 //            });
 //        this.coordenadas(id_page);
		
	// 	this.setState({ [e.target.name]: e.target.value });
	// }


	// coordenadas(id){
	// 	switch(id){
	// 		//Viancca Barreto
	// 		case  "1627463167374165":
	// 				this.setState({
	// 					lat : 32.493699,
	// 					long : -116.959654,
	// 					zoom : 12,
	// 					kmz : 'secciones',
	// 				});
	// 			break;
	// 		//Celestino Salcedo Flores
	// 		case  "1670414819732611":
	// 			this.setState({
	// 				lat : 32.624728,
	// 				long : -115.489089,
	// 				zoom : 13,
	// 				kmz : 'secciones',
	// 			});
	// 			break;
	// 		//Mario Madrigal
	// 		case  "411052376013391":
	// 			this.setState({
	// 				lat : 32.482082,
	// 				long : -117.075783,
	// 				zoom : 13,
	// 				kmz : 'secciones',
	// 			});
	// 			break;
	// 		//Adriana Lopez Quintero
	// 		case "1277594875598974":
	// 			this.setState({
	// 				lat : 32.003970,
	// 				long : -115.772499,
	// 				zoom : 9,
	// 				kmz : 'secciones',
	// 			});
	// 			break;
	// 		// /Erika Santana
	// 		case "496428537221963":
	// 			this.setState({
	// 				lat : 32.493699,
	// 				long : -116.959654,
	// 				zoom : 12,
	// 				kmz : 'secciones',
	// 			});
	// 			break;
	// 		//Génesis Márquez Rubalcava
	// 		case  "351741994978553":
	// 			this.setState({
	// 				lat : 31.865930,
	// 				long : -116.597069,
	// 				zoom : 13,
	// 				kmz : 'secciones',
	// 			});
	// 			break;
	// 		//Lauro Aréstegui
	// 		case  "242601132597540":
	// 			this.setState({
	// 				lat : 32.419865,
	// 				long :  -115.137080,
	// 				zoom : 11,
	// 				kmz : 'secciones',
	// 			});
	// 			break;
	// 	}
	// }

	// _handleChangeTab(e, v) {
	// 	this.setState({ 'tab': v });
	// }

	_handleAccountMenu(event) {
		this.setState({ anchorEl: event.currentTarget });
	};

	_handleCloseAccountMenu(event) {
		this.setState({ anchorEl: null });
	};

	// _handleAccountMenuItem(evt, index) {
		
	// 	// if(index === 0) {
	// 	// 	makesomething
	// 	// }
	// 	// else if (index === 1) {
	// 	// 	makesomething
	// 	// }
	// 	if(index === 2){
	// 		this.props.sigout();
	// 	}

	// 	// close
	// 	this.setState({ anchorEl: null });

	// }

	render() {

		const { classes } = this.props;

		let {lat , long , zoom , kmz} = this.state;

		const { tab, auth, anchorEl , paginas , publicaciones} = this.state;
		const open = Boolean(anchorEl);
		
		// const { from } = this.props.location.state || { from: { pathname: "/" } };
		// // if(!this.props.auth.authenticated)
		// // 	return <Redirect to={from} />;

		return(
			<Grid container className={classes.root} spacing={8}>
				<AppBar>
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.flex}>
							Verify Coordinates
						</Typography>
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
										
									>
										{option}
									</MenuItem>
								))
							}
						</Menu>
					</Toolbar>
				</AppBar>
				<Grid item xs={4}>
					<Paper className={classes.paper}>
						<div style={{ overflowY: 'scroll', 'maxHeight': 500}}>
		            		<List dense={true}>
				               	{
				            		this.state.data.map((obj, key) => (
				            			<div>
					            			<ListItem>
						            			<ListItemAvatar>
							            			<Avatar>
							            			<FolderIcon />
							            			</Avatar>
							            		</ListItemAvatar>
							            		<ListItemText
						            				primary={obj.name}
						            				secondary={obj.comment}
						            			/>
					            			</ListItem>
					            			<Divider />
				            			</div>
				            		))
				               	}
				              </List>
		                </div>
					</Paper>
				</Grid>
				<Grid item xs={8}>
					<Paper className={classes.paper}>
						<Maps lat={lat} lng={long} zoom={zoom} kmz={kmz}/>
					</Paper>
				</Grid>
			</Grid>
		)
	}

}

const AppWithStyles = withStyles(styles)(App);

const mapStateToProps = (state, ownProps) => ({
	auth: state.auth,
})

const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	actions,
)(AppWithStyles)


