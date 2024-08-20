import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useRef } from 'react';

const MarkdownViewer = ({ initialValue, ...props }) => {
  const ref = useRef(null);

  // initialValue가 바뀌면 Editor의 내용을 변경.
  useEffect(() => {
    if (!ref.current) return;

    const instance = ref.current.getInstance();
    instance.setMarkdown(initialValue);
  }, [initialValue]);

  return <Viewer ref={ref} initialValue={initialValue} {...props} />;
};

export default MarkdownViewer;
