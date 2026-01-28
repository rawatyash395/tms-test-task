import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { createGraphQLClient } from "../lib/graphql-client";
import {
  SHIPMENTS_QUERY,
  DELETE_SHIPMENT_MUTATION,
  SYSTEM_STATS_QUERY,
  CREATE_SHIPMENT_MUTATION,
  UPDATE_SHIPMENT_MUTATION,
} from "../graphql/queries";
import { Shipment, ShipmentFilter, SortConfig, ViewMode } from "../types";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { ShipmentManagementView } from "../components/ShipmentManagementView";
import { ShipmentDetailModal } from "../components/ShipmentDetailModal";
import { AnalyticsCharts } from "../components/AnalyticsCharts";
import { CarrierView } from "../components/CarrierView";
import { ReportsView } from "../components/ReportsView";
import { SettingsView } from "../components/SettingsView";
import { ShipmentFormDrawer } from "../components/ShipmentFormDrawer";
import { CarrierFormDrawer } from "../components/CarrierFormDrawer";

import { Toast } from "../components/Toast";
import { ConfirmModal } from "../components/ConfirmModal";
import { StatsGrid } from "../components/StatsGrid";

export const DashboardPage: React.FC = () => {
  const { token, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [filter, setFilter] = useState<ShipmentFilter>({});
  const [sort] = useState<SortConfig>({ field: "created_at", order: "DESC" });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  const [isShipmentDrawerOpen, setIsShipmentDrawerOpen] = useState(false);
  const [isCarrierDrawerOpen, setIsCarrierDrawerOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Shipment | null>(null);

  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (
      !isAdmin &&
      (activeNavItem === "reports" || activeNavItem === "settings")
    ) {
      setActiveNavItem("dashboard");
      setToast({
        message: "ACCESS RESTRICTED: ADMIN PRIVILEGES REQUIRED",
        type: "error",
      });
    }
  }, [activeNavItem, isAdmin]);

  useEffect(() => {
    setPage(1);
  }, [activeNavItem, filter, debouncedSearch]);

  useEffect(() => {
    const handleToast = (e: any) => {
      setToast(e.detail);
    };
    window.addEventListener("app:toast", handleToast);
    return () => window.removeEventListener("app:toast", handleToast);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["shipments", page, limit, filter, sort, debouncedSearch],
    queryFn: async () => {
      const client = createGraphQLClient(token!);
      const result: any = await client.request(SHIPMENTS_QUERY, {
        page,
        limit,
        filter: { ...filter, search: debouncedSearch },
        sort,
      });
      return result.shipments;
    },
    enabled: !!token,
  });

  const { data: statsData } = useQuery({
    queryKey: ["systemStats"],
    queryFn: async () => {
      const client = createGraphQLClient(token!);
      const result: any = await client.request(SYSTEM_STATS_QUERY);
      return result.systemStats;
    },
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async (input: any) => {
      const client = createGraphQLClient(token!);
      return client.request(CREATE_SHIPMENT_MUTATION, { input });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      queryClient.invalidateQueries({ queryKey: ["systemStats"] });
      setIsShipmentDrawerOpen(false);
      setToast({
        message: "SHIPMENT SUCCESSFULLY REGISTERED",
        type: "success",
      });

      const ship = data.createShipment;
      window.dispatchEvent(
        new CustomEvent("app:notification", {
          detail: {
            title: "Shipment Created",
            desc: `New record ${ship.tracking_number || ship.id} has been added to the registry.`,
            type: "shipment",
          },
        }),
      );
    },
    onError: () => {
      setToast({ message: "FAILED TO PROCESS SHIPMENT", type: "error" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, input }: { id: string; input: any }) => {
      const client = createGraphQLClient(token!);
      return client.request(UPDATE_SHIPMENT_MUTATION, { id, input });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      setIsShipmentDrawerOpen(false);
      setEditingShipment(null);
      setToast({ message: "SHIPMENT RECORD UPDATED", type: "success" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const client = createGraphQLClient(token!);
      return client.request(DELETE_SHIPMENT_MUTATION, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      queryClient.invalidateQueries({ queryKey: ["systemStats"] });
      setDeleteConfirm(null);
      setToast({ message: "RECORD REMOVED FROM REGISTRY", type: "success" });
    },
  });

  const handleCreateOrUpdate = (formData: any) => {
    if (editingShipment) {
      updateMutation.mutate({ id: editingShipment.id, input: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (shipment: Shipment) => {
    setDeleteConfirm(shipment);
  };

  const handleEdit = (shipment: Shipment) => {
    setEditingShipment(shipment);
    setIsShipmentDrawerOpen(true);
  };

  const handleCarrierSubmit = (data: any) => {
    setToast({
      message: `CARRIER "${data.name}" REGISTERED OUTPUT`,
      type: "success",
    });
    setIsCarrierDrawerOpen(false);

    window.dispatchEvent(
      new CustomEvent("app:notification", {
        detail: {
          title: "New Carrier Registered",
          desc: `Carrier "${data.name}" has been added and is pending verification.`,
          type: "carrier",
        },
      }),
    );
  };

  const shipments = data?.items || [];
  const totalPages = data?.totalPages || 1;

  const renderContent = () => {
    switch (activeNavItem) {
      case "dashboard":
      case "analytics":
        return <AnalyticsCharts />;
      case "carriers":
        return (
          <CarrierView
            onAdd={() => setIsCarrierDrawerOpen(true)}
            isAdmin={isAdmin}
          />
        );
      case "reports":
        return <ReportsView />;
      case "settings":
        return <SettingsView />;
      case "all-shipments":
      case "in_transit":
      case "delivered":
      case "pending":
        return (
          <ShipmentManagementView
            shipments={shipments}
            viewMode={viewMode}
            isLoading={isLoading}
            error={error}
            isAdmin={isAdmin}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShipmentClick={setSelectedShipment}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNewShipment={() => {
              setEditingShipment(null);
              setIsShipmentDrawerOpen(true);
            }}
            setViewMode={setViewMode}
          />
        );
      default:
        return <div>View not implemented: {activeNavItem}</div>;
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden transition-colors duration-300">
      <Sidebar
        onFilterChange={setFilter}
        activeItem={activeNavItem}
        onItemClick={setActiveNavItem}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header activeItem={activeNavItem} onSetIsOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 pt-0 mt-6">
          {activeNavItem === "dashboard" && <StatsGrid stats={statsData} />}

          {renderContent()}
        </main>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={!!deleteConfirm}
        title="Delete Shipment Record?"
        desc={`This action will permanently remove tracking #${deleteConfirm?.tracking_number || deleteConfirm?.id} from the enterprise registry. This cannot be undone.`}
        onCancel={() => setDeleteConfirm(null)}
        onConfirm={() => deleteMutation.mutate(deleteConfirm!.id)}
        isLoading={deleteMutation.isPending}
      />

      {selectedShipment && (
        <ShipmentDetailModal
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
        />
      )}

      <ShipmentFormDrawer
        isOpen={isShipmentDrawerOpen}
        onClose={() => {
          setIsShipmentDrawerOpen(false);
          setEditingShipment(null);
        }}
        shipment={editingShipment}
        onSubmit={handleCreateOrUpdate}
      />

      <CarrierFormDrawer
        isOpen={isCarrierDrawerOpen}
        onClose={() => setIsCarrierDrawerOpen(false)}
        onSubmit={handleCarrierSubmit}
      />
    </div>
  );
};
