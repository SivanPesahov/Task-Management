import api from "../api.service";

export async function fetchTask(taskId) {
  const { data } = await api.get("/task/" + taskId);
  return data;
}

export async function updateTask(taskId, payload) {
  const { data } = await api.patch("/task/edit/" + taskId, payload);
  return data;
}

export async function deleteTask(taskId) {
  const { data } = await api.delete("/task/" + taskId);
  return data;
}
