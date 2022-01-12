import React, { useEffect } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PageStyles = styled.div`
  /* background-color: #0D1117; */
  /* color: #fff; */
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: center;
  .preview {
    padding: 1rem;
    flex: 1;
    height: 80vh;
    overflow: scroll;
  }
  .editor {
    flex: 1;
  }
`;

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        // eslint-disable-next-line
        children={String(children).replace(/\n$/, '')}
        style={vscDarkPlus}
        language={match[1]}
        PreTag="pre"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  a(props) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  },
};

function ReactMonacoEditor() {
  const [value, setValue] = React.useState('');

  useEffect(() => {
    setValue(localStorage.getItem('markdown'));
  }, []);

  const handleEditorChange = (editorValue, e) => {
    setValue(editorValue);
    localStorage.setItem('markdown', editorValue.toString());
  };

  return (
    <PageStyles>
      <div className="preview markdown-body">
        {/* eslint-disable-next-line */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ ...components }}
        >
          {value}
        </ReactMarkdown>
      </div>
      <div className="editor">
        <Editor
          height="80vh"
          defaultLanguage="markdown"
          defaultValue={value}
          onChange={handleEditorChange}
          theme="vs-dark"
          loading="better readme is Loading..."
          options={{
            mouseWheelZoom: true,
            fontSize: 20,
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </PageStyles>
  );
}

export default ReactMonacoEditor;
