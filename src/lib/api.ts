
import { Member, Workout, Payment, DashboardStats } from "@/types";

const API_BASE_URL = "http://localhost:3000";

// Members API
export const fetchMembers = async (): Promise<Member[]> => {
  const response = await fetch(`${API_BASE_URL}/members`);
  if (!response.ok) {
    throw new Error("Failed to fetch members");

  }
  return response.json();
};

export const fetchMember = async (id: number): Promise<Member | undefined> => {
  const response = await fetch(`${API_BASE_URL}/members/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return undefined;
    }
    throw new Error("Failed to fetch member");
  }
  return response.json();
};

export const addMember = async (member: Omit<Member, "id">): Promise<Member> => {
  const response = await fetch(`${API_BASE_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
  
  if (!response.ok) {
    throw new Error("Failed to add member");
  }
  
  return response.json();
};

export const updateMember = async (member: Member): Promise<Member> => {
  const response = await fetch(`${API_BASE_URL}/members/${member.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update member");
  }
  
  return response.json();
};

export const deleteMember = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/members/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete member");
  }
  
  const result = await response.json();
  return result.success;
};

// Workouts API
export const fetchWorkouts = async (): Promise<Workout[]> => {
  const response = await fetch(`${API_BASE_URL}/workouts`);
  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return response.json();
};

export const fetchWorkout = async (id: number): Promise<Workout | undefined> => {
  const response = await fetch(`${API_BASE_URL}/workouts/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return undefined;
    }
    throw new Error("Failed to fetch workout");
  }
  return response.json();
};

export const addWorkout = async (workout: Omit<Workout, "id">): Promise<Workout> => {
  const response = await fetch(`${API_BASE_URL}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  
  if (!response.ok) {
    throw new Error("Failed to add workout");
  }
  
  return response.json();
};

export const updateWorkout = async (workout: Workout): Promise<Workout> => {
  const response = await fetch(`${API_BASE_URL}/workouts/${workout.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update workout");
  }
  
  return response.json();
};

export const deleteWorkout = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete workout");
  }
  
  const result = await response.json();
  return result.success;
};

// Payments API
export const fetchPayments = async (): Promise<Payment[]> => {
  const response = await fetch(`${API_BASE_URL}/payments`);
  if (!response.ok) {
    throw new Error("Failed to fetch payments");
  }
  return response.json();
};

export const fetchPayment = async (id: number): Promise<Payment | undefined> => {
  const response = await fetch(`${API_BASE_URL}/payments/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return undefined;
    }
    throw new Error("Failed to fetch payment");
  }
  return response.json();
};

export const addPayment = async (payment: Omit<Payment, "id">): Promise<Payment> => {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });
  
  if (!response.ok) {
    throw new Error("Failed to add payment");
  }
  
  return response.json();
};

// Dashboard Stats API
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return response.json();
};
