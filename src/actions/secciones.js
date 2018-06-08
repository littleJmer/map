
import {api,request} from './request';
export const get = () => {
	return (dispatch) => {

		request.get('api/secciones')
		.then(function(response)
		{
			if(response.status === 200)
			{
				dispatch({
					type: 'LIST',
					payload: response.data
				});
			}
		});
	}
}

export const update = (departamento, callback) => {
	return (dispatch) => {

        console.log(departamento);
		dispatch({ type: 'SAVE' });

		request.post(`api/secciones/${departamento.id}`, departamento)
		.then(function(response)
		{
			if(response.status === 200)
			{
				dispatch({
					type: 'UPDATE_SUCCESS',
					payload: response.data
				});

				if(typeof callback === 'function') callback();
			}
			else
			{
				dispatch({ type: 'SAVE_FAILURE' });
			}
		})
		.catch(function(error) {
			dispatch({ type: 'SAVE_FAILURE' });
		});

	}
}

export const save = (item, callback) => {
	return (dispatch) => {

		dispatch({ type: 'SAVE' });

		request.post('api/secciones', item).then(function(response) {

			if(response.status === 200) {

                console.log( response.data);
				dispatch({
					type: 'SAVE_SUCCESS',
					payload: response.data
				});

				if(typeof callback === 'function') callback(response.data);

			}
			else{
				dispatch({ type: 'SAVE_FAILURE' });
			}

		})
		.catch(function(error) {
			dispatch({ type: 'SAVE_FAILURE' });
		});

	}
}

export const getInfo = (seccion) => {
	return (dispatch) => {
		request.get('api/seccion/'+seccion)
		.then(function(response)
		{
			console.log(response)
			if(response.status === 200)
			{
				if(response.data.length > 0) {
					dispatch({
						type: 'INFO_OK',

						payload: response.data[0]
					});
				}else {
					dispatch({ type : 'INFO_FAIL' });
				}
			}
		});
	}
}