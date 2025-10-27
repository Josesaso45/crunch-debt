import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import VistaEjecutiva from "./pages/VistaEjecutiva";
import VistaOperativa from "./pages/VistaOperativa";
import VistaDetalle from "./pages/VistaDetalle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout><VistaEjecutiva /></DashboardLayout>} path="/" />
          <Route element={<DashboardLayout><VistaOperativa /></DashboardLayout>} path="/operativa" />
          <Route element={<DashboardLayout><VistaDetalle /></DashboardLayout>} path="/detalle" />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
