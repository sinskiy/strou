interface TaskProps {
  task: string;
}

const Task = ({ task }: TaskProps) => {
  return (
    <div className="bg-surface-container rounded-md p-4 flex items-center gap-2">
      <input type="checkbox" name={task} id={task} />
      <label htmlFor={task}>{task}</label>
    </div>
  );
};

export default Task;
