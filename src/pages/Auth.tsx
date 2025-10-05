import React, {
  useState,
  useRef,
  createContext,
  useContext,
  useEffect,
  forwardRef,
  FormEvent,   // ✅ Added this
} from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import FarmCredLogo from "../components/FarmCredLogo";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import ContactInfo from "../components/ContactInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useAuth();

  // ✅ Now FormEvent is recognized
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) return toast.error("Please enter your email");
    if (!trimmedPassword) return toast.error("Please enter your password");
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) return toast.error("Please enter a valid email");

    setLoading(true);
    try {
      const { error } = await signIn(trimmedEmail, trimmedPassword);
      if (error) toast.error(error.message);
      else toast.success("Logged in successfully!");
    } catch {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {/* rest of your JSX... */}
    </>
  );
}
