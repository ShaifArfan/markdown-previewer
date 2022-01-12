import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import ReactMonacoEditor from './components/ReactMonacoEditor';

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0d1117;
  padding: 0 2rem;
  .logo {
    color: white;
  }
`;

function App() {
  const handleCopyMarkdown = async () => {
    const markdown = localStorage.getItem('markdown');
    await navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied on your clipboard.');
  };
  console.log(typeof handleCopyMarkdown);

  return (
    <>
      <Toaster position="top-right" />
      <div id="container">
        <AppHeader>
          <h2 className="logo">Markdown Previewer</h2>
          <button onClick={handleCopyMarkdown} type="button">
            Copy Markdown
          </button>
        </AppHeader>
        <ReactMonacoEditor />
      </div>
    </>
  );
}

export default App;
