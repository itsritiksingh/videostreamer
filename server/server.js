const {app} = require("./index");
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");

function terminate(server, options = { coredump: false, timeout: 500 }) {
  // Exit function
  const exit = (code) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code, reason) => (err, promise) => {
    if (err && err instanceof Error) {
      console.log(err.message, err.stack);
    }

    // Attempt a graceful shutdown
    server.close(()=>{
        
        mongoose.connection.close(function () {
            console.log('Mongoose connection disconnected');
            process.exit(0)
        })
        exit(code);
    });
    setTimeout(exit, options.timeout).unref();
  };
}

const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500,
});

process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
process.on("SIGTERM", exitHandler(0, "SIGTERM"));
process.on("SIGINT", exitHandler(0, "SIGINT"));
process.on("SIGQUIT", exitHandler(0, "SIGQUIT"));

server.listen(process.env.PORT || 5000,()=> console.log("server.address.port"));
