'use client';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/60 shadow-sm">
        <h3 className="text-slate-800 text-lg font-semibold mb-5">Account Settings</h3>
        <div className="space-y-5">
          <div>
            <label className="text-slate-600 text-sm font-medium block mb-1.5">Display Name</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-2xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Your display name"
            />
          </div>
          <div>
            <label className="text-slate-600 text-sm font-medium block mb-1.5">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-2xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-slate-600 text-sm font-medium block mb-1.5">Bio</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-2xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <label className="text-slate-600 text-sm font-medium block mb-1.5">Website</label>
            <input
              type="url"
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-2xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="https://"
            />
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-slate-200/60">
          <button
            type="button"
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-2xl hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/60 shadow-sm">
        <h3 className="text-slate-800 text-lg font-semibold mb-5">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: 'New followers', desc: 'When someone follows your profile' },
            { label: 'Order updates', desc: 'When an artwork is purchased' },
            { label: 'Messages', desc: 'When you receive a new message' },
            { label: 'Newsletter', desc: 'Weekly updates and featured artists' },
          ].map((item) => (
            <label
              key={item.label}
              className="flex items-center justify-between py-3 px-4 bg-white/70 rounded-2xl cursor-pointer group"
            >
              <div>
                <span className="text-slate-700 text-sm font-medium block">{item.label}</span>
                <span className="text-slate-400 text-xs mt-0.5 block">{item.desc}</span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="relative w-10 h-5 rounded-full cursor-pointer appearance-none bg-slate-300 transition-colors duration-200 checked:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shrink-0
                  before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-200 checked:before:translate-x-5"
              />
            </label>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-slate-200/60">
          <button
            type="button"
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-2xl hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/60 shadow-sm">
        <h3 className="text-slate-800 text-lg font-semibold mb-5">Danger Zone</h3>
        <p className="text-slate-500 text-sm mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          type="button"
          className="px-5 py-2.5 bg-red-50 text-red-600 text-sm font-medium rounded-2xl border border-red-200 hover:bg-red-100 transition-colors duration-200"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
