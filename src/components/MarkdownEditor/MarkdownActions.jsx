import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ClipboardCopy,
  ClipboardPaste,
  MoreHorizontalIcon,
  Save,
} from 'lucide-react';

import useMarkdownEditor from '../../hooks/useMarkdownEditor';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
// import SICK from '/public/춘식2.png';
import SICK from '/public/chuns.png';

const MarkdownActions = () => {
  const {
    copyMarkdown,
    copyHTML,
    getMarkdownToLocalStorage,
    saveToLocalStorage,
  } = useMarkdownEditor();

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger>
            <DropdownMenuTrigger asChild>
              {/* <Button className="absolute -top-10 right-8"> */}

              <Button className="absolute -top-12 right-8 [&:hover_.custom-tooltip]:opacity-100">
                {/* <div className="mx-2 flex items-center justify-center gap-1">
                  더보기 <MoreHorizontalIcon />
                </div> */}

                <div className="custom-tooltip absolute -top-6 right-2 rounded-[16px] border-[#dadde6] bg-white p-3 opacity-0 shadow-md">
                  메뉴
                </div>
                <img
                  src={SICK}
                  alt="마크다운 메뉴 보기"
                  width={160}
                  height={160}
                  // className="hover:opacity-70"
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <DropdownMenuContent className="absolute -right-28 -top-64 w-56 rounded-[16px] bg-white p-3 shadow-sm">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={saveToLocalStorage}>
                <Save className="mr-2 h-4 w-4" />
                <span>임시저장</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={getMarkdownToLocalStorage}>
                <ClipboardPaste className="mr-2 h-4 w-4" />
                <span>임시저장 불러오기</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="git-border border-t-0" />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={copyHTML}>
                <ClipboardCopy className="mr-2 h-4 w-4" />
                <span>복사하기 (HTML)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyMarkdown}>
                <ClipboardCopy className="mr-2 h-4 w-4" />
                <span>복사하기 (markdown)</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MarkdownActions;
