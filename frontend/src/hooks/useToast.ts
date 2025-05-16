export function useToast() {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // NOTE: Đây là cách đơn giản - có thể thay bằng react-toastify nếu cần
    const prefix = {
      success: '✅ Thành công:',
      error: '❌ Lỗi:',
      info: 'ℹ️',
    };

    alert(`${prefix[type]} ${message}`);
  };

  return { showToast };
}
