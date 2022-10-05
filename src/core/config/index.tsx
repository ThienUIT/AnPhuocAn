import Axios, { AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3000';
const timeout = 30000;

const httpConnection = Axios.create({
	baseURL: baseURL || 'http://localhost:3000',
	timeout: timeout || 30000,
	headers: {
		'Content-Type': 'application/json',
	},
	transformRequest: (request: any) => request,
	// if (request instanceof FormData) {
	//     return request;
	// } else {
	//     return JsonUtils.toJson(request);
	// }
	transformResponse: (response: any) => response,
	withCredentials: false,
});

httpConnection.interceptors.request.use(
	function (config) {
		const token = 'token_secret';

		config.headers = {
			authorization: token,
		};

		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

httpConnection.interceptors.response.use(
	function (res): Promise<any> {
		return Promise.resolve({
			data: JSON.parse(res.data),
			status: res.status,
		});
	},
	function (error) {
		return Promise.reject(error);
	},
);

export default httpConnection;
