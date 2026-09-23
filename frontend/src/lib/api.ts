export type Task = {
  id: number
  title: string
  step: string
  mins: number
  energy: string
  carried: boolean
  done: boolean
  order: number
}

export type SortedTask = {
  title: string
  step: string
  mins: number
  energy: string
}

const API_URL = import.meta.env.VITE_API_URL

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks/`)
  if (!res.ok) throw new Error("Failed to load tasks")
  return res.json()
}

export async function updateTask(
  id: number,
  updates: Partial<Task>
): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error("Failed to update task")
  return res.json()
}

export async function createTask(task: SortedTask): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, carried: false, done: false, order: 0 }),
  })
  if (!res.ok) throw new Error("Failed to create task")
  return res.json()
}

export async function sortBrainDump(text: string): Promise<SortedTask[]> {
  const res = await fetch(`${API_URL}/ai/sort`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error("Failed to sort")
  return res.json()
}
