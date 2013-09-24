describe("Queue Management", function() {
  var tm = null;

  beforeEach(function() {
    tm = new SimpleTaskManager();
  });
  
  it("should enqueue tasks", function() {
	var task1 = new SimpleTaskManagerTask();
	task1.sync = true;
	task1.handle = 12345;
	var task2 = new SimpleTaskManagerTask();
	task2.sync = false;
	task2.handle = 4711;

	tm.taskPush(task1);
	tm.taskPush(task2);
	expect(tm.taskPop()).toEqual(task1);
	expect(tm.taskPop()).toEqual(task2);
  });
  
  it("should run async task on enqueue", function() {
	var taskFlag = false;
    var taskFct1 = function(taskHandle) {
      window.setTimeout(function() {
        taskFlag = true;
        tm.asyncTaskFinished(taskHandle);
      }, 200);
    };
    var taskHandle1 = tm.enqueueAsyncTask(taskFct1);
    expect(tm.taskRunning).toBeTruthy();
    expect(tm.runningTaskHandle).toEqual(taskHandle1);
    waitsFor(function() {
      if(tm.taskRunning) {
        return false;
      }
      return true;
    }, "'Task running' flag to be unset", 1000);
    runs(function() {
      expect(taskFlag).toBeTruthy();
    });
  });
  
  it("should run async tasks sequentially", function() {
    var taskFlag1 = false;
    var taskFlag2 = false;
    var taskOrder = 0;
    var taskFct1 = function(taskHandle) {
      window.setTimeout(function() {
        taskFlag1 = true;
        taskOrder = 1;
        tm.asyncTaskFinished(taskHandle);        
      }, 500);
    };
    var taskFct2 = function(taskHandle) {
      window.setTimeout(function() {
        taskFlag2 = true;
        taskOrder = 2;
        tm.asyncTaskFinished(taskHandle);        
      }, 200);
    };
    tm.enqueueAsyncTask(taskFct1);
    tm.enqueueAsyncTask(taskFct2);
    waitsFor(function() {
      if(taskFlag1 == true && taskFlag2 == true) {
    	  return true;
      }
      return false;
    }, "one or both of tasks did not run", 2000);
    runs(function() {
    	expect(taskOrder).toBe(2);
    	expect(tm.taskRunning).toBeFalsy();
    });
  });
  
});