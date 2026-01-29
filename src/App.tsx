import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import Welcome from './pages/Welcome';
import CreateWallet from './pages/CreateWallet';
import ImportWallet from './pages/ImportWallet';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';
import Receive from './pages/Receive';
import Assets from './pages/Assets';
import Settings from './pages/Settings';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="w-[360px] h-[600px] overflow-y-auto overflow-x-hidden bg-black">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create" element={<CreateWallet />} />
          <Route path="/import" element={<ImportWallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
