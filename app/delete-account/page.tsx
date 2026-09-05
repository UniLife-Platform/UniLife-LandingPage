import React from 'react';

export const metadata = {
  title: 'Delete Account | UniLife',
  description: 'Instructions on how to request account deletion for UniLife.',
};

export default function DeleteAccount() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="max-w-2xl w-full backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl text-white">
        <h1 className="text-3xl font-bold mb-4">Account Deletion Request</h1>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          At UniLife, you have full control over your data. If you wish to permanently delete your account and all associated information, follow the steps below.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
          <h2 className="text-xl font-semibold mb-2">How to Request Deletion</h2>
          <p className="text-gray-300">
            Send an email to <a href="mailto:support@unilife.com.ng" className="text-blue-400 hover:underline">support@unilife.com.ng</a> from the email address registered to your account.
          </p>
          <div className="mt-3 p-3 bg-black/40 rounded-lg text-sm font-mono text-gray-300">
            Subject: Account Deletion Request
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">What Gets Deleted?</h2>
        <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-8">
          <li>Your profile data (Name, Username, Avatar).</li>
          <li>All posts, polls, and media shared on the Campus Feed.</li>
          <li>Your Campus Marketplace shop and listings.</li>
          <li>Your Student Points (SP) balance.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">Processing Time</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          Once we verify your request, your account and associated data will be permanently deleted within 7 days. This action is irreversible.
        </p>

      </div>
    </div>
  );
}