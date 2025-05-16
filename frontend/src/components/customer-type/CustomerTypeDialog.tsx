import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import {
  createCustomerType,
  updateCustomerType,
  getCustomerTypeById,
} from "../../services/customerTypeService";

interface CustomerTypeDialogProps {
  open: boolean;
  onClose: () => void;
  customerId?: string;
  onSuccess: () => void;
}

export const CustomerTypeDialog: React.FC<CustomerTypeDialogProps> = ({
  open,
  onClose,
  customerId,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCustomerType = async () => {
      if (customerId) {
        try {
          setLoading(true);
          const data = await getCustomerTypeById(customerId);
          setName(data.name);
          setColor(data.color);
          setDescription(data.description || ""); // nếu description null thì dùng chuỗi rỗng
        } catch (err) {
          setError("Failed to load customer type");
        } finally {
          setLoading(false);
        }
      }
    };

    if (open && customerId) {
      loadCustomerType();
    } else {
      setName("");
      setColor("#3B82F6");
      setError("");
    }
  }, [open, customerId]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name.trim()) {
    setError("Name is required");
    return;
  }

  try {
    setLoading(true);
    const payload = {
      name: name.trim(),
      color,
      description: description.trim() || "", // ✅ giữ nguyên hoặc set null nếu rỗng
    };

    if (customerId) {
      await updateCustomerType(customerId, payload);
    } else {
      await createCustomerType(payload);
    }

    onSuccess();
    onClose();
  } catch (err) {
    setError("Failed to save customer type");
  } finally {
    setLoading(false);
  }
};


  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {customerId ? "Edit Customer Type" : "Add Customer Type"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
            title="Close dialog"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter customer type name"
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <HexColorPicker color={color} onChange={setColor} />
                </div>
                <div
                  className="w-12 h-12 rounded-lg shadow-inner"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : customerId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
