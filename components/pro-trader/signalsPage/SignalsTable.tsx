"use client";

import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditSignalModal from "./EditSignalModal";
import { SignalInterface } from "@/lib";
import { proTradersignalService } from "@/lib/api/pro-trader";

interface SignalsTableProps {
  signals: SignalInterface[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSignalDeleted: () => void;
}

export default function SignalsTable({
  signals,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onSignalDeleted,
}: SignalsTableProps) {
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [editingSignal, setEditingSignal] = useState<SignalInterface | null>(
    null,
  );

  const handleDelete = async (signalId: string) => {
    if (!confirm("Are you sure you want to delete this signal?")) return;

    setDeleteLoading(signalId);
    try {
      const response = await proTradersignalService.deleteSignal(signalId);
      if (response.success) {
        onSignalDeleted();
      } else {
        alert(response.message || "Failed to delete signal");
      }
    } catch (err) {
      console.error("Failed to delete signal:", err);
      alert(err instanceof Error ? err.message : "Failed to delete signal");
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusColor = (status: string, result?: string) => {
    if (result === "SUCCESS")
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (result === "BAD")
      return "text-rose-300 bg-rose-500/10 border-rose-500/20";
    if (result === "EVEN") return "text-slate-200 bg-slate-700 border-white/5";
    if (status === "active")
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    return "text-slate-400 bg-slate-700 border-white/5";
  };

  const getStatusText = (status: string, result?: string) => {
    if (result === "SUCCESS") return "SUCCESS";
    if (result === "BAD") return "FAILED";
    if (result === "EVEN") return "BREAK EVEN";
    if (status === "active") return "ACTIVE";
    return "EXPIRED";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading signals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-12 text-center">
          <p className="text-rose-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg text-sm hover:bg-secondary/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (signals.length === 0) {
    return (
      <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-12 text-center">
          <p className="text-on-surface-variant mb-4">No signals created yet</p>
          <p className="text-sm text-on-surface-variant/60">
            Click the &quot;Create new signal&quot; button to publish your first
            trading signal
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container-highest border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Pair
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Direction
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Entry
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  TP / SL
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {signals.map((signal) => (
                <tr
                  key={signal._id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-on-surface">
                      {signal.pair}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${
                        signal.direction === "buy"
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-rose-400 bg-rose-500/10"
                      }`}
                    >
                      {signal.direction}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-on-surface font-mono text-sm">
                      ${signal.entry?.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-xs">
                        <span className="text-on-surface-variant">TP: </span>
                        <span className="text-emerald-400 font-mono">
                          ${signal.tp?.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-on-surface-variant">SL: </span>
                        <span className="text-rose-400 font-mono">
                          ${signal.sl?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-on-surface-variant">
                      {formatDate(signal.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${getStatusColor(
                        signal.status,
                        signal.result,
                      )}`}
                    >
                      {getStatusText(signal.status, signal.result)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setEditingSignal(signal)}
                        disabled={signal.status === "expired"}
                        className={`p-2 rounded-lg transition-colors ${
                          signal.status === "expired"
                            ? "text-slate-600 cursor-not-allowed"
                            : "text-on-surface-variant hover:text-secondary hover:bg-secondary/10"
                        }`}
                        title={
                          signal.status === "expired"
                            ? "Cannot edit expired signal"
                            : "Edit signal"
                        }
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(signal._id)}
                        disabled={deleteLoading === signal._id}
                        className="p-2 rounded-lg text-on-surface-variant hover:text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                        title="Delete signal"
                      >
                        {deleteLoading === signal._id ? (
                          <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <MdDelete size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-white/5 flex justify-between items-center">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface-variant text-sm disabled:opacity-50 hover:bg-white/10 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-on-surface-variant">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface-variant text-sm disabled:opacity-50 hover:bg-white/10 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Edit Signal Modal */}
      <EditSignalModal
        isOpen={!!editingSignal}
        signal={editingSignal}
        onClose={() => setEditingSignal(null)}
        onSignalUpdated={onSignalDeleted}
      />
    </>
  );
}
