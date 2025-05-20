import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Tên nhãn là bắt buộc")
    .max(50, "Tên nhãn không vượt quá 50 ký tự"),
  
});

export const TagDialog: React.FC<TagDialogProps> = ({
  open,
  onClose,
  tagId,
  onSuccess,
}) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    color: "#3B82F6",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTag = async () => {
      if (tagId) {
        try {
          setLoading(true);
          const data = await getTagById(tagId);
          setInitialValues({
            name: data.name,
            color: data.color || "#3B82F6",
          });
        } catch (err) {
          console.error("Lỗi khi tải tag");
        } finally {
          setLoading(false);
        }
      } else {
        setInitialValues({
          name: "",
          color: "#3B82F6",
        });
      }
    };

    if (open) loadTag();
  }, [open, tagId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {tagId ? "Cập nhật nhãn" : "Thêm nhãn"}
          </h2>
          <button onClick={onClose} title="Close dialog">
            <X className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              if (tagId) {
                await updateTag(tagId, values);
              } else {
                await createTag(values);
              }
              onSuccess();
              onClose();
            } catch (err) {
              console.error("Lỗi khi lưu nhãn");
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên nhãn <span className="text-red-500">*</span>
                </label>
                <Field
                  name="name"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Tên nhãn"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Màu sắc
                </label>
                <div className="flex items-center gap-4">
                  <HexColorPicker
                    color={values.color}
                    onChange={(color) => setFieldValue("color", color)}
                  />
                  <div
                    className="w-10 h-10 rounded border shadow-inner"
                    style={{ backgroundColor: values.color }}
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
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : tagId ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
