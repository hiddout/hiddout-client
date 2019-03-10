const port = 1234;
const isHttps = false;

const config = {
	baseURL:`http${isHttps? 's': ''}://www.hiddout.com:${port}/`,
	apiV1: `api/v1/`,
};

export {config};