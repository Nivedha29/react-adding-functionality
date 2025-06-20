import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function TaskItem({ task, onToggle }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {task.title}
        <span style={{ fontSize: '0.8em', color: '#999', marginLeft: '10px' }}>
          (created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })})
        </span>
      </label>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onToggle: PropTypes.func,
};

TaskItem.defaultProps = {
  onToggle: () => {},
};

export default TaskItem;