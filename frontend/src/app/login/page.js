'use client';

import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] flex">
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden rounded-l-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-800/40 to-slate-900/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80"
          alt="Artistic painting"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-10 left-10 z-20 max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h2 className="text-white text-2xl font-bold">ArtHub</h2>
            <p className="text-white/70 text-sm mt-2 leading-relaxed">
              Where creativity meets collection. Discover, buy, and sell extraordinary artwork from emerging and established artists worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 bg-slate-50">
        <LoginForm />
      </div>
    </div>
  );
}
