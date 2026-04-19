import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getOrders, deleteOrder, type Order } from "@/lib/orders";
import { isAdminLoggedIn, adminLogout } from "@/lib/adminAuth";

const SYMBOL_NAMES: Record<number, string> = {
  1: "Diamond Lozenge",
  2: "Chevron",
  3: "Hooked Cross",
  4: "Eight-Point Star",
  5: "T-Shapes",
  6: "Zigzag",
  7: "Tree of Life",
};

export default function AdminOrders() {
  const [, navigate] = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin");
      return;
    }
    setOrders(getOrders());
  }, []);

  function handleDelete(id: string) {
    deleteOrder(id);
    setOrders(getOrders());
  }

  function handleLogout() {
    adminLogout();
    navigate("/admin");
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-[#0f0a06] text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-[#1a1008] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm">✦</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Mediona Revival</p>
            <h1 className="text-base font-bold leading-tight">Admin — Orders</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-400">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-xl px-3 py-1.5 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-3xl text-neutral-600">✦</div>
            <p className="text-neutral-500 text-sm">No orders yet. Orders from the shop will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#1a1008] border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  {/* Left info */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider">
                        {order.type === "custom" ? "✦ Custom" : "Pre-order"}
                      </span>
                      <span className="text-neutral-500 text-xs">{formatDate(order.date)}</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                      <div>
                        <span className="text-neutral-500 text-xs uppercase tracking-wider">Name</span>
                        <p className="font-semibold text-white">{order.name}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-xs uppercase tracking-wider">Phone</span>
                        <p className="font-semibold text-white">{order.phone}</p>
                      </div>
                      {order.rugName && (
                        <div>
                          <span className="text-neutral-500 text-xs uppercase tracking-wider">Rug</span>
                          <p className="font-semibold text-white">{order.rugName}</p>
                        </div>
                      )}
                      {order.notes && (
                        <div className="sm:col-span-2">
                          <span className="text-neutral-500 text-xs uppercase tracking-wider">Notes</span>
                          <p className="text-neutral-300 text-sm leading-relaxed">{order.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Symbols */}
                    {order.symbols.length > 0 && (
                      <div>
                        <span className="text-neutral-500 text-xs uppercase tracking-wider">Symbols</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {order.symbols.map((s) => (
                            <span key={s} className="inline-flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 rounded-full px-2.5 py-0.5 text-xs text-neutral-300">
                              <img src={`/symbols/${s}.png`} alt="" className="w-4 h-4 rounded-full object-cover" />
                              {SYMBOL_NAMES[s] ?? `Symbol ${s}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Colors */}
                    {order.colors.length > 0 && (
                      <div>
                        <span className="text-neutral-500 text-xs uppercase tracking-wider">Colors</span>
                        <div className="flex items-center gap-2 mt-1">
                          {order.colors.map((c) => (
                            <div key={c} className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full ring-1 ring-white/10" style={{ backgroundColor: c }} />
                              <span className="font-mono text-xs text-neutral-400">{c.toUpperCase()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="shrink-0 text-xs text-neutral-600 hover:text-red-400 border border-neutral-800 hover:border-red-400/30 rounded-xl px-3 py-1.5 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
