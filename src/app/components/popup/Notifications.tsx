import { useNotifications } from "@/context/NotificationContext";

export default function Notifications() {
    const { renewals, clearNotifications } = useNotifications();

    if (renewals.length === 0) return null; // 알림이 없으면 렌더링 안함

    return (
        <div className="fixed top-4 right-4 w-[300px] bg-white shadow-lg rounded-md p-4 z-50">
            <h3 className="mb-2 text-lg font-medium">📢 증권 갱신 알림</h3>
            <ul>
                {renewals.map((item, index) => (
                    <li key={item.irpk} className="mt-1 text-sm">
                        <strong>{item.productName}</strong>: 남은 기간 <b>{item.daysRemaining}</b>일
                    </li>
                ))}
            </ul>
            <button
                className="mt-3 text-blue-500 hover:underline"
                onClick={clearNotifications}
            >
                알림 닫기
            </button>
        </div>
    );
}
