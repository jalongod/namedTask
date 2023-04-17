/**
 * 入口文件
 *
 * @author zcr
 */
type Task = (args: any) => Promise<unknown>;
declare function namedTask<Input, Output>(name: string, task: (args: Input) => Promise<Output>, args: Input): Promise<Output>;

export { Task, namedTask as default };
