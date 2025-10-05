import React, { useState, useRef, createContext, useContext, useEffect, forwardRef } from "react"

// --- Placeholder for a simple toast system using React state ---
const ToastContext = createContext(null)

const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState({ message: '', type: '' })

  useEffect(() => {
    if (toastMessage.message) {
      const timer = setTimeout(() => {
        setToastMessage({ message: '', type: '' })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  const toast = {
    success: (message) => setToastMessage({ message, type: 'success' }),
    error: (message) => setToastMessage({ message, type: 'error' }),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {toastMessage.message && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
            toastMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
          role="alert"
        >
          {toastMessage.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

// --- Placeholder for shadcn/ui components using Tailwind classes ---
const Button = ({ children, className, disabled, ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
))
Input.displayName = 'Input'

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {children}
  </label>
)

const Card = ({ children, className }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className }) => (
  <h3 className={`font-semibold tracking-tight text-2xl ${className}`}>
    {children}
  </h3>
)

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
)

// --- Placeholder for lucide-react icons as inline SVGs ---
const Mail = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const Eye = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOff = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 10.5a2.5 2.5 0 0 1 4 4" />
    <path d="M13.3 16.7a2.5 2.5 0 0 1-3.1-3.1" />
    <path d="m2 2 20 20" />
    <path d="M6.7 6.7A9.4 9.4 0 0 1 12 5c7 0 10 7 10 7a13.1 13.1 0 0 1-1.3 2.1" />
    <path d="M3.4 8.7a9.4 9.4 0 0 0 1.2 2.3" />
    <path d="M18.7 18.7a9.4 9.4 0 0 1-1.2-2.3" />
    <path d="M17.3 12.5c-.3 1.2-1.3 2.2-2.5 2.5" />
    <path d="M12.5 17.3a2.5 2.5 0 0 1-1.7-.8" />
  </svg>
)

// --- Placeholder for a simple authentication context ---
const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const { success, error } = useContext(ToastContext)

  const signIn = async (email, password) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (email === "test@example.com" && password === "password123") {
      setUser({ email: email })
      success("Logged in successfully!")
      return { user: { email: email } }
    } else {
      error("Invalid email or password.")
      return { error: { message: "Invalid email or password" } }
    }
  }

  const sendPasswordResetEmail = async (email) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (email) {
      success("Recovery email sent! Check your inbox.")
      return {}
    } else {
      error("Failed to send recovery email.")
      return { error: { message: "Failed to send recovery email" } }
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, sendPasswordResetEmail, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

// --- Simple Modal Component (from user's code) ---
const Modal = ({ open, onClose, children }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground font-bold text-lg"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

// --- LoginForm Component (from user's code) ---
const LoginForm = () => {
  const { signIn, sendPasswordResetEmail } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const { toast } = useContext(ToastContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail) return toast.error("Please enter your email")
    if (!trimmedPassword) return toast.error("Please enter your password")
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) return toast.error("Please enter a valid email")

    setLoading(true)
    try {
      const { error } = await signIn(trimmedEmail, trimmedPassword)
      if (error) toast.error(error.message)
      else toast.success("Logged in successfully!")
    } catch {
      toast.error("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) return toast.error("Please enter your email to reset password")
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) return toast.error("Please enter a valid email")

    setResetLoading(true)
    try {
      await sendPasswordResetEmail(trimmedEmail)
      toast.success("Recovery email sent! Check your inbox.")
      setModalOpen(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to send recovery email")
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Login to FarmCred</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                ref={emailInputRef}
                required
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                ref={passwordInputRef}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border border-muted-foreground accent-primary"
                />
                Remember Me
              </label>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Mail size={14} /> Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email.trim() || !password.trim()}
            >
              {loading ? "Logging in..." : "Access Account"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Forgot Password Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your email below to receive a password recovery link.
        </p>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <Button
            onClick={handlePasswordReset}
            disabled={resetLoading || !email.trim()}
            className="w-full"
          >
            {resetLoading ? "Sending..." : "Send Recovery Email"}
          </Button>
        </div>
      </Modal>
    </>
  )
}

// --- Main App Component to render everything ---
export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
          <LoginForm />
        </div>
      </AuthProvider>
    </ToastProvider>
  )
}
