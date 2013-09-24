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

  it("should enqueue asynchronous tasks", function() {
	taskFct1 = function() {
      return null;
    };
	taskFct2 = function() {
	  return 12345;
    };
    taskHandle1 = tm.enqueueAsyncTask(taskFct1);
    taskHandle2 = tm.enqueueAsyncTask(taskFct2);
    
    taskInfo1 = tm.taskPop();
    taskInfo2 = tm.taskPop();
    
    expect(taskInfo1).not.toBeNull();
    expect(taskInfo1.sync).toBeFalsy();
    expect(taskInfo1.handle).toEqual(taskHandle1);
    expect(taskInfo1.taskFunction).toEqual(taskFct1);
    expect(taskInfo2).not.toBeNull();
    expect(taskInfo2.sync).toBeFalsy();
    expect(taskInfo2.handle).toEqual(taskHandle2);
    expect(taskInfo2.taskFunction).toEqual(taskFct2);
  });
  
  it("should run async task on enqueue", function() {
	var taskFlag = false;
    taskFct1 = function(taskHandle) {
      window.setTimeout(function() {
        taskFlag = true;
        tm.asyncTaskFinished(taskHandle);
      }, 200);
    };
    taskHandle1 = tm.enqueueAsyncTask(taskFct1);
    expect(tm.taskRunning).toBeTruthy();
    expect(tm.runningTaskHandle).toEqual(taskHandle1);
    waitsFor(function() {
    	if(tm.taskRunning) {
    		return false;
    	}
    	return true;
    }, "'Task running' flag is not reset", 100);
    runs(function() {
    	expect(taskFlag).toBeTruthy();
    });
  });
  
  it("should run async tasks sequentially", function() {
    var taskFlag1 = false;
    var taskFlag2 = false;
    var taskOrder = 0;
    taskFct1 = function(taskHandle) {
      window.setTimeout(function() {
        taskFlag1 = true;
        taskOrder = 1;
        tm.asyncTaskFinished(taskHandle);        
      }, 500);
    };
    taskFct2 = function(taskHandle) {
      window.setTimeout(function() {
        taskFlag2 = true;
        taskOrder = 2;
        tm.asyncTaskFinished(taskHandle);        
      }, 200);
    };
    taskHandle1 = tm.enqueueAsyncTask(taskFct1);
    taskHandle2 = tm.enqueueAsyncTask(taskFct2);
    waitsFor(function() {
      if(taskFlag1 == true && taskFlag2 == true) {
    	  return true;
      }
      return false;
    });
    runs(function() {
    	expect(taskOrder).toBe(2);
    	expect(tm.taskRunning).toBeFalsy();
    });
  });
  
});