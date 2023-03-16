// err {
// 	statusCode: number;
// 	status: string;
// }
module.exports.globalErrorHandler = (
	err,
	req,
	res,
	next
) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		console.log(
			`Status Code: ${err.statusCode}\nStatus: ${err.status}\n${
				err.stack || ''
			}`
		);
	}

	return res.status(err.statusCode).send(err.message);
};
