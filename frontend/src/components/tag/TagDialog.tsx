import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import {
  createTag,
  updateTag,
  getTagById,
} from "../../services/tagService";

interface TagDialogProps {
  open: boolean;
  onClose: () => void;
  tagId?: number;
  onSuccess: () => void;
}

export const TagDialog: React.FC<TagDialogProps> = ({
  open,
  onClose,
  tagId,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTag = async () => {
      if (tagId) {
        try {
          setLoading(true);
          const data = await getTagById(tagId);
          setName(data.name);
          setColor(data.color);
        } catch (err) {
          setError("Failed to load tag");
        } finally {
          setLoading(false);
        }
      } else {
        setName("");
        setColor("#3B82F6");
        setError("");
      }
    };

    if (open) loadTag();
  }, [open, tagId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setLoading(true);
      const payload = { name: name.trim(), color };
      if (tagId) {
        await updateTag(tagId, payload);
      } else {
        await createTag(payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to save tag");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {tagId ? "Edit Tag" : "Add Tag"}
          </h2>
          <button onClick={onClose} title="Close dialog">
            <X className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Tag name"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex items-center gap-4">
              <HexColorPicker color={color} onChange={setColor} />
              <div
                className="w-10 h-10 rounded border shadow-inner"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : tagId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
