const port = 1234;

const config = {
	baseURL:(process.env.NODE_ENV === 'production') ? 'https://hiddout.com/' : `http://localhost:${port}/`,
	apiV1: `api/v1/`,
};

export {config};