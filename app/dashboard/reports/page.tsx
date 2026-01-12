'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { loadState } from '@/lib/data/store';
import { AppState } from '@/lib/types';

export default function ReportsPage() {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Tasks by status
  const tasksByStatus = {
    new: state.tasks.filter(t => t.status === 'new').length,
    in_progress: state.tasks.filter(t => t.status === 'in_progress').length,
    done: state.tasks.filter(t => t.status === 'done').length,
    canceled: state.tasks.filter(t => t.status === 'canceled').length,
  };

  // Tasks by priority
  const tasksByPriority = {
    high: state.tasks.filter(t => t.priority === 'high').length,
    med: state.tasks.filter(t => t.priority === 'med').length,
    low: state.tasks.filter(t => t.priority === 'low').length,
  };

  // Customers by status
  const customersByStatus = {
    active: state.customers.filter(c => c.status === 'active').length,
    inactive: state.customers.filter(c => c.status === 'inactive').length,
  };

  // Team by role
  const teamByRole = {
    admin: state.teamMembers.filter(m => m.role === 'admin').length,
    ops: state.teamMembers.filter(m => m.role === 'ops').length,
    field: state.teamMembers.filter(m => m.role === 'field').length,
  };

  // Weekly workload (next 7 days)
  const now = new Date();
  const weeklyWorkload: { date: string; count: number }[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    const count = state.tasks.filter(task => {
      if (task.status === 'done' || task.status === 'canceled') return false;
      const taskDate = new Date(task.scheduledAt).toISOString().split('T')[0];
      return taskDate === dateStr;
    }).length;

    weeklyWorkload.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      count,
    });
  }

  // Task completion rate
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(t => t.status === 'done').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Analytics and insights for your operations</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{state.tasks.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{completionRate}%</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-600">Total Customers</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{state.customers.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-600">Team Size</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{state.teamMembers.length}</p>
          </CardBody>
        </Card>
      </div>

      {/* Detailed Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Status */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Tasks by Status</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="info">New</Badge>
                  <span className="text-sm text-gray-600">New tasks</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{tasksByStatus.new}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="warning">In Progress</Badge>
                  <span className="text-sm text-gray-600">Active tasks</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{tasksByStatus.in_progress}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="success">Done</Badge>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{tasksByStatus.done}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Canceled</Badge>
                  <span className="text-sm text-gray-600">Canceled</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{tasksByStatus.canceled}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Tasks by Priority */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Tasks by Priority</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="danger">High</Badge>
                  <span className="text-sm text-gray-600">High priority</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{tasksByPriority.high}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="warning">Medium</Badge>
                  <span className="text-sm text-gray-600">Medium priority</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{tasksByPriority.med}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Low</Badge>
                  <span className="text-sm text-gray-600">Low priority</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{tasksByPriority.low}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Customers by Status */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Customer Status</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="success">Active</Badge>
                  <span className="text-sm text-gray-600">Active customers</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{customersByStatus.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Inactive</Badge>
                  <span className="text-sm text-gray-600">Inactive customers</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{customersByStatus.inactive}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Team by Role */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Team by Role</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="info">Admin</Badge>
                  <span className="text-sm text-gray-600">Administrators</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{teamByRole.admin}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="warning">Operations</Badge>
                  <span className="text-sm text-gray-600">Ops staff</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{teamByRole.ops}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Field Tech</Badge>
                  <span className="text-sm text-gray-600">Field technicians</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{teamByRole.field}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Weekly Workload */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Weekly Workload (Next 7 Days)</h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Scheduled Tasks</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Workload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {weeklyWorkload.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{day.date}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{day.count}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min((day.count / 5) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {day.count === 0 ? 'Light' : day.count < 3 ? 'Moderate' : 'Heavy'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
