import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { fetchTags, deleteTag } from "../../services/tagService";
import { TagDialog } from "./TagDialog";
import { useToast } from "../../hooks/useToast";
import { fetchCustomers } from "../../services/customerService";
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface Tag {
  id: number;
  name: string;
  color: string;
}
interface CustomerResponse {
  id: string;
  fullName: string;
  // customerTypes: { id: string; name: string }[];
  tagNames: { id: number; name: string; color: string }[]; // ✅ thêm dòng này
}

export const TagList: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<number | undefined>();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const { showToast } = useToast();

  const loadTags = async () => {
    try {
      setLoading(true);
      const data = await fetchTags();
      setTags(data);
    } catch (err) {
      console.error("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await fetchCustomers();
      setCustomers(res.data);
    } catch (err) {
      showToast("Failed to load customers", "error");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

 const handleDelete = async () => {
  if (!confirmDeleteId) return;
  try {
    await deleteTag(confirmDeleteId);
    await loadTags();
    setConfirmOpen(false); // ✅ đóng dialog trước khi mất dữ liệu
    setConfirmDeleteId(null); // reset ID
    showToast("Đã xóa tag thành công", "success");
  } catch (err) {
    alert("Xoá tag thất bại!");
  }
};


  const getCustomerCountUsingTag = (tagId: number): number => {
    return customers.filter((customer) =>
      customer.tagNames?.some((tag) => tag.id === tagId)
    ).length;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách Tag</h2>
        <button
          onClick={() => {
            setDialogOpen(true);
            setSelectedTagId(undefined);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus className="inline-block mr-2" /> Thêm Tag
        </button>
      </div>

      {loading ? (
        <p>Đang tải danh sách tag...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <span>{tag.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  title="Edit Tag"
                  onClick={() => {
                    setSelectedTagId(tag.id);
                    setDialogOpen(true);
                  }}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  title="Delete Tag"
                  onClick={() => {
                    setConfirmDeleteId(tag.id);
                    setConfirmOpen(true);
                  }}
                  
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog Thêm/Sửa Tag */}
      <TagDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedTagId(undefined);
        }}
        tagId={selectedTagId}
        onSuccess={loadTags}
      />

      {/* Xác nhận xoá đơn giản */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmDeleteId(null);
        }}
        onConfirm={handleDelete}
        title="Xóa Tag"
        content={
          confirmDeleteId ? (
            <>
              <p>
                Bạn có chắc muốn xóa tag{" "}
                <strong>
                  {tags.find((t) => t.id === confirmDeleteId)?.name || ""}
                </strong>{" "}
                không?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Có <strong>{getCustomerCountUsingTag(confirmDeleteId)}</strong>{" "}
                khách hàng đang sử dụng tag này. Sau khi xóa, họ sẽ được gán tag{" "}
                <strong>"Không xác định"</strong>.
              </p>
            </>
          ) : (
            "Bạn có chắc muốn xóa tag này không?"
          )
        }
        confirmText="Xóa"
        cancelText="Huỷ"
      />
    </div>
  );
};
