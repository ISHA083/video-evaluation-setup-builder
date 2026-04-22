import { X } from 'lucide-react';
import { useState } from 'react';

interface JobSummary {
  role: string;
  experienceRange: string;
  keySkills: string[];
}

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSummary: JobSummary;
  onSave: (summary: JobSummary) => void;
}

export function EditRoleModal({
  isOpen,
  onClose,
  currentSummary,
  onSave,
}: EditRoleModalProps) {
  const [role, setRole] = useState(currentSummary.role);
  const [experience, setExperience] = useState(currentSummary.experienceRange);
  const [keySkills, setKeySkills] = useState(currentSummary.keySkills);
  const [newSkill, setNewSkill] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...currentSummary,
      role,
      experienceRange: experience,
      keySkills,
    });
    onClose();
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !keySkills.includes(newSkill.trim())) {
      setKeySkills([...keySkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setKeySkills(keySkills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h3>Edit Role Details</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm">Role Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm outline-none focus:border-ring focus:bg-background"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Experience Range</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm outline-none focus:border-ring focus:bg-background"
            >
              <option value="0–3 years">0–3 years</option>
              <option value="3–6 years">3–6 years</option>
              <option value="6–10 years">6–10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm">Key Skills</label>
            <div className="mb-2 flex flex-wrap gap-2">
              {keySkills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="rounded-sm transition-colors hover:bg-secondary-foreground/10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill..."
                className="flex-1 rounded-lg border border-border bg-input-background px-3 py-2 text-sm outline-none focus:border-ring focus:bg-background"
              />
              <button
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
                className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
