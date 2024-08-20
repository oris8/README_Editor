import { Button } from '@/components/ui/button';

import useMarkdownEditor from '../../hooks/useMarkdownEditor';

const MarkdownEditorButtons = () => {
  const {
    copyMarkdown,
    copyHTML,
    getMarkdownToLocalStorage,
    saveToLocalStorage,
  } = useMarkdownEditor();

  return (
    <div>
      <Button type="button" onClick={saveToLocalStorage}>
        임시저장
      </Button>
      <Button type="button" onClick={getMarkdownToLocalStorage}>
        임시저장 데이터 불러오기
      </Button>
      <Button type="button" onClick={copyHTML}>
        전체 복사하기 (HTML)
      </Button>
      <Button type="button" onClick={copyMarkdown}>
        전체 복사하기 (Markdown)
      </Button>
    </div>
  );
};

export default MarkdownEditorButtons;
