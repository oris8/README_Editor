import axios from 'axios';
import clsx from 'clsx';
import * as icons from 'simple-icons';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

// type BadgeStyle =
//   | "flat"
//   | "flat-square"
//   | "plastic"
//   | "for-the-badge"
//   | "social";

/**
 * CSS 클래스 이름을 병합하고, 중복된 클래스를 제거합니다.
 * @param {...ClassValue[]} inputs - 클래스 이름 문자열 또는 객체들을 배열로 전달합니다.
 * @returns {string} 병합된 클래스 이름 문자열을 반환합니다.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const createBadge = ({
  badgeText = 'html5',
  badgeColor = 'black',
  badgeIcon = 'html5',
  badgeTextColor = 'white',
  badgeStyle = 'flat',
  badgeLink = '',
}) => {
  const logoName = badgeIcon
    ? 'si' + badgeIcon.at(0).toUpperCase() + badgeIcon.slice(1).toLowerCase()
    : '';
  const icon = icons[logoName];
  const label = badgeText || icon?.title || 'badgeIcon';
  const color = badgeColor || icon?.hex || 'black';
  const textColor = badgeTextColor || 'white';

  const html = `<img
  alt="${label} badge"
  src="https://img.shields.io/badge/${label}-${color}?style=${badgeStyle}&logo=${icon?.title}&logoColor=${textColor}"
/>`;

  const linkHtml = badgeLink
    ? `<a href="${badgeLink}" target="_blank" rel="noopener noreferrer">${html}</a>`
    : null;

  return { html: linkHtml || html, originalColor: icon?.hex };
};

export const getUser = async (value) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${value}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (e) {
    const statusCode = e.response.status;
    if (statusCode === 404) {
      toast.error('올바른 깃허브 아이디를 입력해주세요');
      return;
    }
    toast.error(`개발자에게 문의해주세요\nErrorCode: ${statusCode.status}`);
  }
};

export const createTable = (profileList) => {
  const col = profileList.length;

  let markdown = `## Team`;

  // markdown += `\n|`;
  // for (let i = 0; i < col; i++) {
  //   markdown += `|`;
  // }

  markdown += `\n|`;

  for (const item of profileList) {
    markdown += `<img src="${item.image}" alt="${item.id}의 프로필 이미지" width="100" height="100"/>|`;
  }

  markdown += `\n|`;
  for (let i = 0; i < col; i++) {
    markdown += `:-:|`;
  }

  markdown += `\n|`;
  for (const item of profileList) {
    if (item.name) {
      markdown += `${item.name}<br/>`;
    }
    markdown += `[@${item.id}](${item.url})|`;
  }

  // ## Team
  // |<img src="https://avatars.githubusercontent.com/u/147056?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/147056?v=4" width="150" height="150"/>|
  // |:-:|:-:|
  // |[@tets](https://github.com/tets)|[@tets](https://github.com/tets)|

  return markdown;
};

export const copyText = (text, toastText) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(toastText);
  });
};
