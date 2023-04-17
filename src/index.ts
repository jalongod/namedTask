/**
 * 入口文件
 *
 * @author zcr
 */

import { EventEmitter } from "events";

(globalThis as any).__NAMED_TASK__ = (globalThis as any).__NAMED_TASK__ || {};

const globalTaskManager = (globalThis as any).__NAMED_TASK__;

globalTaskManager.taskCache = globalTaskManager.taskCache || {};
globalTaskManager.eventBus = globalTaskManager.eventBus || new EventEmitter();

const taskCache = globalTaskManager.taskCache as Record<string, Task>;
const eventBus = globalTaskManager.eventBus as EventEmitter;

export type Task = (args: any) => Promise<unknown>;

function getEventName(taskName: string) {
  return "NAMED_TASK_" + taskName;
}

export default async function namedTask<Input, Output>(
  name: string,
  task: (args: Input) => Promise<Output>,
  args: Input
): Promise<Output> {
  const eventName = getEventName(name);
  if (taskCache[name]) {
    const ret = await new Promise<Output>((resolve) => {
      eventBus.on(eventName, (result) => {
        resolve(result);
      });
    });
    return ret;
  }
  taskCache[name] = task;

  const result = await task(args);
  eventBus.emit(eventName, result);

  delete taskCache[name];
  return result;
}
