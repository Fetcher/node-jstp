var jstp = require("../../../../../../index.js");

var Resource =  {
  userGet: function (engine, answer, dispatch) {
    if (answer) console.log("The answer: " + answer.body);
    else console.log(dispatch);
  }
}

var host = [["localhost", 33333, "tcp"], ["localhost", 44444, "tcp"]];

jstp.bind({
  host: host,
  endpoint: {
    method: "*",
    resource: ["User"],
  }
}, Resource.userGet, Resource);

setTimeout( function () {
  jstp.release({
    host: [["localhost", 33333, "tcp"], ["localhost", 44444, "tcp"]],
    endpoint: {
      method: "*",
      resource: ["User"],
    }
  }, Resource.userGet, Resource);
  
  setTimeout( function () {
    jstp.delete({
      host: [["localhost", 33333, "tcp"], ["localhost", 44444, "tcp"]],
      resource: ["User"],
      body: {
        message: "Hello World"
      }
    });
  }, 1000);
}, 1000);
