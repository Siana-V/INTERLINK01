import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { useLocation } from "wouter";
import { useRole } from "@/hooks/use-interlink";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { Briefcase, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function IndustryLogin() {
  const { t } = useTranslation();

  const { setRole } = useRole();
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP Verification State
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isLogin) {
        // Sign in existing user
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            throw new Error("Incorrect credentials. (If you just signed up, your email might not be verified!)");
          }
          throw error;
        }
      } else {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: "industry"
            }
          }
        });
        if (error) throw error;
        
        // If Supabase requires email verification, session will be null here
        if (!data.session) {
          setShowOTP(true);
          return; // Stop here and show the OTP screen!
        }
      }

      setRole("industry");
      setLocation("/industry");
    } catch (err: any) {
      setErrorMsg(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",
      });
      if (error) throw error;

      // Verification successful, session is established!
      setRole("industry");
      setLocation("/industry");
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid or expired verify code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50">
      <FloatingBlobs />
      
      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-panel rounded-3xl p-8 shadow-2xl"
        >
          {showOTP ? (
            // ====================== OTP VERIFICATION VIEW ======================
            <>
              <button 
                type="button"
                onClick={() => { setShowOTP(false); setOtp(""); }} 
                className="text-muted-foreground hover:text-foreground mb-6 flex items-center text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>
              
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Check your email
              </h2>
              <p className="text-muted-foreground mb-6">
                We sent a 6-digit confirmation code to <span className="font-bold text-foreground">{email}</span>.
              </p>

              {errorMsg && (
                <div className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-lg border border-destructive/20 mb-6">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-6 flex flex-col items-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp} className="gap-2">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-14 text-lg font-bold bg-white/50" />
                    <InputOTPSlot index={1} className="w-12 h-14 text-lg font-bold bg-white/50" />
                    <InputOTPSlot index={2} className="w-12 h-14 text-lg font-bold bg-white/50" />
                    <InputOTPSlot index={3} className="w-12 h-14 text-lg font-bold bg-white/50" />
                    <InputOTPSlot index={4} className="w-12 h-14 text-lg font-bold bg-white/50" />
                    <InputOTPSlot index={5} className="w-12 h-14 text-lg font-bold bg-white/50" />
                  </InputOTPGroup>
                </InputOTP>

                <Button disabled={loading || otp.length < 6} type="submit" className="w-full py-6 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-lg shadow-lg shadow-secondary/20 transition-all">
                  {loading ? "Verifying..." : "Confirm & Login"} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </>
          ) : (
            // ====================== STANDARD LOGIN/SIGNUP VIEW ======================
            <>
              <button 
                type="button"
                onClick={() => setLocation("/")} 
                className="text-muted-foreground hover:text-foreground mb-6 flex items-center text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to roles
              </button>
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-secondary" />
              </div>
              
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                {isLogin ? "Welcome back" : "Join InterLink"}
              </h2>
              <p className="text-muted-foreground mb-4">
                {isLogin ? "Enter your details to access your dashboard." : "Create an account to start mentoring."}
              </p>

              {errorMsg && (
                <div className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-lg border border-destructive/20 mb-6">
                  {errorMsg}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-foreground">{t("ind_profile_name", "Full Name")}</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe" 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium"
                    />
                  </div>
                )}
                <div className="space-y-1 relative">
                  <label className="text-sm font-semibold text-foreground">{t("ind_login_email", "Email")} Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium"
                    />
                  </div>
                </div>
                
                <div className="space-y-1 relative">
                  <label className="text-sm font-semibold text-foreground">{t("ind_login_password", "Password")}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium"
                    />
                  </div>
                </div>
                
                <Button type="submit" disabled={loading} className="w-full py-6 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-lg mt-4 shadow-lg shadow-secondary/20 transition-all">
                  {loading ? "Processing..." : (isLogin ? t("ind_login_submit", "Sign In") : t("ind_login_create", "Create Account"))} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
              
              <div className="mt-8 text-center flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button 
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrorMsg("");
                  }}
                  className="font-bold text-secondary text-sm ml-2 hover:underline"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
