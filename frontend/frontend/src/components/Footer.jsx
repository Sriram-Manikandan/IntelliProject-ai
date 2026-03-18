import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-400">
            Intelli<span className="text-gradient">Project</span>
          </span>
        </div>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} IntelliProject. Built to inspire builders.
        </p>
      </div>
    </footer>
  );
}
