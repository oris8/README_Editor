import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { debounce } from 'es-toolkit';
import { useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';

import useMarkdownEditor from '../../hooks/useMarkdownEditor';
import { markdownRefAtom } from '../../lib/atoms';

const MarkdownEditor = () => {
  const ref = useRef(null);
  const setMarkdownRefAtom = useSetAtom(markdownRefAtom);
  const { saveToLocalStorage } = useMarkdownEditor();

  const saveMarkdown = useCallback(
    debounce(() => {
      saveToLocalStorage;
    }, 6000),
    []
  );

  const handleChange = useCallback(() => {
    if (!ref.current) return;

    saveMarkdown();
  }, [saveToLocalStorage]);

  // 초기 ref 설정
  useEffect(() => {
    if (!ref.current) return;

    setMarkdownRefAtom(ref);
  }, []);

  return (
    <Editor
      ref={ref}
      initialValue=""
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={false}
      onChange={handleChange}
      customHTMLRenderer={{
        img(node, context) {
          if (context.entering ? 'openTag' : 'closeTag')
            console.log(context, node);
          // return [
          return {
            type: 'openTag',
            tagName: 'img',
            outerNewLine: true,
            attributes: node.attrs,
            selfClose: true,
          };
          //   { type: 'html', content: node.childrenHTML },
          //   { type: 'closeTag', tagName: 'img', outerNewLine: true },
          // ];
        },
        latex(node) {
          const generator = new latexjs.HtmlGenerator({ hyphenate: false });
          const { body } = latexjs
            .parse(node.literal, { generator })
            .htmlDocument();

          return [
            { type: 'openTag', tagName: 'div', outerNewLine: true },
            { type: 'html', content: body.innerHTML },
            { type: 'closeTag', tagName: 'div', outerNewLine: true },
          ];
        },
      }}
      plugins={[colorSyntax]}
    />
  );
};

export default MarkdownEditor;
