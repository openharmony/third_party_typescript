declare namespace taskpool {
    class Task {
        constructor(func: Function, ...args: Object[]);
        constructor(name: string, func: Function, ...args: Object[]);
    }
    class TaskGroup {
        addTask(func: Function, ...args: Object[]): void;
        addTask(task: Task): void;
    }

    class LongTask extends Task { 
    }
    class GenericsTask<A extends Array<Object>, R> extends Task {
        constructor(func: (...args: A)=> R | Promise<R>, ...args: A);
        constructor(name: string, func: (...args: A)=> R | Promise<R>, ...args: A);
    }

    function execute(func: Function, ...args: Object[]): Promise<Object>;
    function execute(task: Task, priority?: Priority): Promise<Object>;
}

export default taskpool;