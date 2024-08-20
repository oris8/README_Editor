import { useAtomValue } from 'jotai';
import { toast } from 'sonner';

import { markdownRefAtom } from '../lib/atoms';
import { copyText } from '../lib/utils';

const useMarkdownEditor = () => {
  const markdownRef = useAtomValue(markdownRefAtom);

  const copyMarkdown = () => {
    const markdown = markdownRef?.current.getInstance().getMarkdown();
    copyText(markdown, '마크다운 형식으로 리드미가 복사되었습니다!');
  };

  const copyHTML = () => {
    const html = markdownRef?.current.getInstance().getHTML();
    copyText(html, 'HTML 형식으로 리드미가 복사되었습니다!');
  };

  const getMarkdownToLocalStorage = () => {
    const temp = localStorage?.getItem('git-markdown-temp');

    if (!temp) {
      toast.error('임시저장된 값이 없습니다');
      return;
    }

    markdownRef?.current.getInstance().setMarkdown(temp);
    toast.success('임시저장 값을 불러오는데 성공했습니다!');
  };

  const saveToLocalStorage = () => {
    const currentMarkdown = markdownRef?.current.getInstance().getMarkdown();

    localStorage.setItem('git-markdown-temp', currentMarkdown);
    toast.success('임시저장에 성공했습니다!');
  };

  return {
    copyMarkdown,
    copyHTML,
    getMarkdownToLocalStorage,
    saveToLocalStorage,
  };
};

export default useMarkdownEditor;
