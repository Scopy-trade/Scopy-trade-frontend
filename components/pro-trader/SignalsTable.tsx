// components/SignalsTable.tsx
"use client";

import {
  MdFilterList,
  MdChevronLeft,
  MdChevronRight,
  MdSearch,
  MdMoreVert,
  MdDelete,
  MdEdit,
  MdClose,
} from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import SignalDetailsModal from "./SignalDetailsModal";
import { SignalInterface } from "@/lib";

const signals: SignalInterface[] = [
  {
    id: 1,
    pair: "BTC/USDT",
    tradeType: "BUY",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVymY2MsHisMPVmRMPyoCnJ5gkRqHcz9UvXKOU2xyHXxezt7aZkoShxhtsmIygUcwv9l8b-w4E6DUU96tteZi01jT3Uzd97zYKziFeqd5bc7utRGd58PLtTZzvfghdWyITD2fHlvIE_RoNjuREFkB3ZDgxinDG9SFfRCtCC8ivgpb5dz3GOHxTzsLurCthgo4B8B_oykFuca1pZqejG-W844oHp0TCS6VcJLwsJp-pzxrYjxy8gydIGIDH4PDvN0gQ4E3K8TVkaA",
    logoBg: "bg-[#f7931a]/10",
    date: "Oct 24, 2023",
    time: "14:22 UTC",
    entryPrice: 34812.5,
    tp: 36500.0,
    sl: 34000.0,
    result: "SUCCESS",
    status: "ACTIVE",
    followers: 1402,
    volume: "$12.4M",
    leverage: "20x",
  },
  {
    id: 2,
    pair: "ETH/USDT",
    tradeType: "SELL",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv4aL6qaR_0Q3I7fxZ90JXd6PJXwiuQ2eKfSMjCg8OADMAbai1Q1WfkBUrWvimt_uXhxvLPFYarppy_cCxIUokFVveK-ueRGkxs1d5D7pDyt3rnvCusUncvGKEwAaCg8RnxRgzMyz-nRTsCwqUtHdVstFqb4gNmGk_byRApyOG0Q5Q8AVH9C5LASi6jcSAN1eMYIn-v9r1TEGLXspARt83uOebvq21cQZ1Zdpaf9lOo8Qn-hbRuwpTewHioAQAuWKDAeprxBOxsQ",
    logoBg: "bg-[#627eea]/10",
    date: "Oct 22, 2023",
    time: "09:15 UTC",
    entryPrice: 1842.12,
    tp: 1780.0,
    sl: 1900.0,
    result: "BAD",
    status: "EXPIRED",
    followers: 982,
    volume: "$8.1M",
    leverage: "10x",
  },
  {
    id: 3,
    pair: "SOL/USDT",
    tradeType: "BUY",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyFGH83nu1YbDPVevny_STKTRhvYn-qsGD0-MRmuHj_tXaD88okMXf1cYyoYhc9FGxCCss0kN2MUxjJgAjS-K20TOfgIHB2Qu79qnfv9UgVEXuwi9Mb3dS461-7-xiAYSMkaJMxA-Bz78hzgPgMU7UDWMyZOqdzWyTY0MQjAWMHMix5aS2j0tWqmSvElTqoi60ts3BzXZaC6U3KRWiuWQauOPfYn_YuBlI2Rn-jN3DEwzU-XqRVFABm9SYLbnWcW2Ps1Kq9At8VQ",
    logoBg: "bg-[#26a17b]/10",
    date: "Oct 21, 2023",
    time: "21:40 UTC",
    entryPrice: 32.05,
    tp: 35.5,
    sl: 30.0,
    result: "EVEN",
    status: "ACTIVE",
    followers: 450,
    volume: "$4.2M",
    leverage: "5x",
  },
  {
    id: 4,
    pair: "BTC/USDT",
    tradeType: "SELL",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPZ0ElC7b2frocusmgBol6mym7xaT_bvuIfmp8VYnmqj_rkOl42qwdZNjuEzP3rqowtZWZuhtOaewUYPBq8eu8QaZKvm3JRyqjbQNU47DqUeQgAexJtT3bfuvXWi46CujX6-HyU8xR-cg5YD6chDNEZAzeug0fLzRBvMenIoDiYwM2nhJYL79LogXiT1O8iiN1U_pT-fv4q5pN2Wsl0wRL1RRLa7ADNpAWeR4CgCiFjhahzk2NS3MLr5YkqTg_Zbreq0EmwTQ9sQ",
    logoBg: "bg-[#f7931a]/10",
    date: "Oct 20, 2023",
    time: "03:50 UTC",
    entryPrice: 31245.0,
    tp: 30000.0,
    sl: 32500.0,
    result: "SUCCESS",
    status: "ACTIVE",
    followers: 2118,
    volume: "$25.8M",
    leverage: "50x",
  },
];

const getResultStyles = (result: SignalInterface["result"]) => {
  switch (result) {
    case "SUCCESS":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "BAD":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "EVEN":
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

const getStatusStyles = (status: SignalInterface["status"]) => {
  return status === "ACTIVE"
    ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
    : "bg-gray-500/10 text-gray-400 border-gray-500/20";
};

// components/FilterModal.tsx
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeStatus: string;
  activeTradeType: string;
  activeResult: string;
  onStatusChange: (status: string) => void;
  onTradeTypeChange: (type: string) => void;
  onResultChange: (result: string) => void;
}

function FilterModal({
  isOpen,
  onClose,
  activeStatus,
  activeTradeType,
  activeResult,
  onStatusChange,
  onTradeTypeChange,
  onResultChange,
}: FilterModalProps) {
  if (!isOpen) return null;

  const handleClearAll = () => {
    onStatusChange("ALL");
    onTradeTypeChange("ALL");
    onResultChange("ALL");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">Filters</h3>
          <div className="flex gap-2">
            <button
              onClick={handleClearAll}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Status
            </label>
            <div className="flex gap-2 flex-wrap">
              {["ALL", "ACTIVE", "EXPIRED"].map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeStatus === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Trade Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Direction
            </label>
            <div className="flex gap-2 flex-wrap">
              {["ALL", "BUY", "SELL"].map((type) => (
                <button
                  key={type}
                  onClick={() => onTradeTypeChange(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTradeType === type
                      ? type === "BUY"
                        ? "bg-green-600 text-white"
                        : type === "SELL"
                          ? "bg-red-600 text-white"
                          : "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Result Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Result
            </label>
            <div className="flex gap-2 flex-wrap">
              {["ALL", "SUCCESS", "BAD", "EVEN"].map((result) => (
                <button
                  key={result}
                  onClick={() => onResultChange(result)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeResult === result
                      ? result === "SUCCESS"
                        ? "bg-green-600 text-white"
                        : result === "BAD"
                          ? "bg-red-600 text-white"
                          : "bg-gray-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {result}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

// components/ActionDropdown.tsx
interface ActionDropdownProps {
  signal: SignalInterface;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

function ActionDropdown({
  signal,
  onEdit,
  onDelete,
  onClose,
}: ActionDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const isExpired = signal.status === "EXPIRED";

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-36 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-10"
    >
      <button
        onClick={() => {
          if (!isExpired) onEdit();
        }}
        disabled={isExpired}
        className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 rounded-t-lg transition-colors ${
          isExpired
            ? "text-gray-500 cursor-not-allowed"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        <MdEdit className="text-base" />
        Edit
      </button>
      <button
        onClick={() => {
          if (!isExpired) onDelete();
        }}
        disabled={isExpired}
        className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 rounded-b-lg transition-colors ${
          isExpired
            ? "text-gray-500 cursor-not-allowed"
            : "text-red-400 hover:bg-gray-700 hover:text-red-300"
        }`}
      >
        <MdDelete className="text-base" />
        Delete
      </button>
    </div>
  );
}

export default function SignalsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("ALL");
  const [activeTradeTypeFilter, setActiveTradeTypeFilter] =
    useState<string>("ALL");
  const [activeResultFilter, setActiveResultFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSignal, setSelectedSignal] = useState<SignalInterface | null>(
    null,
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [actionDropdownSignal, setActionDropdownSignal] = useState<
    number | null
  >(null);

  const itemsPerPage = 5;

  // Filter signals
  const filteredSignals = signals.filter((signal) => {
    const matchesSearch = signal.pair
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      activeStatusFilter === "ALL" || signal.status === activeStatusFilter;
    const matchesTradeType =
      activeTradeTypeFilter === "ALL" ||
      signal.tradeType === activeTradeTypeFilter;
    const matchesResult =
      activeResultFilter === "ALL" || signal.result === activeResultFilter;
    return matchesSearch && matchesStatus && matchesTradeType && matchesResult;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSignals.length / itemsPerPage);
  const paginatedSignals = filteredSignals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleRowClick = (signal: SignalInterface) => {
    if (actionDropdownSignal === signal.id) return;
    setSelectedSignal(signal);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (signal: SignalInterface) => {
    console.log("Edit signal:", signal);
    setActionDropdownSignal(null);
    // Implement edit logic
  };

  const handleDelete = (signal: SignalInterface) => {
    console.log("Delete signal:", signal);
    setActionDropdownSignal(null);
    // Implement delete logic
  };

  return (
    <>
      <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        {/* Filter Bar */}
        <div className="px-4 md:px-8 py-4 md:py-5 flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between bg-gray-800/30 border-b border-white/5">
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all"
            >
              <MdFilterList className="text-base" />
              Filters
              {(activeStatusFilter !== "ALL" ||
                activeTradeTypeFilter !== "ALL" ||
                activeResultFilter !== "ALL") && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              )}
            </button>
          </div>

          <div className="relative group w-full md:w-auto">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets..."
              className="bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 w-full md:w-64 focus:ring-1 focus:ring-blue-500/30 text-xs text-white placeholder:text-gray-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-white/5">
                <th className="px-8 py-6">Trading Pair</th>
                <th className="px-6 py-6">Date Created</th>
                <th className="px-6 py-6">Direction</th>
                <th className="px-6 py-6">Result</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6">Copy Volume</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedSignals.map((signal) => (
                <tr
                  key={signal.id}
                  onClick={() => handleRowClick(signal)}
                  className="group hover:bg-gray-800/30 transition-colors cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${signal.logoBg} flex items-center justify-center`}
                      >
                        <img
                          alt={signal.pair.split("/")[0]}
                          className="w-5 h-5"
                          src={signal.logo}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">
                          {signal.pair}
                        </div>
                        {signal.leverage && (
                          <div className="text-[10px] text-gray-400">
                            {signal.leverage}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="text-sm font-medium text-white">
                      {signal.date}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {signal.time}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                        signal.tradeType === "BUY"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}
                    >
                      {signal.tradeType}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getResultStyles(signal.result)}`}
                    >
                      {signal.result}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyles(signal.status)}`}
                    >
                      {signal.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="text-sm font-medium text-white">
                      {signal.followers.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-gray-400">Traders</div>
                  </td>
                  <td className="px-8 py-6 text-right relative">
                    <div onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() =>
                          setActionDropdownSignal(
                            actionDropdownSignal === signal.id
                              ? null
                              : signal.id,
                          )
                        }
                        className="text-gray-400 hover:text-white transition-colors p-2"
                      >
                        <MdMoreVert className="text-xl" />
                      </button>
                      {actionDropdownSignal === signal.id && (
                        <ActionDropdown
                          signal={signal}
                          onEdit={() => handleEdit(signal)}
                          onDelete={() => handleDelete(signal)}
                          onClose={() => setActionDropdownSignal(null)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-white/5">
          {paginatedSignals.map((signal) => (
            <div
              key={signal.id}
              className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
              onClick={() => handleRowClick(signal)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${signal.logoBg} flex items-center justify-center`}
                  >
                    <img
                      alt={signal.pair.split("/")[0]}
                      className="w-6 h-6"
                      src={signal.logo}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white">{signal.pair}</div>
                    {signal.leverage && (
                      <div className="text-[10px] text-gray-400">
                        {signal.leverage}
                      </div>
                    )}
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() =>
                      setActionDropdownSignal(
                        actionDropdownSignal === signal.id ? null : signal.id,
                      )
                    }
                    className="text-gray-400 hover:text-white transition-colors p-2"
                  >
                    <MdMoreVert className="text-xl" />
                  </button>
                  {actionDropdownSignal === signal.id && (
                    <ActionDropdown
                      signal={signal}
                      onEdit={() => handleEdit(signal)}
                      onDelete={() => handleDelete(signal)}
                      onClose={() => setActionDropdownSignal(null)}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-gray-400 mb-1">Date</div>
                  <div className="text-white">{signal.date}</div>
                  <div className="text-gray-500 text-[10px]">{signal.time}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Direction</div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      signal.tradeType === "BUY"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                  >
                    {signal.tradeType}
                  </span>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Result</div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getResultStyles(signal.result)}`}
                  >
                    {signal.result}
                  </span>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Status</div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyles(signal.status)}`}
                  >
                    {signal.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-400 mb-1">Copy Volume</div>
                  <div className="text-white font-medium">
                    {signal.followers.toLocaleString()} Traders
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredSignals.length > 0 && (
          <div className="px-4 md:px-8 py-4 md:py-6 bg-gray-800/20 flex flex-col md:flex-row gap-4 justify-between items-center border-t border-white/5">
            <div className="text-xs text-gray-400 order-2 md:order-1">
              Showing{" "}
              <span className="text-white font-bold">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, filteredSignals.length)}
              </span>{" "}
              of {filteredSignals.length} signals
            </div>
            <div className="flex gap-2 order-1 md:order-2 flex-wrap justify-center">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdChevronLeft className="text-sm" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg transition-all text-xs ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white font-bold"
                        : "hover:bg-gray-800 text-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdChevronRight className="text-sm" />
              </button>
            </div>
          </div>
        )}

        {filteredSignals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No signals found</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <SignalDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        signal={selectedSignal}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        activeStatus={activeStatusFilter}
        activeTradeType={activeTradeTypeFilter}
        activeResult={activeResultFilter}
        onStatusChange={setActiveStatusFilter}
        onTradeTypeChange={setActiveTradeTypeFilter}
        onResultChange={setActiveResultFilter}
      />
    </>
  );
}
