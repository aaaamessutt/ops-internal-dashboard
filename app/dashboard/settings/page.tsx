'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { loadState, updateSettings, resetState } from '@/lib/data/store';
import { Settings } from '@/lib/types';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    serviceArea: '',
    contactEmail: '',
    contactPhone: '',
    timezone: '',
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const state = loadState();
    setSettings(state.settings);
    setFormData(state.settings);
  };

  const handleSave = () => {
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    refreshData();
  };

  const handleReset = () => {
    resetState();
    setIsConfirmResetOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your business information and preferences</p>
      </div>

      {/* Business Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Business Name"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Your business name"
            />
            <Input
              label="Service Area"
              value={formData.serviceArea}
              onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
              placeholder="Geographic service area"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                label="Contact Email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="contact@example.com"
              />
              <Input
                label="Contact Phone"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="555-123-4567"
              />
            </div>
            <Input
              label="Timezone"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              placeholder="America/New_York"
            />

            <div className="flex items-center gap-3 pt-4">
              <Button onClick={handleSave}>
                Save Settings
              </Button>
              {isSaved && (
                <span className="text-sm text-green-600 font-medium">
                  Settings saved successfully!
                </span>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Demo Data Management */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Demo Data Management</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Reset all data to the original demo state. This will clear all changes you have made
              including tasks, customers, and team members.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-900">Warning</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    This action cannot be undone. All your changes will be permanently lost.
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="danger"
              onClick={() => setIsConfirmResetOpen(true)}
            >
              Reset Demo Data
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Application Information</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Version</span>
              <span className="font-medium text-gray-900">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Framework</span>
              <span className="font-medium text-gray-900">Next.js 16 (App Router)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Data Storage</span>
              <span className="font-medium text-gray-900">LocalStorage (Client-side)</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Environment</span>
              <span className="font-medium text-gray-900">Demo</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Confirm Reset Modal */}
      <Modal
        isOpen={isConfirmResetOpen}
        onClose={() => setIsConfirmResetOpen(false)}
        title="Confirm Reset"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsConfirmResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReset}>
              Yes, Reset All Data
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-900">
            Are you sure you want to reset all data to the original demo state?
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              This will permanently delete all tasks, customers, team members, and settings you have created or modified.
              The page will reload with fresh demo data.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
