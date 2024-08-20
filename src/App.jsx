import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';

import './App.css';
import BadgeForm from './components/BadgeForm';
import CreateTableForm from './components/CreateTableForm';
import MarkdownEditor, { MarkdownActions } from './components/MarkdownEditor';

function App() {
  return (
    <>
      <div className="flex flex-col gap-32">
        <h1 className="mx-auto text-3xl font-extrabold">
          깃허브 마크다운 편집기
        </h1>
        <div className="flex">
          <BadgeForm />
          <CreateTableForm />
        </div>

        <div className="relative">
          <MarkdownEditor />
          <MarkdownActions />
        </div>

        <Toaster />
      </div>
      <Analytics />
    </>
  );
}

export default App;
