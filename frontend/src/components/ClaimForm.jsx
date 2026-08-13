import { useState } from "react";
import toast from "react-hot-toast";
import { submitClaim } from "../services/claimService";

export default function ClaimForm({ itemId, onSubmitted }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [proofText, setProofText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (message.trim().length < 10) {
      toast.error("Please write at least 10 characters describing why this is yours");
      return;
    }
    setSubmitting(true);
    try {
      await submitClaim(itemId, { message, proof_text: proofText || null });
      toast.success("Claim submitted. The reporter will review it.");
      setOpen(false);
      setMessage("");
      setProofText("");
      onSubmitted?.();
    } catch (err) {
      const detail = err.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Failed to submit claim");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-primary-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-primary-700"
      >
        This is Mine — Submit a Claim
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-50 border border-primary-100 rounded-lg p-4 space-y-3"
    >
      <h3 className="font-semibold text-gray-800">Submit a Claim</h3>

      <textarea
        rows={3}
        placeholder="Explain why this item belongs to you..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      <textarea
        rows={2}
        placeholder="Optional: proof details (e.g. distinguishing marks, serial number)"
        value={proofText}
        onChange={(e) => setProofText(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      <div className="flex gap-2">
        <button
          type="submit" disabled={submitting}
          className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Claim"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
