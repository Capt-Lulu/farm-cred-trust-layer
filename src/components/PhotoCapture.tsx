"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Camera, Upload, X, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface PhotoCaptureProps {
  onPhotosCapture: (photos: File[]) => void;
  maxPhotos?: number;
  required?: boolean;
  title?: string;
  description?: string;
}

interface PhotoMetadata {
  file: File;
  preview: string;
  timestamp: Date;
  location?: GeolocationPosition;
  isValid: boolean;
  validationErrors: string[];
}

export default function PhotoCapture({
  onPhotosCapture,
  maxPhotos = 5,
  required = true,
  title = "Photo Verification",
  description = "Capture clear photos following international standards",
}: PhotoCaptureProps) {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<PhotoMetadata[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => photos.forEach(p => URL.revokeObjectURL(p.preview));
  }, [photos]);

  const updatePhotos = (newPhotos: PhotoMetadata[]) => {
    setPhotos(newPhotos);
    onPhotosCapture(newPhotos.filter(p => p.isValid).map(p => p.file));
  };

  const validatePhoto = async (file: File): Promise<{ isValid: boolean; errors: string[] }> => {
    const errors: string[] = [];
    if (file.size > 10 * 1024 * 1024) errors.push("Photo size must be <10MB");
    if (!file.type.startsWith("image/")) errors.push("File must be an image");
    const supportedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!supportedTypes.includes(file.type)) errors.push("Photo must be JPEG, PNG, or WebP");

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 1280 || img.height < 720) errors.push("Resolution must be at least 1280x720");
        const ratio = img.width / img.height;
        if (ratio < 0.5 || ratio > 2.0) errors.push("Aspect ratio must be 1:2–2:1");
        resolve({ isValid: errors.length === 0, errors });
      };
      img.onerror = () => resolve({ isValid: false, errors: ["Invalid image file"] });
      img.src = URL.createObjectURL(file);
    });
  };

  const getCurrentLocation = async (): Promise<GeolocationPosition | undefined> => {
    try {
      return await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
        });
      });
    } catch {
      return undefined;
    }
  };

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080, facingMode: "user" } });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      toast({ title: "Camera Ready", description: "Position yourself and capture photo" });
    } catch {
      toast({ title: "Camera Access Required", description: "Allow camera access", variant: "destructive" });
      setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    setStream(null);
    setIsCapturing(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const timestamp = new Date();
      const file = new File([blob], `photo_${timestamp.getTime()}.jpg`, { type: "image/jpeg" });
      const location = await getCurrentLocation();
      const validation = await validatePhoto(file);

      const photoMetadata: PhotoMetadata = { file, preview: URL.createObjectURL(blob), timestamp, location, isValid: validation.isValid, validationErrors: validation.errors };
      updatePhotos([...photos, photoMetadata]);

      if (validation.isValid) toast({ title: "Photo Captured", description: "Photo meets standards" });
      else toast({ title: "Photo Issue", description: validation.errors.join(", "), variant: "destructive" });

      stopCamera();
    }, "image/jpeg", 0.95);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos: PhotoMetadata[] = [];

    for (const file of files) {
      if (photos.length + newPhotos.length >= maxPhotos) {
        toast({ title: "Maximum Photos Reached", description: `You can only upload up to ${maxPhotos} photos`, variant: "destructive" });
        break;
      }

      const location = await getCurrentLocation();
      const validation = await validatePhoto(file);
      newPhotos.push({
        file,
        preview: URL.createObjectURL(file),
        timestamp: new Date(),
        location,
        isValid: validation.isValid,
        validationErrors: validation.errors,
      });
    }

    updatePhotos([...photos, ...newPhotos]);
    newPhotos.forEach(p => {
      toast({ title: p.isValid ? "Photo Uploaded" : "Photo Issue", description: p.isValid ? "Photo meets standards" : p.validationErrors.join(", "), variant: p.isValid ? "default" : "destructive" });
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photos[index].preview);
    updatePhotos(photos.filter((_, i) => i !== index));
  };

  const retakePhoto = (index: number) => {
    removePhoto(index);
    startCamera();
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Camera size={20} /> {title} {required && <span className="text-red-500">*</span>}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {!isCapturing && (
        <div className="flex gap-2">
          <Button onClick={startCamera} variant="outline" className="flex-1" disabled={photos.length >= maxPhotos}>
            <Camera size={16} className="mr-2" /> Take Photo
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1" disabled={photos.length >= maxPhotos}>
            <Upload size={16} className="mr-2" /> Upload Photo
          </Button>
        </div>
      )}

      {isCapturing && (
        <div className="space-y-2">
          <video ref={videoRef} autoPlay muted className="w-full h-64 bg-black rounded" />
          <div className="flex gap-2">
            <Button onClick={capturePhoto} className="flex-1"><Camera size={16} className="mr-2" /> Capture</Button>
            <Button variant="outline" onClick={stopCamera} className="flex-1">Cancel</Button>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={handleFileUpload} className="hidden" />

      {photos.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Captured Photos ({photos.length}/{maxPhotos})</h4>
          <div className="grid grid-cols-2 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative group border rounded overflow-hidden">
                <img src={photo.preview} alt={`Photo ${index + 1}`} className="w-full h-32 object-cover" />
                <div className="absolute top-2 right-2">
                  {photo.isValid ? <CheckCircle size={20} className="text-green-500 bg-white rounded-full" /> : <AlertCircle size={20} className="text-red-500 bg-white rounded-full" />}
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => retakePhoto(index)}><RotateCcw size={14} /></Button>
                  <Button size="sm" variant="destructive" onClick={() => removePhoto(index)}><X size={14} /></Button>
                </div>
                {!photo.isValid && <p className="text-xs text-red-600 mt-1">{photo.validationErrors.join(", ")}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  {photo.timestamp.toLocaleString()}
                  {photo.location
                    ? <span className="ml-1">📍 {photo.location.coords.latitude.toFixed(4)}, {photo.location.coords.longitude.toFixed(4)}</span>
                    : <span className="ml-1 text-red-500">📍 GPS not available</span>
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </Card>
  );
}