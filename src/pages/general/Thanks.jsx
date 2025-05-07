import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";
import { createOrderGate } from "../../routes/APIGates";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const Thanks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const { cartItems, calculateTotalPrice, setCartItems } = useCart();
  const hasOrderedRef = useRef(false);

  useEffect(() => {
    if (hasOrderedRef.current) return;
    hasOrderedRef.current = true;

    const query = new URLSearchParams(window.location.search);
    const method = query.get("method");

    if (!cartItems || cartItems.length === 0) {
      setStatus("error");
      setMessage("Giỏ hàng trống. Không thể tạo đơn hàng.");
      return;
    }

    const baseOrderPayload = {
      cartItems: cartItems.map(item => ({
        slug: item.slug,
        quantity: item.quantity,
      })),
      totalAmount: calculateTotalPrice(),
    };

    // COD Payment
    if (method === "cod") {
      const orderPayload = {
        ...baseOrderPayload,
        userId: user?._id,
        paymentMethod: "cod",
      };

      api
        .post(createOrderGate, orderPayload)
        .then(() => {
          setStatus("success");
          setMessage("Đơn hàng của bạn đã được ghi nhận. Vui lòng thanh toán khi nhận hàng.");
          setCartItems([]);
        })
        .catch((err) => {
          console.error("Order creation failed", err);
          setStatus("error");
          setMessage("Lỗi khi tạo đơn hàng. Vui lòng thử lại sau.");
        });

      return;
    }

    // MoMo Payment
    const resultCode = query.get("resultCode");
    // const resultCode = "0"; //test
    const momoMessage = query.get("message") || "";
    const extraDataEncoded = query.get("extraData");
    const totalAmount = Number(query.get("amount"));

    if (resultCode === "0") {
      let userId = user?._id;

      if (extraDataEncoded) {
        try {
          const extraDataDecoded = JSON.parse(atob(extraDataEncoded));
          userId = extraDataDecoded.userId || userId;
        } catch (e) {
          console.error("Failed to decode extraData:", e);
        }
      }

      const orderPayload = {
        ...baseOrderPayload,
        userId,
        totalAmount: totalAmount || baseOrderPayload.totalAmount,
        paymentMethod: "momo",
      };

      api
        .post(createOrderGate, orderPayload)
        .then(() => {
          setStatus("success");
          setMessage("Thanh toán qua Momo thành công! Cảm ơn bạn đã đặt hàng.");
          setCartItems([]);
        })
        .catch((err) => {
          console.error("Order creation failed", err);
          setStatus("error");
          setMessage("Đã thanh toán nhưng có lỗi khi tạo đơn hàng. Vui lòng liên hệ hỗ trợ.");
        });
    } else {
      setStatus("failed");
      toast.error(decodeURIComponent(momoMessage));
    }
  }, []); // Run only once

  return (
    <div className="max-w-lg mx-auto p-8 mt-20 bg-white rounded-lg shadow text-center text-green-950">
      <h2 className="text-2xl font-bold mb-4">Kết Quả Đặt Hàng</h2>

      {status === "loading" && <p>Đang xử lý đơn hàng...</p>}

      {status === "success" && (
        <>
          <p className="text-green-600 font-semibold mb-4">{message}</p>
          <button
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
            onClick={() => navigate("/")}
          >
            Về trang chủ
          </button>
        </>
      )}

      {status === "failed" && (
        <>
          <p className="text-red-600 font-semibold mb-4">Thanh toán thất bại</p>
          <p>{message}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-700 text-white rounded"
            onClick={() => navigate("/checkout")}
          >
            Thử lại
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <p className="text-red-600 font-semibold mb-4">Đã xảy ra lỗi</p>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default Thanks;