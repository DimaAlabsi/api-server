'use strict';

//test out the logger middle ware..
const loggerMiddleware = require('../src/middleware/logger');
// const jest = require('jest');
describe('test logger middleware',()=>{

    let consoleSpy; //declaring a variable to keep on it any operation in the console.log
    
let req={};
let res={};
let next= jest.fn(); //spy mock fun

beforeEach (()=>{   // fun excuted before the test unit worked
consoleSpy =jest.spyOn(console, 'log').mockImplementation(); // spying for any console .log from out logger middlewarw

})


afterEach(()=>{
    consoleSpy.mockRestore(); //reset testing var
})

test('logs some output to the console',()=>{
    loggerMiddleware(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
})

  test('check if moving to the next middleware', () => {
    loggerMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

})




