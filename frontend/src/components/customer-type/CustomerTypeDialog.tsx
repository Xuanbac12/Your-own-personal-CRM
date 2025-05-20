import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

const validationSchema = Yup.object({
  name: Yup.string().required("Tên không được để trống"),
  description: Yup.string().max(200, "Mô tả không được quá 200 ký tự"),
});

export const CustomerTypeDialog: React.FC<CustomerTypeDialogProps> = ({
  open,
  onClose,
  customerId,
  onSuccess,
}) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCustomerType = async () => {
      if (customerId) {
        try {
          setLoading(true);
          const data = await getCustomerTypeById(customerId);
          setInitialValues({
            name: data.name,
            description: data.description || "",
            color: data.color || "#3B82F6",
          });
        } catch (err) {
          console.error("Lỗi khi tải loại khách hàng");
        } finally {
          setLoading(false);
        }
      } else {
        setInitialValues({
          name: "",
          description: "",
          color: "#3B82F6",
        });
      }
    };

    if (open) loadCustomerType();
  }, [open, customerId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {customerId ? "Cập nhật loại khách hàng" : "Thêm loại khách hàng"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
            title="Đóng"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              if (customerId) {
                await updateCustomerType(customerId, values);
              } else {
                await createCustomerType(values);
              }
              onSuccess();
              onClose();
            } catch (err) {
              console.error("Lỗi khi lưu loại khách hàng");
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên loại <span className="text-red-500">*</span>
                </label>
                <Field
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên loại khách hàng"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mô tả"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Màu sắc</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <HexColorPicker
                      color={values.color}
                      onChange={(newColor) => setFieldValue("color", newColor)}
                    />
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg shadow-inner border"
                    style={{ backgroundColor: values.color }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : customerId ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
