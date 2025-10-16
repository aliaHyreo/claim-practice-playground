import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, FileText } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleConsolidatedReport = () => {
    navigate("/consolidated-report");
  };

  return (
    <header className="w-full border-b bg-background">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-border shadow-sm">
            <img src="/logo.png" alt="Praxis Logo" className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-foreground">Praxis</span>
        </div>

        {/* Right Side - User Info and Actions */}
        <div className="flex items-center gap-4">
          
          {/* Consolidated Report Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleConsolidatedReport}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Report
          </Button>

          {/* User Name */}
          <div className="text-sm font-medium text-foreground">
            James Anderson
          </div>

          {/* Logout Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
