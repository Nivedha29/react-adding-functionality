import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func,
};

TaskList.defaultProps = {
  onToggle: () => {},
};

export default TaskList;