export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-10 py-20">
      <h1 className="text-outfit-45 mb-8">Your Profile</h1>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-outfit-24">
            U
          </div>
          <div>
            <h2 className="text-outfit-24 font-medium">User Name</h2>
            <p className="text-outfit-16 text-zinc-500">user@example.com</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-outfit-16 font-medium mb-1">Account Settings</h3>
            <p className="text-outfit-14 text-zinc-500">Manage your password and security settings.</p>
          </div>
          <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-outfit-16 font-medium mb-1">Order History</h3>
            <p className="text-outfit-14 text-zinc-500">View your past purchases and tracking status.</p>
          </div>
          <div className="pb-4">
            <h3 className="text-outfit-16 font-medium mb-1">Preferences</h3>
            <p className="text-outfit-14 text-zinc-500">Customize your notification and theme settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
