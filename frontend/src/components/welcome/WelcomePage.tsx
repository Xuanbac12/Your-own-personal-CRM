import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, Tags, BookOpen, ArrowRight, Users, Coffee, Star } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleStart = () => navigate('/customers');

  const features = [
    {
      icon: Heart,
      title: 'Tất cả mối quan hệ, một nơi duy nhất',
      description: 'Quản lý mọi mối quan hệ quan trọng - từ khách hàng, đối tác đến bạn bè và gia đình',
    },
    {
      icon: Calendar,
      title: 'Không bỏ lỡ khoảnh khắc quan trọng',
      description: 'Tự động nhắc nhở sinh nhật, kỷ niệm và các dịp đặc biệt của những người quan trọng',
    },
    {
      icon: Tags,
      title: 'Phân loại có ý nghĩa',
      description: 'Tổ chức linh hoạt với các nhãn như "Gia đình", "Bạn thân", "VIP" - theo cách riêng của bạn',
    },
    {
      icon: BookOpen,
      title: 'Lưu giữ câu chuyện',
      description: 'Ghi lại những kỷ niệm, sở thích và chi tiết quan trọng về mỗi người',
    },
  ];

  const testimonials = [
    {
      content: "Nhờ hệ thống này, tôi không bao giờ quên gọi điện chúc mừng sinh nhật mẹ nữa.",
      author: "Minh Anh",
      role: "Giám đốc kinh doanh",
    },
    {
      content: "Giúp tôi duy trì liên lạc với khách hàng một cách tự nhiên và chân thành hơn.",
      author: "Thanh Hà",
      role: "Chủ doanh nghiệp",
    },
    {
      content: "Đây không chỉ là CRM, mà là người bạn đồng hành trong việc xây dựng các mối quan hệ.",
      author: "Đức Thành",
      role: "Quản lý nhân sự",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              <span className="block">Mối quan hệ không chỉ là</span>
              <span className="block text-blue-600 mt-2">danh bạ đơn thuần</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-500">
              Dù là khách hàng, đồng nghiệp, bạn bè hay gia đình — chúng tôi giúp bạn gắn kết, ghi nhớ và vun đắp những điều quan trọng nhất.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={handleStart}
                className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                Bắt đầu xây dựng
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-3 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xl text-gray-600 italic">
            "Trong guồng quay của cuộc sống, chúng ta dễ quên mất những cuộc hẹn, bỏ lỡ những sinh nhật, hay để mối quan hệ phai nhạt dần..."
          </p>
          <p className="mt-4 text-lg text-blue-600 font-medium">
            Hãy để chúng tôi giúp bạn kết nối lại và vun đắp những điều quý giá nhất.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Xây dựng mối quan hệ bền vững</h2>
            <p className="mt-4 text-xl text-gray-600">
              Công cụ thông minh giúp bạn chăm sóc từng mối quan hệ một cách chu đáo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                </div>
                <p className="text-gray-700 italic mb-4">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            "Mối quan hệ là sợi chỉ đan kết thế giới của bạn. Hãy chăm sóc chúng thật chu đáo."
          </h2>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors flex items-center mx-auto"
          >
            <Coffee className="mr-2 h-5 w-5" />
            Bắt đầu hành trình kết nối
          </button>
        </div>
      </div>
    </div>
  );
};
