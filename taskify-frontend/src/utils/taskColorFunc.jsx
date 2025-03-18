export const getBackgroundColorClass = (todoList) => {
  if (!todoList || todoList.length === 0) return "bg-gray-200";

  const completedTodos = todoList.filter((todo) => todo.isComplete).length;
  const totalTodos = todoList.length;
  const completionRate = completedTodos / totalTodos;

  if (completionRate === 1) {
    return "bg-green-200";
  } else if (completionRate > 0) {
    return "bg-yellow-200";
  } else {
    return "bg-red-200";
  }
};
