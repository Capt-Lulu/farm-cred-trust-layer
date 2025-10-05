import React, { useState, useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import { Toaster, toast } from "sonner";
import { MapPin, Camera, Upload, CheckCircle, AlertCircle, Loader2, Save, Pencil, Trash2 } from "lucide-react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, addDoc, collection, getDocs, query, where, serverTimestamp, onSnapshot, deleteDoc } from 'firebase/firestore';

// A simple utility to combine class names, since external imports are not available.
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- UI Components (Embedded for single-file functionality) ---
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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
const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
));
Button.displayName = "Button";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
));
Label.displayName = "Label";

const Select = ({ children, value, onValueChange, ...props }) => {
  const [open, setOpen] = useState(false);
  const handleValueChange = (val) => {
    if (onValueChange) {
      onValueChange(val);
    }
    setOpen(false);
  };
  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)} className="w-full inline-flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer">
        {React.Children.map(children, child => {
          if (child.type.displayName === "SelectValue") {
            const selectedItem = React.Children.toArray(React.Children.map(children, c => c.type.displayName === "SelectContent" ? c : null).filter(Boolean)[0].props.children).find(item => item.props.value === value);
            return React.cloneElement(child, { children: selectedItem ? selectedItem.props.children : child.props.placeholder });
          }
          return null;
        })}
      </div>
      {open && (
        <div className="absolute z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md mt-1">
          {React.Children.map(children, child => {
            if (child.type.displayName === "SelectContent") {
              return React.Children.map(child.props.children, item =>
                React.cloneElement(item, { onClick: () => handleValueChange(item.props.value) })
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};
const SelectTrigger = ({ children, ...props }) => <div {...props}>{children}</div>;
SelectTrigger.displayName = "SelectTrigger";
const SelectValue = ({ placeholder, ...props }) => <span {...props}>{placeholder}</span>;
SelectValue.displayName = "SelectValue";
const SelectContent = ({ children, ...props }) => <div {...props}>{children}</div>;
SelectContent.displayName = "SelectContent";
const SelectItem = ({ children, value, ...props }) => (
  <div {...props} className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
    {children}
  </div>
);
SelectItem.displayName = "SelectItem";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const Badge = ({ className, variant, ...props }) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);

// --- FarmMapping Component ---
const FarmMapping = ({
  onLocationCapture,
  onPhotosCapture,
  isRequired = true,
  db,
  userId
}) => {
  const [location, setLocation] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [farmSize, setFarmSize] = useState("");
  const [farmType, setFarmType] = useState("");
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [agentVerificationStatus, setAgentVerificationStatus] = useState("pending");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [editingSubmission, setEditingSubmission] = useState(null);

  const fileInputRef = useRef(null);

  const farmTypes = [
    { value: "crop", label: "Crop Farming" },
    { value: "livestock", label: "Livestock" },
    { value: "poultry", label: "Poultry" },
    { value: "fishery", label: "Fishery/Aquaculture" },
    { value: "mixed", label: "Mixed Farming" },
    { value: "other", label: "Other" },
  ];

  const farmSizes = [
    { value: "0-1", label: "0-1 Hectare" },
    { value: "1-5", label: "1-5 Hectares" },
    { value: "5-10", label: "5-10 Hectares" },
    { value: "10-50", label: "10-50 Hectares" },
    { value: "50+", label: "50+ Hectares" },
  ];

  useEffect(() => {
    const previews = photos.map(file => URL.createObjectURL(file));
    setPhotoPreviews(previews);
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [photos]);

  useEffect(() => {
    if (db && userId) {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const q = query(collection(db, `artifacts/${appId}/users/${userId}/farm_submissions`));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setSubmissions(docs);
      }, (error) => {
        console.error("Error fetching submissions:", error);
        toast.error("Failed to fetch submissions. Please try again.");
      });
      return () => unsubscribe();
    }
  }, [db, userId]);

  const captureLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      return;
    }

    setIsCapturingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        try {
          const address = await reverseGeocode(latitude, longitude);
          const farmLocation = { latitude, longitude, accuracy, address };
          setLocation(farmLocation);
          onLocationCapture(farmLocation);
        } catch (error) {
          console.log("[v0] Reverse geocoding error:", error);
          const farmLocation = {
            latitude,
            longitude,
            accuracy,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          };
          setLocation(farmLocation);
          onLocationCapture(farmLocation);
        }
        setIsCapturingLocation(false);
        toast.success("Farm location captured successfully!");
      },
      (error) => {
        setIsCapturingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable location services.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out. Please try again.");
            break;
          default:
            setLocationError("An unknown error occurred while capturing location.");
        }
        toast.error(locationError);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      if (response.ok) {
        const data = await response.json();
        return data.city || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      }
    } catch (error) {
      console.log("[v0] Geocoding service error:", error);
    }
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      const newPhotos = [...photos, ...validFiles].slice(0, 5);
      setPhotos(newPhotos);
      onPhotosCapture(newPhotos);
      toast.success(`${validFiles.length} photo(s) added successfully`);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onPhotosCapture(newPhotos);
    toast.info("Photo removed.");
  };

  const simulateAgentVerification = () => {
    setTimeout(() => {
      setAgentVerificationStatus("verified");
      toast.success("Farm location verified by certified agent!");
    }, 3000);
  };

  useEffect(() => {
    if (location && photos.length > 0) {
      simulateAgentVerification();
    }
  }, [location, photos]);

  const resetForm = () => {
    setLocation(null);
    setPhotos([]);
    setPhotoPreviews([]);
    setFarmSize("");
    setFarmType("");
    setEditingSubmission(null);
    toast.info("Form reset.");
  };

  const handleSave = async () => {
    if (!db || !userId) {
      toast.error("Database not ready. Please try again.");
      return;
    }

    if (!location || !farmType || !farmSize || photos.length === 0) {
      toast.error("Please fill all required fields and upload at least one photo.");
      return;
    }

    setIsSubmitting(true);
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const farmData = {
        userId: userId,
        farmType: farmType,
        farmSize: farmSize,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
          address: location.address
        },
        photosCount: photos.length,
        agentVerificationStatus: agentVerificationStatus,
        createdAt: serverTimestamp()
      };

      if (editingSubmission) {
        await setDoc(doc(db, `artifacts/${appId}/users/${userId}/farm_submissions`, editingSubmission.id), farmData);
        toast.success("Submission updated successfully!");
        setEditingSubmission(null);
      } else {
        await addDoc(collection(db, `artifacts/${appId}/users/${userId}/farm_submissions`), farmData);
        toast.success("Data saved successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving document: ", error);
      toast.error("Failed to save data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (submission) => {
    setEditingSubmission(submission);
    setFarmType(submission.farmType);
    setFarmSize(submission.farmSize);
    setLocation(submission.location);
    // Since we don't store photos, we can't restore them.
    // Let's just reset the photo state and ask the user to re-upload if needed.
    setPhotos([]);
    setPhotoPreviews([]);
    toast.info("Editing submission. You can update the details and re-upload photos.");
  };

  const handleDelete = async (submissionId) => {
    if (!db || !userId) {
      toast.error("Database not ready.");
      return;
    }
    setIsSubmitting(true);
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      await deleteDoc(doc(db, `artifacts/${appId}/users/${userId}/farm_submissions`, submissionId));
      toast.success("Submission deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("Failed to delete submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {editingSubmission ? "Edit Farm Submission" : "Farm Mapping & Verification"}
            {isRequired && <span className="text-destructive">*</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Farm Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Farm Type *</Label>
              <Select value={farmType} onValueChange={setFarmType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select farm type" />
                </SelectTrigger>
                <SelectContent>
                  {farmTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Farm Size *</Label>
              <Select value={farmSize} onValueChange={setFarmSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select farm size" />
                </SelectTrigger>
                <SelectContent>
                  {farmSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location Capture */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Farm Location *</Label>
              {location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Location Captured
                </Badge>
              )}
            </div>
            {!location ? (
              <div className="space-y-3">
                <Button onClick={captureLocation} disabled={isCapturingLocation} className="w-full bg-transparent" variant="outline">
                  {isCapturingLocation ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Capturing Location...
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      Capture Farm Location
                    </>
                  )}
                </Button>
                {locationError && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {locationError}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  We need your exact farm location for verification purposes.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-secondary/20 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Coordinates:</span>
                  <span className="text-sm font-mono">{location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Accuracy:</span>
                  <span className="text-sm">±{Math.round(location.accuracy)}m</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-medium">Address:</span>
                  <span className="text-sm text-right max-w-xs">{location.address}</span>
                </div>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&hl=en&z=15&output=embed`}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Farm Photos *</Label>
              {photos.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  {photos.length} Photo(s)
                </Badge>
              )}
            </div>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Farm Photos (Max 5)
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />

            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img src={photoPreviews[index]} alt={`Farm photo ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    <Button onClick={() => removePhoto(index)} variant="destructive" size="sm" className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      ×
                    </Button>
                    <span className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1 rounded">{new Date().toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm text-muted-foreground">{5 - photos.length} photo(s) remaining</p>
          </div>

          {/* Agent Verification Status */}
          {location && photos.length > 0 && (
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {agentVerificationStatus === "pending" && (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
                    <div>
                      <p className="font-medium">Pending Agent Verification</p>
                      <p className="text-sm text-muted-foreground">Your farm location and photos are being reviewed by a certified agent</p>
                    </div>
                  </>
                )}
                {agentVerificationStatus === "verified" && (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-700">Verified by Agent</p>
                      <p className="text-sm text-muted-foreground">Your farm has been successfully verified by our certified agent</p>
                    </div>
                  </>
                )}
                {agentVerificationStatus === "rejected" && (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-700">Verification Failed</p>
                      <p className="text-sm text-muted-foreground">Please contact support for assistance</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Save & Reset Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleSave}
              disabled={isSubmitting || !location || photos.length === 0 || !farmType || !farmSize}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {editingSubmission ? "Updating..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editingSubmission ? "Update Submission" : "Save to Database"}
                </>
              )}
            </Button>
            {editingSubmission && (
              <Button onClick={resetForm} variant="outline" className="flex-1">
                Cancel Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* --- Your Submissions Section --- */}
      {submissions.length > 0 && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Your Submissions ({submissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <p className="font-medium text-sm">
                    {sub.farmType.charAt(0).toUpperCase() + sub.farmType.slice(1)} Farm - {sub.farmSize}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Coords: {sub.location.latitude.toFixed(4)}, {sub.location.longitude.toFixed(4)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Saved: {sub.createdAt ? new Date(sub.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(sub)} variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDelete(sub.id)} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// --- Main App Component to render the FarmMapping component ---
const App = () => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const authInstance = getAuth(app);

        setDb(firestore);
        setAuth(authInstance);

        onAuthStateChanged(authInstance, async (user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
            if (initialAuthToken) {
              await signInWithCustomToken(authInstance, initialAuthToken);
            } else {
              await signInAnonymously(authInstance);
            }
          }
          setIsAuthReady(true);
        });
      } catch (error) {
        console.error("Firebase initialization failed:", error);
      }
    };

    initializeFirebase();
  }, []);

  const handleLocationCapture = (location) => {
    console.log("Captured Location:", location);
  };

  const handlePhotosCapture = (photos) => {
    console.log("Captured Photos:", photos);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex items-center justify-center">
      <FarmMapping
        onLocationCapture={handleLocationCapture}
        onPhotosCapture={handlePhotosCapture}
        db={db}
        userId={userId}
      />
      <Toaster />
    </div>
  );
};

export default App;
