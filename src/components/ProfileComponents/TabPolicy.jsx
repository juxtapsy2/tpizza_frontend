import React from "react";
import { Info, ShieldOff, Phone, Clock } from "lucide-react";

export const TabPolicy = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Sales Information */}
      <div className="p-5 border rounded-xl bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Info className="text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Chính sách hoạt động</h2>
        </div>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Chúng tôi phục vụ pizza tươi, nóng và chất lượng hàng đầu.</li>
          <li>Thời gian giao hàng ước tính: 30 - 45 phút tuỳ vị trí.</li>
          <li>Vui lòng đảm bảo thông tin đặt hàng chính xác để tránh chậm trễ.</li>
          <li>Liên hệ bộ phận chăm sóc khách hàng nếu bạn gặp vấn đề với đơn hàng.</li>
        </ul>
      </div>

      {/* Cancellation Policy */}
      <div className="p-5 border rounded-xl bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <ShieldOff className="text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">Chính sách huỷ đơn</h2>
        </div>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Đơn hàng có thể huỷ trước khi nhân viên xác nhận chế biến.</li>
          <li>Nếu đơn đã bắt đầu được chuẩn bị, bạn không thể huỷ để đảm bảo chất lượng phục vụ.</li>
          <li>Huỷ đơn thành công sẽ được hoàn tiền trong vòng 3–5 ngày làm việc (nếu đã thanh toán trước).</li>
        </ul>
      </div>

      {/* Support */}
      <div className="p-5 border rounded-xl bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Phone className="text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">Hỗ trợ khách hàng</h2>
        </div>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Hotline: <strong className="text-green-700">1900 1234</strong> (8:00 - 22:00 mỗi ngày)</li>
          <li>Email: <strong>support@tpizza.vn</strong></li>
          <li>Fanpage: <strong>TPizza Việt Nam</strong></li>
        </ul>
      </div>

      {/* Note */}
      <div className="p-5 border-l-4 border-yellow-400 bg-yellow-50 rounded-md shadow-sm flex items-start gap-3">
        <Clock className="mt-1 text-yellow-500" />
        <p className="text-sm text-gray-800">
          Lưu ý: Chính sách có thể thay đổi tuỳ theo điều kiện và thời điểm khuyến mãi. Vui lòng theo dõi thông báo từ TPizza để cập nhật mới nhất.
        </p>
      </div>
    </div>
  );
};
