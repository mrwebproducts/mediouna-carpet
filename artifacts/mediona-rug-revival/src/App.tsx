import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Culture from "@/pages/Culture";
import Shop from "@/pages/Shop";
import Product from "@/pages/Product";
import Learn from "@/pages/Learn";
import QRStory from "@/pages/QRStory";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/culture" component={Culture} />
      <Route path="/shop" component={Shop} />
      <Route path="/rug/:id" component={Product} />
      <Route path="/learn" component={Learn} />
      <Route path="/qr/:id" component={QRStory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
