import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import { CustomerTypeDialog } from "./CustomerTypeDialog";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import {
  fetchCustomerTypes,
  deleteCustomerType,
} from "../../services/customerTypeService";
import { useToast } from "../../hooks/useToast";
import { fetchCustomers } from "../../services/customerService";

interface CustomerType {
  id: string;
  name: string;
  color: string;
  description: string;
}

interface CustomerResponse {
  id: string;
  fullName: string;
  customerTypes: { id: string; name: string }[];
}

export const CustomerTypeList: React.FC = () => {
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | undefined>();
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);

  const loadCustomerTypes = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomerTypes();
      setCustomerTypes(data);
      setError("");
    } catch (err) {
      setError("Failed to load customer types");
      showToast("Failed to load customer types", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomerTypes();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await fetchCustomers(); // vẫn giữ nguyên
      setCustomers(response.data);
    } catch (err) {
      showToast("Failed to load customers", "error");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleProtectedDelete = () => {
    showToast(
      "Không thể xóa loại mặc định 'Chưa phân loại'. Đây là loại dự phòng để chuyển khách hàng khi loại khác bị xóa.",
      "error"
    );
  };

  const getCustomerCountUsingType = (typeId: string): number => {
    return customers.filter((customer) =>
      customer.customerTypes.some((type) => type.id === typeId)
    ).length;
  };

  const getCustomerTypeNameById = (typeId: string | undefined): string => {
    return customerTypes.find((t) => t.id === typeId)?.name || "";
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteCustomerType(deleteId);
      await loadCustomerTypes();
      showToast("Customer type deleted successfully", "success");
    } catch (err) {
      showToast("Failed to delete customer type", "error");
    } finally {
      setConfirmOpen(false);
      setDeleteId(undefined);
    }
  };

  const filteredTypes = customerTypes.filter((type) =>
    (type.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customer types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => {
            setSelectedId(undefined);
            setDialogOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Type
        </button>
      </div>

      {filteredTypes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm
            ? "No matching customer types found."
            : "No customer types found. Add your first one!"}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {type.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {type.description || (
                      <span className="italic text-gray-400">
                        No description
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(type.id)}
                        className="text-gray-600 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        title="Edit customer type"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>

                      {type.name === "Chưa phân loại" ? (
                        <button
                          onClick={handleProtectedDelete}
                          className="text-gray-400 cursor-not-allowed p-1 rounded-full"
                          title="Không thể xóa loại mặc định"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(type.id)}
                          className="text-gray-600 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete customer type"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CustomerTypeDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedId(undefined);
        }}
        customerId={selectedId}
        onSuccess={() => {
          loadCustomerTypes();
          showToast(
            selectedId
              ? "Customer type updated successfully"
              : "Customer type created successfully",
            "success"
          );
        }}
      />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setDeleteId(undefined);
        }}
        onConfirm={confirmDelete}
        title="Delete Customer Type"
        content={
          deleteId ? (
            <>
              <p>
                Bạn có chắc muốn xóa loại khách hàng{" "}
                <strong>{getCustomerTypeNameById(deleteId)}</strong> không?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Có <strong>{getCustomerCountUsingType(deleteId)}</strong> khách
                hàng đang sử dụng loại này. Sau khi xóa, họ sẽ được chuyển sang{" "}
                <strong>"Chưa phân loại"</strong>.
              </p>
            </>
          ) : (
            "Are you sure you want to delete this customer type? This action cannot be undone."
          )
        }
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
