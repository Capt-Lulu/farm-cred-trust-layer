import React, { useState, useEffect } from "react";

// This is a placeholder for lucide-react icons, as we need a single, runnable file.
const Clock = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const UserCheck = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
);
const MapPin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const Phone = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2.02A19.09 19.09 0 0 1 8.27 10.61a19.09 19.09 0 0 1 10.32-1.81A2.18 2.18 0 0 1 22 16.92z"></path><path d="M14.5 1.5l2 2"></path><path d="M11 5l2 2"></path></svg>
);
const Mail = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);
const Star = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const Calendar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
);
const CheckCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14 9 11"></polyline></svg>
);
const AlertCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
);
const Loader2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
);
const Eye = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3 7 10 7 10-7 10-7-3-7-10-7-10 7-10 7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

// Mock data and services to make the component runnable
const mockVerificationRequests = {
  "req-pending": {
    id: "req-pending",
    status: "pending",
    priority: "high",
    requestedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    assignedAgent: null,
    scheduledVisit: null,
    verificationReport: null,
  },
  "req-assigned": {
    id: "req-assigned",
    status: "assigned",
    priority: "medium",
    requestedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    assignedAt: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
    assignedAgent: {
      name: "Tafarki James",
      profilePhoto: "https://placehold.co/100x100/A0583A/ffffff?text=TJ",
      certificationId: "CERT-NG-12345",
      rating: 4.8,
      totalVerifications: 154,
      specializations: ["Agroforestry", "Poultry Farming", "Crop Science"],
      phone: "+234 801 234 5678",
      email: "t.james@example.com",
      location: {
        lga: "Gwagwalada",
        state: "Abuja",
      },
    },
    scheduledVisit: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    verificationReport: null,
  },
  "req-in-progress": {
    id: "req-in-progress",
    status: "in_progress",
    priority: "high",
    requestedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    assignedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    assignedAgent: {
      name: "Tafarki James",
      profilePhoto: "https://placehold.co/100x100/A0583A/ffffff?text=TJ",
      certificationId: "CERT-NG-12345",
      rating: 4.8,
      totalVerifications: 154,
      specializations: ["Agroforestry", "Poultry Farming", "Crop Science"],
      phone: "+234 801 234 5678",
      email: "t.james@example.com",
      location: {
        lga: "Gwagwalada",
        state: "Abuja",
      },
    },
    scheduledVisit: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
    verificationReport: null,
  },
  "req-completed": {
    id: "req-completed",
    status: "completed",
    priority: "high",
    requestedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    assignedAt: new Date(Date.now() - 72000000).toISOString(), // 20 hours ago
    assignedAgent: {
      name: "Tafarki James",
      profilePhoto: "https://placehold.co/100x100/A0583A/ffffff?text=TJ",
      certificationId: "CERT-NG-12345",
      rating: 4.8,
      totalVerifications: 154,
      specializations: ["Agroforestry", "Poultry Farming", "Crop Science"],
      phone: "+234 801 234 5678",
      email: "t.james@example.com",
      location: {
        lga: "Gwagwalada",
        state: "Abuja",
      },
    },
    scheduledVisit: new Date(Date.now() - 36000000).toISOString(), // 10 hours ago
    verificationReport: {
      farmExists: true,
      farmSizeAccurate: true,
      farmTypeAccurate: true,
      locationAccurate: true,
      confidenceScore: 95,
      recommendation: "approve",
      additionalNotes: "The farm is well-maintained and matches the description provided. The owner was cooperative.",
    },
  },
  "req-rejected": {
    id: "req-rejected",
    status: "rejected",
    priority: "low",
    requestedAt: new Date(Date.now() - 129600000).toISOString(), // 1.5 days ago
    assignedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    assignedAgent: {
      name: "Tafarki James",
      profilePhoto: "https://placehold.co/100x100/A0583A/ffffff?text=TJ",
      certificationId: "CERT-NG-12345",
      rating: 4.8,
      totalVerifications: 154,
      specializations: ["Agroforestry", "Poultry Farming", "Crop Science"],
      phone: "+234 801 234 5678",
      email: "t.james@example.com",
      location: {
        lga: "Gwagwalada",
        state: "Abuja",
      },
    },
    scheduledVisit: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    verificationReport: {
      farmExists: false,
      farmSizeAccurate: false,
      farmTypeAccurate: true,
      locationAccurate: false,
      confidenceScore: 25,
      recommendation: "reject",
      additionalNotes: "The location provided does not match the actual farm coordinates. The farm size is significantly smaller than claimed in the request.",
    },
  },
};

const agentVerificationService = {
  getVerificationStatus: async (requestId) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockVerificationRequests[requestId];
  },
};

// UI Components to replicate shadcn/ui for a single file app
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`font-semibold tracking-tight text-xl ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Badge = ({ children, className = "", variant = "secondary" }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variantClasses = {
    secondary: "bg-gray-100 text-gray-800 border-transparent",
    destructive: "bg-red-100 text-red-800 border-red-200",
    default: "bg-blue-100 text-blue-800 border-blue-200",
    outline: "bg-white text-gray-800 border-gray-200",
  };
  return <div className={`${baseClasses} ${className} ${variantClasses[variant]}`}>{children}</div>;
};
const Button = ({ children, className = "", variant = "default", onClick = () => {} }) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  };
  return <button className={`${baseClasses} ${className} ${variantClasses[variant]}`} onClick={onClick}>{children}</button>;
};
const Avatar = ({ children, className = "" }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);
const AvatarImage = ({ src, className = "" }) => <img src={src} alt="Avatar" className={`aspect-square h-full w-full ${className}`} />;
const AvatarFallback = ({ children, className = "" }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}>
    {children}
  </div>
);

// The component from your prompt, slightly modified to work in a single file
export const AgentVerificationStatus = ({ requestId, onStatusChange }) => {
  const [verificationRequest, setVerificationRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVerificationStatus();
    const interval = setInterval(fetchVerificationStatus, 30000);
    return () => clearInterval(interval);
  }, [requestId]);

  const fetchVerificationStatus = async () => {
    setIsLoading(true);
    try {
      console.log("[v0] Fetching verification status for request:", requestId);
      const request = await agentVerificationService.getVerificationStatus(requestId);

      if (request) {
        setVerificationRequest(request);
        onStatusChange?.(request.status);
        setError("");
      } else {
        setError("Verification request not found");
      }
    } catch (error) {
      console.log("[v0] Error fetching verification status:", error);
      setError("Failed to fetch verification status");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "assigned":
        return <UserCheck className="h-5 w-5 text-blue-500" />;
      case "in_progress":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Your farm verification request is in queue. We are finding the best certified agent in your area.";
      case "assigned":
        return "A certified agent has been assigned to verify your farm. They will contact you to schedule a visit.";
      case "in_progress":
        return "The agent is currently conducting the farm verification. This may take a few hours.";
      case "completed":
        return "Farm verification completed successfully! Your farm has been verified by our certified agent.";
      case "rejected":
        return "Farm verification was not successful. Please contact support for more information.";
      default:
        return "Unknown status";
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-NG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading verification status...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <span className="text-red-600">{error}</span>
        </CardContent>
      </Card>
    );
  }

  if (!verificationRequest) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <span className="text-muted-foreground">No verification request found</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(verificationRequest.status)}
            Farm Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Request ID:</span>
            <span className="font-mono text-sm">{verificationRequest.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Status:</span>
            <Badge className={getStatusColor(verificationRequest.status)}>
              {verificationRequest.status.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Priority:</span>
            <Badge variant={verificationRequest.priority === "high" ? "destructive" : "secondary"}>
              {verificationRequest.priority.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Requested:</span>
            <span className="text-sm">{formatDate(verificationRequest.requestedAt)}</span>
          </div>
          <div className="p-3 bg-secondary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">{getStatusMessage(verificationRequest.status)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Agent Details */}
      {verificationRequest.assignedAgent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Assigned Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={verificationRequest.assignedAgent.profilePhoto || "/placeholder.svg"} />
                <AvatarFallback>
                  {verificationRequest.assignedAgent.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="font-semibold">{verificationRequest.assignedAgent.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Certification ID: {verificationRequest.assignedAgent.certificationId}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{verificationRequest.assignedAgent.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {verificationRequest.assignedAgent.totalVerifications} verifications
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {verificationRequest.assignedAgent.specializations.map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{verificationRequest.assignedAgent.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{verificationRequest.assignedAgent.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {verificationRequest.assignedAgent.location.lga}, {verificationRequest.assignedAgent.location.state}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scheduled Visit */}
      {verificationRequest.scheduledVisit && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Scheduled Visit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="font-medium">Visit Date:</span>
              <span className="text-sm">{formatDate(verificationRequest.scheduledVisit)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              The agent will visit your farm at the scheduled time. Please ensure you are available and have access to the farm location.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Verification Report */}
      {verificationRequest.verificationReport && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Verification Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Farm Exists:</span>
                <Badge variant={verificationRequest.verificationReport.farmExists ? "default" : "destructive"}>
                  {verificationRequest.verificationReport.farmExists ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Size Accurate:</span>
                <Badge variant={verificationRequest.verificationReport.farmSizeAccurate ? "default" : "destructive"}>
                  {verificationRequest.verificationReport.farmSizeAccurate ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Type Accurate:</span>
                <Badge variant={verificationRequest.verificationReport.farmTypeAccurate ? "default" : "destructive"}>
                  {verificationRequest.verificationReport.farmTypeAccurate ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Location Accurate:</span>
                <Badge variant={verificationRequest.verificationReport.locationAccurate ? "default" : "destructive"}>
                  {verificationRequest.verificationReport.locationAccurate ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Confidence Score:</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${verificationRequest.verificationReport.confidenceScore}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{verificationRequest.verificationReport.confidenceScore}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Recommendation:</span>
              <Badge
                variant={
                  verificationRequest.verificationReport.recommendation === "approve"
                    ? "default"
                    : verificationRequest.verificationReport.recommendation === "reject"
                    ? "destructive"
                    : "secondary"
                }
              >
                {verificationRequest.verificationReport.recommendation.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
            {verificationRequest.verificationReport.additionalNotes && (
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="text-sm font-medium mb-1">Agent Notes:</p>
                <p className="text-sm text-muted-foreground">
                  {verificationRequest.verificationReport.additionalNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={fetchVerificationStatus} className="flex-1 bg-transparent">
          Refresh Status
        </Button>
        {verificationRequest.status === "completed" && <Button className="flex-1">Continue to Dashboard</Button>}
      </div>
    </div>
  );
};

// Main App component to demonstrate the AgentVerificationStatus component
const App = () => {
  const [requestId, setRequestId] = useState("req-pending");

  const handleStatusChange = (status) => {
    console.log("Verification status changed to:", status);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 flex flex-col items-center justify-center">
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-3xl font-bold text-center mb-6">Verification Demo</h1>
        <AgentVerificationStatus requestId={requestId} onStatusChange={handleStatusChange} />
        <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 space-y-2">
          <p className="font-medium text-center">Change Request Status:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Button variant="outline" onClick={() => setRequestId("req-pending")}>
              Pending
            </Button>
            <Button variant="outline" onClick={() => setRequestId("req-assigned")}>
              Assigned
            </Button>
            <Button variant="outline" onClick={() => setRequestId("req-in-progress")}>
              In Progress
            </Button>
            <Button variant="outline" onClick={() => setRequestId("req-completed")}>
              Completed
            </Button>
            <Button variant="outline" onClick={() => setRequestId("req-rejected")}>
              Rejected
            </Button>
            <Button variant="outline" onClick={() => setRequestId("req-unknown")}>
              Not Found
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
