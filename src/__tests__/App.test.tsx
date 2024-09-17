import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('adds a new task', () => {
  render(<App />);
  
  const inputElement = screen.getByPlaceholderText(/add a new task/i);
  const addButton = screen.getByText(/add task/i);

  fireEvent.change(inputElement, { target: { value: 'Test new task' } });
  fireEvent.click(addButton);

  const taskElement = screen.getByText('Test new task');
  expect(taskElement).toBeInTheDocument();
});

test('marks a task as completed', () => {
    render(<App />);
  
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByText(/add task/i);
  
    fireEvent.change(inputElement, { target: { value: 'Complete this task' } });
    fireEvent.click(addButton);
  
    // Select the second "Complete" button
    const completeButtons = screen.getAllByText(/complete/i);
    fireEvent.click(completeButtons[completeButtons.length - 1]);  // Click the last "Complete" button
  
    const taskElement = screen.getByText('Complete this task');
    expect(taskElement).toHaveClass('completed-task');  // Ensure it has the completed class
  });

  test('deletes a task', () => {
    render(<App />);
  
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByText(/add task/i);
  
    fireEvent.change(inputElement, { target: { value: 'Delete this task' } });
    fireEvent.click(addButton);
  
    const taskElement = screen.getByText('Delete this task');
    expect(taskElement).toBeInTheDocument();
  
    // Select the last "Delete" button (corresponding to the last task added)
    const deleteButtons = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);  // Click the correct delete button
  
    expect(taskElement).not.toBeInTheDocument();  // Ensure the task is deleted
  });

test('displays only uncompleted tasks', () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/add a new task/i);
  const addButton = screen.getByText(/add task/i);

  // Add two tasks
  fireEvent.change(inputElement, { target: { value: 'Task 1' } });
  fireEvent.click(addButton);
  fireEvent.change(inputElement, { target: { value: 'Task 2' } });
  fireEvent.click(addButton);

  // Mark the first task as complete
  const completeButtons = screen.getAllByText(/complete/i);
  fireEvent.click(completeButtons[0]);

  // Check that the uncompleted task is still visible
  const taskElement = screen.getByText('Task 2');
  expect(taskElement).toBeInTheDocument();
});