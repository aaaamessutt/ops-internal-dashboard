export interface Task {
  id: string;
  title: string;
  customerId: string;
  assignedToUserId: string;
  priority: 'low' | 'med' | 'high';
  status: 'new' | 'in_progress' | 'done' | 'canceled';
  scheduledAt: string;
  notes: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'ops' | 'admin' | 'field';
  email: string;
  status: 'active' | 'inactive';
}

export interface ActivityEvent {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

export interface Settings {
  businessName: string;
  serviceArea: string;
  contactEmail: string;
  contactPhone: string;
  timezone: string;
}

export interface AppState {
  tasks: Task[];
  customers: Customer[];
  teamMembers: TeamMember[];
  activityEvents: ActivityEvent[];
  settings: Settings;
}
