
import {api,request} from './request';
export const get = () => {
	return (dispatch) => {

		request.get('api/categorias')
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
		dispatch({ type: 'PROSPECT_SAVE' });

		api().post(`categorias/${departamento.id}`, departamento)
		.then(function(response)
		{
			if(response.status === 200)
			{
				dispatch({
					type: 'PROSPECT_UPDATE_SUCCESS',
					payload: response.data
				});

				if(typeof callback === 'function') callback();
			}
			else
			{
				dispatch({ type: 'PROSPECT_SAVE_FAILURE' });
			}
		})
		.catch(function(error) {
			dispatch({ type: 'PROSPECT_SAVE_FAILURE' });
		});

	}
}

export const save = (item, callback) => {
	return (dispatch) => {

		dispatch({ type: 'PROSPECT_SAVE' });

		api().post('categorias', item).then(function(response) {

			if(response.status === 200) {

                console.log( response.data);
				dispatch({
					type: 'PROSPECT_SAVE_SUCCESS',
					payload: response.data
				});

				if(typeof callback === 'function') callback(response.data);

			}
			else{
				dispatch({ type: 'PROSPECT_SAVE_FAILURE' });
			}

		})
		.catch(function(error) {
			dispatch({ type: 'PROSPECT_SAVE_FAILURE' });
		});

	}
}