import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Plane, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/service/AuthContext'
import { useToast } from '@/components/ui/use-toast'

export default function Header() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [dropdownOpen, setDropdown] = useState(false)
  const { user, signInWithGoogle, signOut } = useAuth()
  const { toast }  = useToast()
  const location   = useLocation()
  const isHome     = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
      toast({ title: 'Welcome!', description: 'Signed in with Google.' })
    } catch {
      toast({ variant: 'destructive', title: 'Sign-in failed', description: 'Please try again.' })
    }
  }
  const handleSignOut = async () => { await signOut(); setDropdown(false) }

  // On landing (amber bg): transparent → white/shadow on scroll
  // On app pages: always white
  const headerBg = isHome
    ? scrolled
      ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F0F0F0]'
      : 'bg-transparent border-b border-transparent'
    : scrolled
      ? 'bg-white shadow-sm'
      : 'bg-white border-b border-[#E0E0E0]'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#F7A800]"></span>
              <span className="text-xl font-black font-poppins text-[#0D0D0D] tracking-tight">TravPlan.</span>
            </div>
          </Link>

          {/* Centre nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              ['for Creators', '/#destinations'],
              ['for Business', '/#how-it-works'],
              ['Get inspired', '/#destinations'],
              ['Resources', '/#how-it-works'],
            ].map(([label, href]) => (
              <a key={label} href={href}
                className="px-4 py-2 rounded-full text-sm font-medium text-[#0D0D0D] hover:bg-black/[0.06] transition-colors italic">
                {label.startsWith('for') ? (
                  <><em>{label}</em></>
                ) : label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdown(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E0E0E0] hover:bg-[#F5F5F5] transition-colors">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=F7A800&color=0D0D0D`}
                    alt="" className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-sm font-semibold hidden sm:block max-w-[80px] truncate text-[#0D0D0D]">
                    {user.displayName?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#717171]" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-[#E0E0E0] overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-[#F0F0F0]">
                        <p className="text-sm font-semibold text-[#0D0D0D] truncate">{user.displayName}</p>
                        <p className="text-xs text-[#717171] truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link to="/create-trip" onClick={() => setDropdown(false)}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-[#0D0D0D] hover:bg-[#F5F5F5]">
                          <Plane className="w-4 h-4 text-[#00A680]" /> Plan a Trip
                        </Link>
                        <button onClick={handleSignOut}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button onClick={handleSignIn}
                  className="hidden sm:block px-4 py-2 text-sm font-semibold text-[#0D0D0D] hover:opacity-60 transition-opacity">
                  Log in
                </button>
                <button onClick={handleSignIn}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#0D0D0D] text-[#0D0D0D] text-sm font-bold hover:bg-[#0D0D0D] hover:text-white transition-colors">
                  Get started
                </button>
              </>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/[0.07] transition-colors">
              {menuOpen ? <X className="w-5 h-5 text-[#0D0D0D]" /> : <Menu className="w-5 h-5 text-[#0D0D0D]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col border-l border-[#F0F0F0]"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#F0F0F0]">
                <span className="font-black text-[#0D0D0D] text-lg font-poppins">TravPlan.</span>
                <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F5F5F5] text-[#717171]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col p-3 gap-1 flex-1">
                {[['Get Inspired', '/#destinations'], ['How It Works', '/#how-it-works'], ['Plan a Trip', '/create-trip']].map(([label, href]) => (
                  <Link key={label} to={href} onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-[#0D0D0D] hover:bg-[#F5F5F5] transition-colors">
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-[#F0F0F0]">
                {user ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F8F8]">
                    <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0D0D0D] truncate">{user.displayName}</p>
                      <button onClick={handleSignOut} className="text-xs text-red-500 hover:underline">Sign Out</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => { handleSignIn(); setMenuOpen(false) }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#0D0D0D] text-white text-sm font-bold">
                    <img src="/glogo.svg" alt="" className="w-4 h-4" />
                    Get started
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
