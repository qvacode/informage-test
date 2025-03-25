import { Calendar } from './components/Calendar';
import './App.css';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className='w-screen h-screen flex justify-center bg-gray-50'>
      <div className='w-full max-w-5xl px-4 mt-12'>
        <Calendar />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
