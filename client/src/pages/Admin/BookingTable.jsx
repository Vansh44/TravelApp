import "./Admin.css";

const BookingTable = ({ bookings }) => {
  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString();
  };

  return (
    <div className="table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User</th>
            <th>Trip Route</th>
            <th>Date</th>
            <th>Seats</th>
            <th>Status</th>
            <th>QR Verified</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={7} className="empty-row">
                No bookings yet.
              </td>
            </tr>
          ) : (
            bookings.map((b, index) => {
              const isVerified = b.qrVerified ?? b.isQRVerified ?? false;

              return (
                <tr key={b._id || index}>
                  <td>{b.bookingId || `B${String(index + 1).padStart(3, "0")}`}</td>
                  <td>{b.userName}</td>
                  <td>{b.route}</td>
                  <td>{formatDate(b.date)}</td>
                  <td>{Array.isArray(b.seats) ? b.seats.join(", ") : b.seats || "-"}</td>
                  <td>
                    <span className={`status-pill ${String(b.status || "").toLowerCase()}`}>
                      {b.status || "-"}
                    </span>
                  </td>
                  <td>
                    <span className={`qr-dot ${isVerified ? "qr-yes" : "qr-no"}`} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
