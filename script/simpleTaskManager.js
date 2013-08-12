/**
 * Class: SimpleTaskManager
 * provides an interface to manage and run asynchronous tasks.
 * 
 */
function SimpleTaskManager() {
	this.queue = null;
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
 *                
 * Return:
 * task handle
 */
SimpleTaskManager.prototype.enqueueAsyncTask = function(taskFunction) {
	
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
