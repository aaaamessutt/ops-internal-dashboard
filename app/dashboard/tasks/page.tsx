'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { loadState, addTask, updateTaskStatus, updateTask } from '@/lib/data/store';
import { AppState, Task } from '@/lib/types';

export default function TasksPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    customerId: '',
    assignedToUserId: '',
    priority: 'med' as Task['priority'],
    status: 'new' as Task['status'],
    scheduledAt: '',
    notes: '',
  });

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (state) {
      applyFilters();
    }
  }, [state, searchQuery, statusFilter, priorityFilter]);

  const refreshData = () => {
    setState(loadState());
  };

  const applyFilters = () => {
    if (!state) return;

    let filtered = [...state.tasks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => {
        const customer = state.customers.find(c => c.id === task.customerId);
        return (
          task.title.toLowerCase().includes(query) ||
          customer?.name.toLowerCase().includes(query)
        );
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleAddTask = () => {
    if (!formData.title || !formData.customerId || !formData.assignedToUserId || !formData.scheduledAt) {
      alert('Please fill in all required fields');
      return;
    }

    addTask(formData);
    refreshData();
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleUpdateStatus = (taskId: string, newStatus: Task['status']) => {
    updateTaskStatus(taskId, newStatus);
    refreshData();
  };

  const handleEditTask = () => {
    if (!selectedTask) return;

    updateTask(selectedTask.id, formData);
    refreshData();
    setIsEditModalOpen(false);
    setSelectedTask(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      customerId: '',
      assignedToUserId: '',
      priority: 'med',
      status: 'new',
      scheduledAt: '',
      notes: '',
    });
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      customerId: task.customerId,
      assignedToUserId: task.assignedToUserId,
      priority: task.priority,
      status: task.status,
      scheduledAt: task.scheduledAt.slice(0, 16),
      notes: task.notes,
    });
    setIsEditModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getCustomerName = (customerId: string) => {
    return state?.customers.find(c => c.id === customerId)?.name || 'Unknown';
  };

  const getTeamMemberName = (userId: string) => {
    return state?.teamMembers.find(m => m.id === userId)?.name || 'Unknown';
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const variants: Record<string, 'danger' | 'warning' | 'default'> = {
      high: 'danger',
      med: 'warning',
      low: 'default',
    };
    return <Badge variant={variants[priority]}>{priority.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: Task['status']) => {
    const variants: Record<string, 'info' | 'warning' | 'success' | 'default'> = {
      new: 'info',
      in_progress: 'warning',
      done: 'success',
      canceled: 'default',
    };
    const labels: Record<string, string> = {
      new: 'New',
      in_progress: 'In Progress',
      done: 'Done',
      canceled: 'Canceled',
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  if (!state) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage jobs and service tasks</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search tasks or customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'new', label: 'New' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'done', label: 'Done' },
                { value: 'canceled', label: 'Canceled' },
              ]}
            />
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Priorities' },
                { value: 'high', label: 'High' },
                { value: 'med', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Title</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Assigned To</TableHeader>
                <TableHeader>Priority</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Scheduled</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{getCustomerName(task.customerId)}</TableCell>
                  <TableCell>{getTeamMemberName(task.assignedToUserId)}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell className="text-xs">{formatDate(task.scheduledAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {task.status !== 'done' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUpdateStatus(task.id, 'done')}
                        >
                          ✓
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditModal(task)}
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredTasks.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No tasks found
            </div>
          )}
        </CardBody>
      </Card>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add New Task"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Task title"
          />
          <Select
            label="Customer *"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            options={[
              { value: '', label: 'Select customer' },
              ...state.customers.filter(c => c.status === 'active').map(c => ({ value: c.id, label: c.name })),
            ]}
          />
          <Select
            label="Assigned To *"
            value={formData.assignedToUserId}
            onChange={(e) => setFormData({ ...formData, assignedToUserId: e.target.value })}
            options={[
              { value: '', label: 'Select team member' },
              ...state.teamMembers.filter(m => m.status === 'active').map(m => ({ value: m.id, label: m.name })),
            ]}
          />
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'med', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
          <Input
            type="datetime-local"
            label="Scheduled At *"
            value={formData.scheduledAt}
            onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
          />
          <TextArea
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Additional notes..."
            rows={3}
          />
        </div>
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
          resetForm();
        }}
        title="Edit Task"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTask}>Save Changes</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            label="Customer"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            options={state.customers.filter(c => c.status === 'active').map(c => ({ value: c.id, label: c.name }))}
          />
          <Select
            label="Assigned To"
            value={formData.assignedToUserId}
            onChange={(e) => setFormData({ ...formData, assignedToUserId: e.target.value })}
            options={state.teamMembers.filter(m => m.status === 'active').map(m => ({ value: m.id, label: m.name }))}
          />
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'med', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
            options={[
              { value: 'new', label: 'New' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'done', label: 'Done' },
              { value: 'canceled', label: 'Canceled' },
            ]}
          />
          <Input
            type="datetime-local"
            label="Scheduled At"
            value={formData.scheduledAt}
            onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
          />
          <TextArea
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
          />
        </div>
      </Modal>
    </div>
  );
}
