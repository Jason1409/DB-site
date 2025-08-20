
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/contact");
      setContacts(res.data.contacts || []);
    } catch (err) {
      toast.error("Failed to load contacts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📇 Contact Submissions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <p>No contact submissions found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-lg p-4 border hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-2">{c.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {c.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {c.phone || "—"}
              </p>
              <p className="text-sm text-gray-800 mb-2">
                <strong>Message:</strong> {c.message}
              </p>
              <p className="text-xs text-gray-500">
                Submitted:{" "}
                {new Date(c.created_at || c._id?.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsList;
