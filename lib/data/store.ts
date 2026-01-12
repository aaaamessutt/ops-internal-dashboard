import { AppState, Task, Customer, TeamMember, ActivityEvent, Settings } from '../types';

const STORAGE_KEY = 'ops_dashboard_state';

// Seed data
const seedState: AppState = {
  customers: [
    {
      id: 'cust-1',
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '555-0101',
      address: '123 Main St, Springfield',
      status: 'active',
      createdAt: '2025-12-01T10:00:00Z',
    },
    {
      id: 'cust-2',
      name: 'TechStart Inc',
      email: 'hello@techstart.io',
      phone: '555-0102',
      address: '456 Innovation Dr, Tech City',
      status: 'active',
      createdAt: '2025-12-05T14:30:00Z',
    },
    {
      id: 'cust-3',
      name: 'Green Energy Co',
      email: 'info@greenenergy.com',
      phone: '555-0103',
      address: '789 Solar Ave, Ecoville',
      status: 'active',
      createdAt: '2025-12-10T09:15:00Z',
    },
    {
      id: 'cust-4',
      name: 'BuildRight Construction',
      email: 'jobs@buildright.com',
      phone: '555-0104',
      address: '321 Builder Blvd, Constructo',
      status: 'active',
      createdAt: '2025-12-12T11:00:00Z',
    },
    {
      id: 'cust-5',
      name: 'FreshMarket Foods',
      email: 'orders@freshmarket.com',
      phone: '555-0105',
      address: '654 Grocery Ln, Foodtown',
      status: 'active',
      createdAt: '2025-12-15T08:45:00Z',
    },
    {
      id: 'cust-6',
      name: 'Urban Design Studio',
      email: 'studio@urbandesign.com',
      phone: '555-0106',
      address: '987 Creative Way, Artville',
      status: 'active',
      createdAt: '2025-12-18T13:20:00Z',
    },
    {
      id: 'cust-7',
      name: 'Legacy Systems Ltd',
      email: 'support@legacy.com',
      phone: '555-0107',
      address: '111 Old Tech Rd, Vintage City',
      status: 'inactive',
      createdAt: '2025-11-20T10:00:00Z',
    },
    {
      id: 'cust-8',
      name: 'CloudFirst Solutions',
      email: 'info@cloudfirst.io',
      phone: '555-0108',
      address: '222 Cloud St, SkyCity',
      status: 'active',
      createdAt: '2026-01-02T09:00:00Z',
    },
  ],
  teamMembers: [
    {
      id: 'user-1',
      name: 'Sarah Johnson',
      role: 'admin',
      email: 'sarah@ops.com',
      status: 'active',
    },
    {
      id: 'user-2',
      name: 'Mike Chen',
      role: 'field',
      email: 'mike@ops.com',
      status: 'active',
    },
    {
      id: 'user-3',
      name: 'Emily Rodriguez',
      role: 'ops',
      email: 'emily@ops.com',
      status: 'active',
    },
    {
      id: 'user-4',
      name: 'James Wilson',
      role: 'field',
      email: 'james@ops.com',
      status: 'active',
    },
    {
      id: 'user-5',
      name: 'Lisa Anderson',
      role: 'ops',
      email: 'lisa@ops.com',
      status: 'inactive',
    },
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Install new HVAC system',
      customerId: 'cust-1',
      assignedToUserId: 'user-2',
      priority: 'high',
      status: 'new',
      scheduledAt: '2026-01-15T09:00:00Z',
      notes: 'Requires two technicians. Customer prefers morning.',
      createdAt: '2026-01-10T10:00:00Z',
    },
    {
      id: 'task-2',
      title: 'Network infrastructure audit',
      customerId: 'cust-2',
      assignedToUserId: 'user-3',
      priority: 'med',
      status: 'in_progress',
      scheduledAt: '2026-01-13T10:00:00Z',
      notes: 'Check all switches and routers.',
      createdAt: '2026-01-08T14:00:00Z',
    },
    {
      id: 'task-3',
      title: 'Solar panel maintenance',
      customerId: 'cust-3',
      assignedToUserId: 'user-4',
      priority: 'low',
      status: 'in_progress',
      scheduledAt: '2026-01-14T08:00:00Z',
      notes: 'Annual checkup and cleaning.',
      createdAt: '2026-01-09T09:00:00Z',
    },
    {
      id: 'task-4',
      title: 'Foundation inspection',
      customerId: 'cust-4',
      assignedToUserId: 'user-2',
      priority: 'high',
      status: 'new',
      scheduledAt: '2026-01-16T07:00:00Z',
      notes: 'Site is 30 minutes away. Bring inspection tools.',
      createdAt: '2026-01-11T11:00:00Z',
    },
    {
      id: 'task-5',
      title: 'Refrigeration system repair',
      customerId: 'cust-5',
      assignedToUserId: 'user-4',
      priority: 'high',
      status: 'new',
      scheduledAt: '2026-01-13T06:00:00Z',
      notes: 'Urgent - refrigeration down. Early morning required.',
      createdAt: '2026-01-12T16:00:00Z',
    },
    {
      id: 'task-6',
      title: 'Office lighting upgrade',
      customerId: 'cust-6',
      assignedToUserId: 'user-3',
      priority: 'med',
      status: 'done',
      scheduledAt: '2026-01-10T13:00:00Z',
      notes: 'LED conversion completed successfully.',
      createdAt: '2026-01-05T10:00:00Z',
    },
    {
      id: 'task-7',
      title: 'Quarterly equipment check',
      customerId: 'cust-1',
      assignedToUserId: 'user-2',
      priority: 'low',
      status: 'done',
      scheduledAt: '2026-01-09T14:00:00Z',
      notes: 'All equipment in good condition.',
      createdAt: '2026-01-02T09:00:00Z',
    },
    {
      id: 'task-8',
      title: 'Cloud migration consultation',
      customerId: 'cust-8',
      assignedToUserId: 'user-3',
      priority: 'med',
      status: 'new',
      scheduledAt: '2026-01-17T10:00:00Z',
      notes: 'Initial discovery meeting with IT team.',
      createdAt: '2026-01-11T15:00:00Z',
    },
    {
      id: 'task-9',
      title: 'Security system installation',
      customerId: 'cust-4',
      assignedToUserId: 'user-4',
      priority: 'high',
      status: 'in_progress',
      scheduledAt: '2026-01-14T09:00:00Z',
      notes: 'Full perimeter system with cameras.',
      createdAt: '2026-01-07T10:00:00Z',
    },
    {
      id: 'task-10',
      title: 'Plumbing system inspection',
      customerId: 'cust-5',
      assignedToUserId: 'user-2',
      priority: 'med',
      status: 'new',
      scheduledAt: '2026-01-18T11:00:00Z',
      notes: 'Check all pipes and water pressure.',
      createdAt: '2026-01-11T13:00:00Z',
    },
    {
      id: 'task-11',
      title: 'Website performance optimization',
      customerId: 'cust-2',
      assignedToUserId: 'user-3',
      priority: 'low',
      status: 'canceled',
      scheduledAt: '2026-01-12T14:00:00Z',
      notes: 'Customer decided to postpone.',
      createdAt: '2026-01-06T11:00:00Z',
    },
    {
      id: 'task-12',
      title: 'Electrical panel upgrade',
      customerId: 'cust-6',
      assignedToUserId: 'user-4',
      priority: 'high',
      status: 'new',
      scheduledAt: '2026-01-19T08:00:00Z',
      notes: '200A to 400A upgrade. Full day job.',
      createdAt: '2026-01-11T16:00:00Z',
    },
  ],
  activityEvents: [
    {
      id: 'evt-1',
      type: 'task_created',
      message: 'Task "Install new HVAC system" created for Acme Corporation',
      createdAt: '2026-01-10T10:00:00Z',
    },
    {
      id: 'evt-2',
      type: 'customer_added',
      message: 'New customer "CloudFirst Solutions" added',
      createdAt: '2026-01-02T09:00:00Z',
    },
    {
      id: 'evt-3',
      type: 'task_completed',
      message: 'Task "Office lighting upgrade" marked as done',
      createdAt: '2026-01-10T16:00:00Z',
    },
    {
      id: 'evt-4',
      type: 'task_created',
      message: 'Task "Network infrastructure audit" created for TechStart Inc',
      createdAt: '2026-01-08T14:00:00Z',
    },
    {
      id: 'evt-5',
      type: 'task_status_changed',
      message: 'Task "Security system installation" status changed to in_progress',
      createdAt: '2026-01-12T09:30:00Z',
    },
    {
      id: 'evt-6',
      type: 'task_created',
      message: 'Task "Refrigeration system repair" created for FreshMarket Foods',
      createdAt: '2026-01-12T16:00:00Z',
    },
    {
      id: 'evt-7',
      type: 'task_completed',
      message: 'Task "Quarterly equipment check" marked as done',
      createdAt: '2026-01-09T17:00:00Z',
    },
    {
      id: 'evt-8',
      type: 'customer_status_changed',
      message: 'Customer "Legacy Systems Ltd" marked as inactive',
      createdAt: '2026-01-05T11:00:00Z',
    },
    {
      id: 'evt-9',
      type: 'task_created',
      message: 'Task "Foundation inspection" created for BuildRight Construction',
      createdAt: '2026-01-11T11:00:00Z',
    },
    {
      id: 'evt-10',
      type: 'task_canceled',
      message: 'Task "Website performance optimization" canceled',
      createdAt: '2026-01-11T10:00:00Z',
    },
    {
      id: 'evt-11',
      type: 'task_created',
      message: 'Task "Electrical panel upgrade" created for Urban Design Studio',
      createdAt: '2026-01-11T16:00:00Z',
    },
    {
      id: 'evt-12',
      type: 'task_created',
      message: 'Task "Cloud migration consultation" created for CloudFirst Solutions',
      createdAt: '2026-01-11T15:00:00Z',
    },
    {
      id: 'evt-13',
      type: 'task_status_changed',
      message: 'Task "Solar panel maintenance" status changed to in_progress',
      createdAt: '2026-01-12T08:15:00Z',
    },
    {
      id: 'evt-14',
      type: 'team_member_updated',
      message: 'Team member "Lisa Anderson" status changed to inactive',
      createdAt: '2026-01-08T09:00:00Z',
    },
    {
      id: 'evt-15',
      type: 'task_created',
      message: 'Task "Plumbing system inspection" created for FreshMarket Foods',
      createdAt: '2026-01-11T13:00:00Z',
    },
  ],
  settings: {
    businessName: 'OpsPro Services',
    serviceArea: 'Greater Metro Area',
    contactEmail: 'contact@opspro.com',
    contactPhone: '555-OPS-PRO1',
    timezone: 'America/New_York',
  },
};

// Client-safe load function
export function loadState(): AppState {
  if (typeof window === 'undefined') {
    return seedState;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading state:', error);
  }

  return seedState;
}

// Save state to localStorage
export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
  }
}

// Reset to seed data
export function resetState(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting state:', error);
  }
}

// Helper to add activity event
function logActivity(state: AppState, type: string, message: string): void {
  const event: ActivityEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    message,
    createdAt: new Date().toISOString(),
  };
  state.activityEvents = [event, ...state.activityEvents];
}

// Task CRUD
export function addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
  const state = loadState();
  const newTask: Task = {
    ...task,
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  state.tasks = [newTask, ...state.tasks];

  const customer = state.customers.find(c => c.id === task.customerId);
  logActivity(state, 'task_created', `Task "${task.title}" created${customer ? ` for ${customer.name}` : ''}`);

  saveState(state);
}

export function updateTaskStatus(taskId: string, status: Task['status']): void {
  const state = loadState();
  const taskIndex = state.tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
    state.tasks[taskIndex].status = status;
    const task = state.tasks[taskIndex];

    if (status === 'done') {
      logActivity(state, 'task_completed', `Task "${task.title}" marked as done`);
    } else if (status === 'canceled') {
      logActivity(state, 'task_canceled', `Task "${task.title}" canceled`);
    } else {
      logActivity(state, 'task_status_changed', `Task "${task.title}" status changed to ${status}`);
    }

    saveState(state);
  }
}

export function updateTask(taskId: string, updates: Partial<Task>): void {
  const state = loadState();
  const taskIndex = state.tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
    state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
    logActivity(state, 'task_updated', `Task "${state.tasks[taskIndex].title}" updated`);
    saveState(state);
  }
}

// Customer CRUD
export function addCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): void {
  const state = loadState();
  const newCustomer: Customer = {
    ...customer,
    id: `cust-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  state.customers = [newCustomer, ...state.customers];
  logActivity(state, 'customer_added', `New customer "${customer.name}" added`);
  saveState(state);
}

export function updateCustomerStatus(customerId: string, status: Customer['status']): void {
  const state = loadState();
  const customerIndex = state.customers.findIndex(c => c.id === customerId);

  if (customerIndex !== -1) {
    state.customers[customerIndex].status = status;
    const customer = state.customers[customerIndex];
    logActivity(state, 'customer_status_changed', `Customer "${customer.name}" marked as ${status}`);
    saveState(state);
  }
}

export function updateCustomer(customerId: string, updates: Partial<Customer>): void {
  const state = loadState();
  const customerIndex = state.customers.findIndex(c => c.id === customerId);

  if (customerIndex !== -1) {
    state.customers[customerIndex] = { ...state.customers[customerIndex], ...updates };
    logActivity(state, 'customer_updated', `Customer "${state.customers[customerIndex].name}" updated`);
    saveState(state);
  }
}

// Team CRUD
export function addTeamMember(member: Omit<TeamMember, 'id'>): void {
  const state = loadState();
  const newMember: TeamMember = {
    ...member,
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  state.teamMembers = [newMember, ...state.teamMembers];
  logActivity(state, 'team_member_added', `New team member "${member.name}" added`);
  saveState(state);
}

export function updateTeamMemberStatus(memberId: string, status: TeamMember['status']): void {
  const state = loadState();
  const memberIndex = state.teamMembers.findIndex(m => m.id === memberId);

  if (memberIndex !== -1) {
    state.teamMembers[memberIndex].status = status;
    const member = state.teamMembers[memberIndex];
    logActivity(state, 'team_member_updated', `Team member "${member.name}" status changed to ${status}`);
    saveState(state);
  }
}

export function updateTeamMember(memberId: string, updates: Partial<TeamMember>): void {
  const state = loadState();
  const memberIndex = state.teamMembers.findIndex(m => m.id === memberId);

  if (memberIndex !== -1) {
    state.teamMembers[memberIndex] = { ...state.teamMembers[memberIndex], ...updates };
    logActivity(state, 'team_member_updated', `Team member "${state.teamMembers[memberIndex].name}" updated`);
    saveState(state);
  }
}

// Settings
export function updateSettings(updates: Partial<Settings>): void {
  const state = loadState();
  state.settings = { ...state.settings, ...updates };
  logActivity(state, 'settings_updated', 'Settings updated');
  saveState(state);
}
