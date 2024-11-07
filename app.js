var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./models/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const { CohereClientV2 } = require('cohere-ai'); // Import Cohere API

// Initialize the Cohere client with your API key
const cohere = new CohereClientV2({
  token: 'xoNnNR0JTYjvWLrUPo5a1XB6GUEJBs8jB47LNfPj', // Replace this with your actual API key
});

// Function to call the API and log the response
(async () => {
  try {
    // Call the Cohere chat endpoint with the message you want to send
    const response = await cohere.chat({
      model: 'command-r-plus',  // Model you're using
      messages: [
        {
          role: 'user',
          content: 'hello world!',  // Message you want to send
        },
      ],
    });
    
    // Inspect the entire response object to see its structure
    console.log("Full Response Object:", response);
    
    // Assuming the text you're interested in is in the 'text' property
    if (response && response.body && response.body.text) {
      console.log("Response Text:", response.body.text);  // Log the text from the response
    } else {
      console.log("Response structure doesn't contain text field.");
    }

  } catch (error) {
    console.error('Error calling Cohere API:', error); // Handle errors
  }
})();


module.exports = app;