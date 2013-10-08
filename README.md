Simple JavaScript Task Scheduler
================================

The aim of this small JavaScript class is to serialize asynchronious JavaScript tasks such as AJAX requests, timers.
Simply enqueue your task and notify the system when it's finished.

Example to run two timers sequentially:

    // prepare two tasks to run
    var runAfter3s = function(taskHandle) {
      window.setTimeout(function() {
        alert("Hit first timeout");
        // important to notify the scheduler about completion
        tm.asyncTaskFinished(taskHandle);
      }, 3000);
    };
    var runAfter5s = function(taskHandle) {
      window.setTimeout(function() {
        alert("Hit second timeout");
        tm.asyncTaskFinished(taskHandle);
      }, 5000);
    };
    
    // get an instance of the scheduler and enqueue the tasks
    var tm = new SimpleJsTaskScheduler();
    tm.enqueueAsyncTask(runAfter3s);
    tm.enqueueAsyncTask(runAfter5s);
    
    // ... the two tasks are now run sequentially ...

You can also provide the _enqueueAsyncTask_ method with callback functions to to be executed upon start and completion of the task. For more information see the source code documentation.
