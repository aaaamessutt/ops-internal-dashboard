'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { loadState } from '@/lib/data/store';
import { AppState, Task } from '@/lib/types';

export default function DashboardOverview() {
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

  // Calculate KPIs
  const openTasks = state.tasks.filter(t => t.status === 'new' || t.status === 'in_progress').length;

  const now = new Date();
  const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const tasksDueNext7Days = state.tasks.filter(t => {
    const scheduled = new Date(t.scheduledAt);
    return scheduled >= now && scheduled <= next7Days && (t.status === 'new' || t.status === 'in_progress');
  }).length;

  const activeCustomers = state.customers.filter(c => c.status === 'active').length;
  const activeTeam = state.teamMembers.filter(m => m.status === 'active').length;

  // Recent activity (latest 8)
  const recentActivity = state.activityEvents.slice(0, 8);

  // Upcoming tasks (next 5 by scheduled date)
  const upcomingTasks = state.tasks
    .filter(t => t.status === 'new' || t.status === 'in_progress')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getCustomerName = (customerId: string) => {
    return state.customers.find(c => c.id === customerId)?.name || 'Unknown';
  };

  const getTeamMemberName = (userId: string) => {
    return state.teamMembers.find(m => m.id === userId)?.name || 'Unknown';
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const variants: Record<string, 'danger' | 'warning' | 'default'> = {
      high: 'danger',
      med: 'warning',
      low: 'default',
    };
    return <Badge variant={variants[priority]}>{priority.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here is what is happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{openTasks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                ✓
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Next 7 Days</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{tasksDueNext7Days}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">
                ⏰
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeTeam}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                👤
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
              <Link href="/dashboard/tasks" className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            {upcomingTasks.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      {getPriorityBadge(task.priority)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {getCustomerName(task.customerId)} • {getTeamMemberName(task.assignedToUserId)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Scheduled: {formatDate(task.scheduledAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No upcoming tasks
              </div>
            )}
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </CardHeader>
          <CardBody className="p-0">
            {recentActivity.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {recentActivity.map((event) => (
                  <div key={event.id} className="p-4 hover:bg-gray-50">
                    <p className="text-sm text-gray-900">{event.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(event.createdAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No recent activity
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
