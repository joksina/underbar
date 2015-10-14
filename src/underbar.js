(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : n > array.length - 1 ? array : array.slice(array.length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //check if it's an array
    //iterate through the collection using for loop
    //invoke callback function
    //if not use for in loop to iterate through coll
    //invoke callback for value
    if(Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }else{
      for(var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  /* 
_.indexOf = function(array, target){
  var indy = -1;
  _.each(array, function(value, index){
  if(value === target){
    indy = index;
  }
  });
  return indy;
}
  */


  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    //create an empty array, filtered
    //iterate through collection using each
    //check the tested value
    //push the result value in the empty array
    //return filtered
    var filtered = [];
    _.each(collection, function(value){
      if(test(value)){
        filtered.push(value);
      }
    });

    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    //iterate using filter and return it
    //return the negated tested value
    return _.filter(collection, function(value){
      return !test(value);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    //set result to empty array
    //iterate using each
    //check the index of value < 0
    // push the duplicate free in result
    // return result
    var result = [];
    _.each(array, function(value){
      if(_.indexOf(result, value) < 0){
        result.push(value);
      }
    });

    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapped = [];
    _.each(collection, function(value){
      mapped.push(iterator(value));
    });
    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //iterate using each
    //check if acc is undefined
    // set acc to first value
    //else set acc to the combination of value and acc
    _.each(collection, function(value, ind, coll){
      if(accumulator === undefined){
        accumulator = value;
      }else{
        accumulator = iterator(accumulator, value);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };
/*
_.contains = function(list, target){
  //iterate through list using reduce
  //set acc to true
  //check if current value is the same as the target
  //return acc
  //return false
  return _.reduce(list, function(acc, curr){
    if(curr === target){
      return acc;
    }
    return false;
  }, true)
}

*/

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    //set iterator to return val when no callback is provided
    //iterate through collection using reduce
    //set accum to true
    //check the iterator value
    //return acc
    // else return false
   iterator = iterator || _.identity;
    return _.reduce(collection, function(accum, curr){
      if(iterator(curr)){
        return accum;
      }
        return false;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return !_.every(collection, function(value){
      return !iterator(value);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var arg = Array.prototype.slice.call(arguments, 1);
    _.each(arg, function(value){
      _.each(value, function(value1, key){
        obj[key] = value1;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var arg = Array.prototype.slice.call(arguments, 1);
    _.each(arg, function(val){
      _.each(val, function(val1, key){
        if(obj[key] === undefined){
          obj[key] = val1;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = {};
    return function(){
      var arg = Array.prototype.slice.call(arguments);
      if(arg in memo){
        return memo[arg];
      }else{
        return memo[arg] = func.apply(this, arg);
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var arg = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(this, arg);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //create a var to convert array-like object to a new array
    var newArr = Array.prototype.slice.call(array);
    //iterate usin red and set acc to an empty array
    return _.reduce(array, function(accums, curr){
      //create a var to store the random numbers
      var random = Math.floor(Math.random()*newArr.length);
      accums.push(newArr[random]);
      newArr.splice(random, 1);
      return accums;
    }, []);
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value){
      if(typeof functionOrKey === "function"){
        return functionOrKey.apply(value, args);
      }else {
        return value[functionOrKey].apply(value, args);
      }
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //check if the iterator is a function
    //sort the collection by invoking each element
    //else use the bracket notation to sort each element
    if(typeof iterator === "function"){
      return collection.sort(function(a, b){
        return iterator(a) - iterator(b);
      });
    }else {
      return collection.sort(function(a, b){
        return a[iterator] - b[iterator];
      });
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var arg = Array.prototype.slice.call(arguments);
    var result = [];
    var longs = _.reduce(arg, function(acc, curr){
      //This is tenary expression if length of acc
    //greater than lenght of curr, return acc else return curr
      return acc.length > curr.length ? acc : curr;
    }, 0);
    _.each(longs, function(value, i){
      result.push(_.map(arg, function(val){
        return val[i];
      }));
    });
    return result;
  };



  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
     result = [];
    _.each(nestedArray, function(val){
      if(Array.isArray(val)){
        result = result.concat(_.flatten(val));
      }else {
        result.push(val);
      }
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(array) {
    //iterate through the array
    //filter the values to be unique so no duplicate values
    //use every to check the new array
    //use contains to check if value of the 
    //array is the same as newArr 
    var newArr = Array.prototype.slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(val){
      return _.every(newArr, function(val2){
        return _.contains(val2, val);
      });
    });
    
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    //Use the same method as intersection
    //negate the contain because we are looking 
    //for uncommon values
    var newArr = Array.prototype.slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(values){
      return _.every(newArr, function(other){
        return !_.contains(other, values);
      });
    });
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var arg = Array.prototype.slice.call(arguments, 2);
    var start = 0;
    var waits = false;
    var timeOut = 0;
    return function() {
      var eDate = new Date().getTime();
      if(!waits && (eDate - start) >= wait){
        start = eDate;
        return func.apply(this, arg);
      } else {
        //set waits to true
        waits = true;
        if(timeOut < 0)
          var preWait = 0;
          timeOut = timeOut + wait;

          var rem = wait - (eDate - start) + timeOut;
          return setTimeout(function() {
            start = new Date().getTime();
            waits = false;
            timeOut = timeOut - 100;
            return func.apply(this, arg);
          }, rem);
      }
    };
  };
}());
