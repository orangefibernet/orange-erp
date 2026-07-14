import { BrowserRouter, Routes, Route } from "react-router-dom";

import EnterpriseLayout from "../../layouts/enterprise/EnterpriseLayout";

import DashboardPage from "../../pages/dashboard/DashboardPage";
import SubscribersPage from "../../pages/subscribers/SubscribersPage";
import SubscriberDetailsPage from "../../pages/subscribers/SubscriberDetailsPage";
import BillingPage from "../../pages/billing/BillingPage";
import InventoryPage from "../../pages/inventory/InventoryPage";
import OltPage from "../../pages/olt/OltPage";
import OnuPage from "../../pages/onu/OnuPage";
import ReportsPage from "../../pages/reports/ReportsPage";
import SettingsPage from "../../pages/settings/SettingsPage";
import OltDetailsPage from "../../pages/olt/OltDetailsPage";
import OnuDetailsPage from "../../pages/onu/OnuDetailsPage";
import ServiceActivationPage from "../../pages/service-activation/ServiceActivationPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<EnterpriseLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/subscribers" element={<SubscribersPage />} />
          <Route
  path="/service-activation/:customerId"
  element={<ServiceActivationPage />}
/>
          <Route path="/subscribers/:id" element={<SubscriberDetailsPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/olt" element={<OltPage />} />
          <Route path="/olt/:id" element={<OltDetailsPage />} />
          <Route path="/onu" element={<OnuPage />} />
          <Route
  path="/olt/:id/onu/:interfaceName"
  element={<OnuDetailsPage />}
/>
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}