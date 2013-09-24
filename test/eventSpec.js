describe("Event", function() {
  var tm = null;

  beforeEach(function() {
    tm = new SimpleTaskManager();
  });
  
  it("should be fired on task start", function() {
    var taskFlag1 = false;
    var taskFlag2 = false;
    var taskOrder = 0;
    var taskFct1 = function(taskHandle) {
      window.setTimeout(function() {
        tm.asyncTaskFinished(taskHandle);        
      }, 500);
    };
    var taskFct2 = function(taskHandle) {
      window.setTimeout(function() {
        tm.asyncTaskFinished(taskHandle);        
      }, 200);
    };
    var taskCbk1 = function() {
      taskFlag1 = true;
      taskOrder = 1;
    };
    var taskCbk2 = function() {
      taskFlag2 = true;
      taskOrder = 2;
    };
    
    tm.enqueueAsyncTask(taskFct1, taskCbk1);
    tm.enqueueAsyncTask(taskFct2, taskCbk2);
    
    waitsFor(function() {
      if(taskFlag1 == true && taskFlag2 == true) {
    	  return true;
      }
      return false;
    }, "start callback for both tasks", 2000);
    runs(function() {
    	expect(taskOrder).toBe(2);
    });
    waitsFor(function() {
      if(tm.taskRunning == true) {
        return false;
      }
      return true;
    }, "finish tasks", 2000);
  });
  
  it("should be fired on task finish", function() {
    var taskFlag1 = false;
    var taskFlag2 = false;
    var taskOrder = 0;
    var taskFct1 = function(taskHandle) {
      window.setTimeout(function() {
        tm.asyncTaskFinished(taskHandle);        
      }, 500);
    };
    var taskFct2 = function(taskHandle) {
      window.setTimeout(function() {
        tm.asyncTaskFinished(taskHandle);        
      }, 200);
    };
    var taskCbk1 = function() {
      taskFlag1 = true;
      taskOrder = 1;
    };
    var taskCbk2 = function() {
      taskFlag2 = true;
      taskOrder = 2;
    };
	    
    tm.enqueueAsyncTask(taskFct1, taskCbk1);
    tm.enqueueAsyncTask(taskFct2, taskCbk2);
    
    waitsFor(function() {
      if(taskFlag1 == true && taskFlag2 == true) {
        return true;
      }
      return false;
    }, "start callback for both tasks", 2000);
    runs(function() {
      expect(taskOrder).toBe(2);
    });
    waitsFor(function() {
      if(tm.taskRunning == true) {
        return false;
      }
      return true;
    }, "finish tasks", 2000);
  }); 
});