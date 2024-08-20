import FormGroup from '@/components/FormGroup';
import MarkdownViewer from '@/components/MarkdownEditor/MarkdownViewer';
import { markdownRefAtom } from '@/lib/atoms';
import { createBadge } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';

import CustomRadioGroup from '../RadioGroup';
import ColorGroup from './ColorGroup';

const OPTIONS = [
  { id: 1, value: 'flat', label: 'Flat' },
  { id: 2, value: 'flat-square', label: 'Flat-Square' },
  { id: 3, value: 'plastic', label: 'Plastic' },
  { id: 4, value: 'for-the-badge', label: 'ForTheBadge' },
  { id: 5, value: 'social', label: 'Social' },
];

const INITIAL_VALUE = {
  badgeText: 'github',
  badgeColor: '',
  badgeIcon: 'github',
  badgeTextColor: '',
  badgeStyle: 'flat',
};

const BadgeForm = () => {
  const markdownRef = useAtomValue(markdownRefAtom);

  const [value, setValue] = useState({
    ...INITIAL_VALUE,
    badgeColor: createBadge(INITIAL_VALUE).originalColor,
  });

  const handleValueChange = (name, selectedValue) => {
    setValue({ ...value, [name]: selectedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const badgeHTML = createBadge(value).html;
    markdownRef.current.getInstance().insertText(badgeHTML);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold">뱃지 추가하기</h2>

      <div className="relative mr-8 flex min-h-[500px] w-[480px] justify-between p-4">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <FormGroup>
            <FormGroup.Label>뱃지 내용</FormGroup.Label>
            <FormGroup.InputField
              value={value.badgeText}
              type="text"
              name="badgeText"
              onChange={(e) => handleValueChange(e.target.name, e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormGroup.Label>뱃지 색상</FormGroup.Label>
            <ColorGroup
              onChange={(value) => {
                handleValueChange('badgeColor', value);
              }}
              formValue={value.badgeColor}
              options={[
                {
                  value: createBadge(value)?.originalColor || '000',
                  id: 'badgeColor-default',
                  label: '기본 색상',
                },
                {
                  value: 'custom',
                  id: 'badgeColor-custom',
                  label: '커스텀 색상',
                },
              ]}
            />
          </FormGroup>

          <FormGroup>
            <FormGroup.Label>뱃지 아이콘</FormGroup.Label>
            <FormGroup.InputField
              type="text"
              name="badgeIcon"
              value={value.badgeIcon}
              onChange={(e) => handleValueChange(e.target.name, e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormGroup.Label>로고 색상</FormGroup.Label>
            <ColorGroup
              onChange={(value) => {
                handleValueChange('badgeTextColor', value);
              }}
              formValue={value.badgeColor}
              options={[
                {
                  value: 'white',
                  id: 'badgeTextColor-white',
                  label: '흰색',
                },
                {
                  value: 'black',
                  id: 'badgeTextColor-black',
                  label: '검정',
                },
                {
                  value: 'custom',
                  id: 'badgeTextColor-custom',
                  label: '커스텀 색상',
                },
              ]}
            />
          </FormGroup>

          <FormGroup>
            <FormGroup.Label>뱃지 스타일</FormGroup.Label>
            <CustomRadioGroup
              options={OPTIONS}
              onChange={(value) => handleValueChange('badgeStyle', value)}
            />
          </FormGroup>

          <button
            type="submit"
            className="git-button absolute bottom-4 right-4"
          >
            추가하기
          </button>
        </form>

        <div className="h-28 w-36 overflow-hidden rounded-[4px] border-[1px] border-[#dadde6] text-center">
          <h3 className="border-b-[1px] border-b-[#dadde6] bg-[#f7f9fc] p-2">
            미리보기
          </h3>
          <div className="p-2 [&_img]:flex [&_img]:items-center [&_img]:justify-center [&_p]:inline-block [&_p]:h-full">
            <MarkdownViewer initialValue={createBadge(value).html} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeForm;
