import React, { useEffect, useState } from "react";

export default function AttendanceMark() {
  const [message, setMessage] = useState("Marking attendance...");
const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const markAttendance = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const studentId = urlParams.get("id");

      if (!studentId) {
        setMessage("❌ Invalid QR link.");
        return;
      }

      try {
        const res = await fetch("${API_URL}/api/mark-attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId }),
        });
        const data = await res.json();

        if (res.ok) setMessage("✅ Attendance marked successfully!");
        else setMessage(`❌ ${data.message || "Failed to mark attendance"}`);
      } catch (err) {
        console.error(err);
        setMessage("❌ Error marking attendance.");
      }
    };

    markAttendance();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
}
