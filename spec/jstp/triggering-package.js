var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPTriggeringPackage').addBatch({
  'new JSTPTriggeringPackage( JSTPEngine engine, String currentEmitter )': {
    'a non empty emitter is given': {
      'should have the engine and the emitter': function () {
        var mockEngine = {};
        var triggeringPackage = new jstp.JSTPTriggeringPackage( mockEngine, "emitMe" );
        assert.equal(triggeringPackage.getEngine(), mockEngine);
        assert.equal(triggeringPackage.getCurrentEmitter(), "emitMe");
      }
    },

    'a null emitter is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': function () {
        assert.throws(function () {
          new jstp.JSTPTriggeringPackage({}, null);
        }, jstp.JSTPMissingEmitterInTriggeringPackage);
      }
    },

    'only one argument is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': function () {
        assert.throws(function () {
          new jstp.JSTPTriggeringPackage({});
        }, jstp.JSTPMissingEmitterInTriggeringPackage);
      }
    },

    'an empty string is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': function () {
        assert.throws(function () {
          new jstp.JSTPTriggeringPackage({}, "");
        }, jstp.JSTPMissingEmitterInTriggeringPackage);
      }
    },

    'a non string argument is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': function () {
        assert.throws(function () {
          new jstp.JSTPTriggeringPackage({}, ["asdf"]);
        }, jstp.JSTPMissingEmitterInTriggeringPackage);
      }
    }
  },

  '#getEngine()': {
    'should return the engine': function () {
      var mockEngine = {};
      var triggeringPackage = new jstp.JSTPTriggeringPackage( mockEngine, "something" );
      assert.equal(triggeringPackage.getEngine(), mockEngine);
    }
  },

  '#setDispatch( JSTPDispatch dispatch )': {
    'is a JSTPDispatch': {
      'not of Answer Morphology': {
        'should set the dispatch': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
          var dispatch = new jstp.JSTPDispatch();
          
          dispatch.setMethod("GET");
          dispatch.setResource(["test"]);
          dispatch.setProtocol(["JSTP", "0.6"]);
          dispatch.setTimestamp(new Date().getTime());
          dispatch.validate = function () {}

          triggeringPackage.setDispatch(dispatch);
          assert.equal(triggeringPackage.getDispatch(), dispatch);
        },
        
        'should not set the answer': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
          var dispatch = new jstp.JSTPDispatch();
          
          dispatch.setMethod("GET");
          dispatch.setResource(["test"]);
          dispatch.setProtocol(["JSTP", "0.6"]);
          dispatch.setTimestamp(new Date().getTime());
          dispatch.validate = function () {}

          triggeringPackage.setDispatch(dispatch);
          assert.isNull(triggeringPackage.getAnswer());
        }
      },

      'of Answer Morphology': {
        'should set the answer': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
          var dispatch = new jstp.JSTPDispatch();
          
          dispatch.setMethod("ANSWER");
          dispatch.setResource([200, "423fweqrqwer", "341gwarewrre"]);
          dispatch.setProtocol(["JSTP", "0.6"]);
          dispatch.setTimestamp(new Date().getTime());
          dispatch.validate = function () {}

          triggeringPackage.setDispatch(dispatch);
          assert.equal(triggeringPackage.getAnswer(), dispatch);          
        },

        'should not set the dispatch': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
          var dispatch = new jstp.JSTPDispatch();
          
          dispatch.setMethod("ANSWER");
          dispatch.setResource([200, "423fweqrqwer", "341gwarewrre"]);
          dispatch.setProtocol(["JSTP", "0.6"]);
          dispatch.setTimestamp(new Date().getTime());
          dispatch.validate = function () {}

          triggeringPackage.setDispatch(dispatch);
          assert.isNull(triggeringPackage.getDispatch());
        }
      },

      'it should call `validate()` on the JSTPDispatch': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod("GET");
        dispatch.validate = function () { this.validateWasCalled = true; }
        triggeringPackage.setDispatch(dispatch);
        assert.isTrue(dispatch.validateWasCalled);
      }
    },

    'is not a JSTPDispatch': {
      'should throw a JSTPInvalidArgumentForSetDispatch error': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something");
        assert.throws(function () {
          triggeringPackage.setDispatch("notADispatch");
        }, jstp.JSTPInvalidArgumentForSetDispatch);
      }
    }
  },

  '#getAnswer()': {
    'there is an answer': {
      'should return the JSTPDispatch answer': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("ANSWER");
        dispatch.setResource([200, "423fweqrqwer", "341gwarewrre"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());
        dispatch.validate = function () {}

        triggeringPackage.setDispatch(dispatch);
        assert.equal(triggeringPackage.getAnswer(), dispatch);
      }
    },

    'there is no answer': {
      'should return null': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("PUT");
        dispatch.setResource(["341gwarewrre"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());
        dispatch.validate = function () {}

        triggeringPackage.setDispatch(dispatch);
        assert.isNull(triggeringPackage.getAnswer());
      }
    }
  },

  '#getDispatch()': {
    'there is a dispatch': {
      'should return the JSTPDispatch dispatch': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("GET");
        dispatch.setResource(["test"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());
        dispatch.validate = function () {}        

        triggeringPackage.setDispatch(dispatch);
        assert.equal(triggeringPackage.getDispatch(), dispatch);
      }
    },

    'there is no dispatch': {
      'should return null': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("ANSWER");
        dispatch.setResource([200, "423fweqrqwer", "341gwarewrre"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());
        dispatch.validate = function () {}

        triggeringPackage.setDispatch(dispatch);
        assert.isNull(triggeringPackage.getDispatch());        
      }
    }
  },

  '#getCurrentEmitter()': {
    'should return the emitter label': function () {
      var mockEngine = {};
      var triggeringPackage = new jstp.JSTPTriggeringPackage(mockEngine, "myEmitter");
      assert.equal(triggeringPackage.getCurrentEmitter(), "myEmitter");
    }
  },

  '#answer( Integer statusCode, Object body [, JSTPCallable callback [, Object context ]])': {
    'there is a dispatch with transaction and triggering IDs': {
      'should prepare the JSTPDispatch answer and call the engine with the data': 'pending',
      'should set the From Header accordingly with the current Emitter': 'pending'
    },
    'there is an answer with transaction and triggering IDs': {
      'should prepare the JSTPDispatch answer and call the engine with the data': 'pending',
      'should set the From Header accordingly with the current Emitter': 'pending'
    }
  },

  '#dispatch': {

    'no arguments': {
      'should raise a JSTPMissingDispatch exception': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage({}, "emitter");
        assert.throws(function () {
          triggeringPackage.dispatch();
        }, jstp.JSTPMissingDispatch);
      }
    },

    'at least an argument': {
      'which is not a JSTPDispatch': {
        'should throw a JSTPNotADispatch error': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage({}, "emitter");
          assert.throws(function () {
            triggeringPackage.dispatch("lala");
          }, jstp.JSTPNotADispatch);
        }
      },

      'there is something in the From Header': {
        'should add the current emitter': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage(
            { dispatch: function () {}}, "emitter");
          var dispatch = new jstp.JSTPDispatch();
          dispatch.setFrom(["there"]);
          triggeringPackage.dispatch(dispatch);
          assert.equal(dispatch.getFrom()[0], "emitter");
          assert.equal(dispatch.getFrom()[1], "there");
          assert.equal(dispatch.getFrom().length, 2);
        }
      },

      'there is nothing in the From Header': {
        'should set it to the current Emitter': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage(
            {dispatch: function () {}}, "emitter");
          var dispatch = new jstp.JSTPDispatch();
          triggeringPackage.dispatch(dispatch);
          assert.equal(dispatch.getFrom()[0], "emitter");
          assert.equal(dispatch.getFrom().length, 1);          
        }
      },
      
      '( JSTPDispatch dispatch )': {
        'should call the engine.dispatch with the dispatch': function () {
          var theDispatch = new jstp.JSTPDispatch();

          var mockEngine = {
            dispatch: function (dispatch) {
              this.dispatchWasCalled = true;
              assert.equal(theDispatch, dispatch);
            }
          }

          var triggeringPackage = new jstp.JSTPTriggeringPackage(mockEngine, "emitter");
          triggeringPackage.dispatch(theDispatch);
          assert.isTrue(mockEngine.dispatchWasCalled);
        }
      },

      '( JSTPDispatch dispatch, JSTPCallable callback )': {
        'should call the engine.dispatch with the arguments': function () {
          var theDispatch = new jstp.JSTPDispatch();
          var theCallback = function () {};

          var mockEngine = {
            dispatch: function (dispatch, callback) {
              this.dispatchWasCalled = true;
              assert.equal(theDispatch, dispatch);
              assert.equal(theCallback, callback);
            }
          }

          var triggeringPackage = new jstp.JSTPTriggeringPackage(mockEngine, "emitter");
          triggeringPackage.dispatch(theDispatch, theCallback);
          assert.isTrue(mockEngine.dispatchWasCalled);
        },

        'the callback has no .call method': {
          'should raise a JSTPNotCallable error': function () {
            var theDispatch = new jstp.JSTPDispatch();
            var theCallback = "mockCallable";
            var triggeringPackage = new jstp.JSTPTriggeringPackage(
              {dispatch: function () {}}, "emitter");

            assert.throws(function () {
              triggeringPackage.dispatch(theDispatch, theCallback);
            }, jstp.JSTPNotCallable);
          }
        }
      },

      '( JSTPDispatch dispatch, JSTPCallable callback, Object context )': {
        'should call the engine.dispatch with the arguments': function () {
          var theDispatch = new jstp.JSTPDispatch();
          var theCallback = function () {};
          var theContext  = {};

          var mockEngine = {
            dispatch: function (dispatch, callback, context) {
              this.dispatchWasCalled = true;
              assert.equal(theDispatch, dispatch);
              assert.equal(theCallback, callback);
              assert.equal(theContext,  context);
            }
          }

          var triggeringPackage = new jstp.JSTPTriggeringPackage(mockEngine, "emitter");
          triggeringPackage.dispatch(theDispatch, theCallback, theContext);
          assert.isTrue(mockEngine.dispatchWasCalled);          
        }
      },

    }
  }
}).export(module); 

// dude, that's not TDD. that's OCD-DD