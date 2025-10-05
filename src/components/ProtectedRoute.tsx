import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { cva } from "class-variance-authority";
import { Loader2, Shield } from "lucide-react";

// --- Utility Functions ---
// A simple utility to combine class names, since external imports are not available.
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- UI Components (Embedded for single-file functionality) ---
// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Card components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// --- Mock Authentication Context and Logic ---
const AuthContext = React.createContext(null);

const useAuth = () => {
  return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate an API call to get the user and profile
    setTimeout(() => {
      setUser({ id: "123" });
      setUserProfile({ userType: "farmer" });
      setLoading(false);
    }, 1500);
  }, []);

  const login = (type) => {
    setLoading(true);
    setTimeout(() => {
      setUser({ id: "123" });
      setUserProfile({ userType: type });
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
  };

  const value = { user, userProfile, loading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- Your ProtectedRoute component, integrated for a complete example.
const ProtectedRoute = ({ children, requiredUserType, redirectTo = "/auth" }) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="animate-spin text-primary" size={20} />
            <span className="text-lg font-medium">Verifying Authentication...</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield size={16} className="text-primary" />
            <span>Secure session validation in progress</span>
          </div>
        </Card>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredUserType && userProfile?.userType !== requiredUserType) {
    const userTypeRoutes = {
      farmer: "/dashboard",
      cooperative: "/cooperative",
      bank: "/lender",
    };

    const correctRoute = userProfile?.userType ? userTypeRoutes[userProfile.userType] : "/portals";
    return <Navigate to={correctRoute} replace />;
  }

  return <>{children}</>;
};

// --- Example Pages
const HomePage = () => (
  <div className="p-8 text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to FarmCred</h1>
    <p className="text-lg text-gray-600">This is a public page.</p>
  </div>
);

const FarmerDashboard = () => (
  <div className="p-8 text-center">
    <h1 className="text-4xl font-bold mb-4">Farmer Dashboard</h1>
    <p className="text-lg text-gray-600">You have successfully accessed a protected page.</p>
  </div>
);

const CooperativePortal = () => (
  <div className="p-8 text-center">
    <h1 className="text-4xl font-bold mb-4">Cooperative Portal</h1>
    <p className="text-lg text-gray-600">This page is for cooperative users only.</p>
  </div>
);

const BankPortal = () => (
  <div className="p-8 text-center">
    <h1 className="text-4xl font-bold mb-4">Bank Portal</h1>
    <p className="text-lg text-gray-600">This page is for bank users only.</p>
  </div>
);

const AuthPage = () => {
  const { login } = useAuth();
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Login Page</h1>
      <p className="text-lg text-gray-600 mb-6">Click a button to log in and test the protected routes.</p>
      <div className="space-x-4">
        <Button onClick={() => login("farmer")}>Login as Farmer</Button>
        <Button onClick={() => login("cooperative")}>Login as Cooperative</Button>
        <Button onClick={() => login("bank")}>Login as Bank</Button>
      </div>
    </div>
  );
};

// --- Main App Component
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <header className="bg-white shadow p-4 flex justify-between items-center">
            <nav className="space-x-4">
              <a href="/" className="text-primary font-medium">Home</a>
              <a href="/dashboard" className="text-primary font-medium">Farmer Dashboard</a>
              <a href="/cooperative" className="text-primary font-medium">Cooperative Portal</a>
              <a href="/lender" className="text-primary font-medium">Bank Portal</a>
            </nav>
            <div className="flex space-x-2">
              <LogoutButton />
            </div>
          </header>
          <main className="flex-1 flex items-center justify-center">
            <Routes>
              {/* Public route */}
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={<ProtectedRoute requiredUserType="farmer"><FarmerDashboard /></ProtectedRoute>}
              />
              <Route
                path="/cooperative"
                element={<ProtectedRoute requiredUserType="cooperative"><CooperativePortal /></ProtectedRoute>}
              />
              <Route
                path="/lender"
                element={<ProtectedRoute requiredUserType="bank"><BankPortal /></ProtectedRoute>}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

const LogoutButton = () => {
  const { user, logout } = useAuth();
  if (!user) return null;
  return <Button variant="ghost" onClick={logout}>Logout</Button>;
};

export default App;
