'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { loadState, addTeamMember, updateTeamMemberStatus, updateTeamMember } from '@/lib/data/store';
import { AppState, TeamMember } from '@/lib/types';

export default function TeamPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: 'ops' as TeamMember['role'],
    email: '',
    status: 'active' as TeamMember['status'],
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setState(loadState());
  };

  const handleAddMember = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in name and email');
      return;
    }

    addTeamMember(formData);
    refreshData();
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleUpdateMember = () => {
    if (!selectedMember) return;

    updateTeamMember(selectedMember.id, formData);
    refreshData();
    setIsEditModalOpen(false);
    setSelectedMember(null);
    resetForm();
  };

  const handleToggleStatus = (memberId: string, currentStatus: TeamMember['status']) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateTeamMemberStatus(memberId, newStatus);
    refreshData();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: 'ops',
      email: '',
      status: 'active',
    });
  };

  const openEditModal = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
      status: member.status,
    });
    setIsEditModalOpen(true);
  };

  const getRoleBadge = (role: TeamMember['role']) => {
    const variants: Record<string, 'info' | 'warning' | 'default'> = {
      admin: 'info',
      ops: 'warning',
      field: 'default',
    };
    const labels: Record<string, string> = {
      admin: 'Admin',
      ops: 'Operations',
      field: 'Field Tech',
    };
    return <Badge variant={variants[role]}>{labels[role]}</Badge>;
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
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600 mt-1">Manage team members and roles</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          Add Team Member
        </Button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.teamMembers.map((member) => (
          <Card key={member.id}>
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{member.email}</p>
                </div>
                <Badge variant={member.status === 'active' ? 'success' : 'default'}>
                  {member.status}
                </Badge>
              </div>

              <div className="mb-4">
                {getRoleBadge(member.role)}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openEditModal(member)}
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleToggleStatus(member.id, member.status)}
                  className="flex-1"
                >
                  {member.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add Team Member"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>Add Member</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full name"
          />
          <Input
            type="email"
            label="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@example.com"
          />
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as TeamMember['role'] })}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'ops', label: 'Operations' },
              { value: 'field', label: 'Field Tech' },
            ]}
          />
        </div>
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
          resetForm();
        }}
        title="Edit Team Member"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMember}>Save Changes</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as TeamMember['role'] })}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'ops', label: 'Operations' },
              { value: 'field', label: 'Field Tech' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
