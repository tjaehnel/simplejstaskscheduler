/**
 * Class: SimpleTaskManager
 * provides an interface to manage and run asynchronous tasks.
 * 
 */
function SimpleTaskManager() {
	this.taskQueue = [];
	this.prevTaskHandle = 0;
	this.taskRunning = false;
	this.runningTaskHandle = 0;
}

/**
 * Function: enqueueAsyncTask
 * Put an asynchronous task into the queue.
 * Asynchronous means the given function returns immediately
 * upon execution but e.g. spawns another thread.
 * After the task finished executing it must call
 * asyncTaskFinished to indicate this.
 * 
 * Parameters:
 * taskFunction - reference to the task function
 *                This function is executed in order to run the task.
 *                The task handle is adopted as the only
 *                parameter on execution
 *                Prototype: function taskFunction(taskHandle);
 *                
 * Return:
 * task handle
 */
SimpleTaskManager.prototype.enqueueAsyncTask = function(taskFunction) {
	var task = new SimpleTaskManagerTask();
	task.handle = this.generateTaskHandle();
	task.sync = false;
	task.taskFunction = taskFunction;
	this.taskQueue.push(task);
	return task.handle;
}

/**
 * Function: asyncTaskFinished
 * This function has to be called by asynchronous tasks when they
 * finish executing.
 * 
 * Parameters:
 * taskHandle - Handle of the finishing task
 */
SimpleTaskManager.prototype.asyncTaskFinished = function(taskHandle) {
	
}

SimpleTaskManager.prototype.taskPush = function(task) {
	this.taskQueue.push(task);
}

SimpleTaskManager.prototype.taskPop = function() {
	return this.taskQueue.shift();
}

SimpleTaskManager.prototype.generateTaskHandle = function() {
	this.prevTaskHandle++;
	return this.prevTaskHandle;
}

SimpleTaskManager.prototype.schedulerMain = function() {
	if (this.taskRunning == false) {
		return;
	}
	this.runNextTask();
}

SimpleTaskManager.prototype.runNextTask = function() {
	if (this.taskQueue.length < 1) {
		return;
	}
	this.taskRunning = true;
	var crntTask = this.taskPop();
	this.runningTaskHandle = crntTask.handle;
	crntTask.taskFunction();
}

function SimpleTaskManagerTask() {
	this.handle = null; // task handle
	this.taskFunction = null; // function to run the task
	this.sync = false; // synchronous taskFunction 
}
