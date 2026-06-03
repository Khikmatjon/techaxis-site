// Admin API client utilities

const TIMEOUT = 10000; // 10 second timeout

async function fetchWithTimeout(url: string, options?: RequestInit) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getCourses() {
  const res = await fetchWithTimeout("/api/admin/courses");
  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    console.error(`API error: ${res.status} ${res.statusText}`, errorText);
    throw new Error(`API error: ${res.status} - ${res.statusText}`);
  }
  return res.json();
}

export async function getCourse(id: string) {
  const res = await fetchWithTimeout(`/api/admin/courses/${id}`);
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
}

export async function createCourse(data: any) {
  const res = await fetchWithTimeout("/api/admin/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
}

export async function updateCourse(id: string, data: any) {
  const res = await fetchWithTimeout(`/api/admin/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update course");
  return res.json();
}

export async function deleteCourse(id: string) {
  const res = await fetchWithTimeout(`/api/admin/courses/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete course");
  return res.json();
}

export async function getModules(courseId: string) {
  const res = await fetchWithTimeout(`/api/admin/courses/${courseId}/modules`);
  if (!res.ok) throw new Error("Failed to fetch modules");
  return res.json();
}

export async function createModule(courseId: string, data: any) {
  const res = await fetchWithTimeout(`/api/admin/courses/${courseId}/modules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create module");
  return res.json();
}

export async function updateModule(id: string, data: any) {
  const res = await fetchWithTimeout(`/api/admin/modules/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update module");
  return res.json();
}

export async function deleteModule(id: string) {
  const res = await fetchWithTimeout(`/api/admin/modules/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete module");
  return res.json();
}

export async function getLessons(moduleId: string) {
  const res = await fetchWithTimeout(`/api/admin/modules/${moduleId}/lessons`);
  if (!res.ok) throw new Error("Failed to fetch lessons");
  return res.json();
}

export async function createLesson(moduleId: string, data: any) {
  const res = await fetchWithTimeout(`/api/admin/modules/${moduleId}/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create lesson");
  return res.json();
}

export async function updateLesson(id: string, data: any) {
  const res = await fetchWithTimeout(`/api/admin/lessons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update lesson");
  return res.json();
}

export async function deleteLesson(id: string) {
  const res = await fetchWithTimeout(`/api/admin/lessons/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete lesson");
  return res.json();
}
