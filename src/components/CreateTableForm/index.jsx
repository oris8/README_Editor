import { useAtomValue } from 'jotai';
import { PlusIcon, Search, XIcon } from 'lucide-react';
import { useState } from 'react';

import { markdownRefAtom } from '../../lib/atoms';
import { createTable, getUser } from '../../lib/utils';

const INITIAL_PROFILE = {
  id: null,
  image: null,
  url: null,
  name: null,
};

const ProfileCard = ({ data, className, onDelete, onAdd }) => {
  return (
    <div className={`relative overflow-hidden rounded-[16px] ${className}`}>
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute right-4 top-2 m-1 h-6 w-6 rounded-full bg-red-300 text-white hover:bg-red-500"
        >
          <XIcon />
        </button>
      )}

      {onAdd && (
        <button
          onClick={onAdd}
          className="absolute right-1 top-1 m-1 h-6 w-6 rounded-full bg-slate-300 text-white hover:bg-slate-500"
        >
          <PlusIcon />
        </button>
      )}

      <div className="p-2">
        <img src={data.image} className="w-full rounded-full" />
        <div className="name">{data.name}</div>
        <a target="_blank" href={data.url}>
          @{data.id}
        </a>
      </div>
    </div>
  );
};

const CreateTableForm = () => {
  const [value, setValue] = useState('');
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [profileList, setProfileList] = useState([]);
  const markdownRef = useAtomValue(markdownRefAtom);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await getUser(value);
    setProfile({
      id: data.login,
      image: data.avatar_url,
      url: data.html_url,
      name: data.name,
    });
    setValue('');
  };

  const addProfile = () => {
    setProfileList((prev) => [...prev, profile]);
  };

  const deleteProfile = (key) => {
    setProfileList((prev) => prev.filter((profile) => profile.id !== key));
  };

  const handleCreateTable = () => {
    const markdown = createTable(profileList);
    markdownRef.current.getInstance().insertText(markdown);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold">팀원 표 생성</h2>
      <div className="flex min-h-[500px] w-[600px] flex-col justify-between p-4">
        <div className="flex justify-between">
          <form onSubmit={onSubmit} className="grow text-center">
            <div className="py-8">
              깃허브 아이디로 유저를 검색할 수 있습니다
            </div>

            <div className="flex justify-center">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="git-input mr-2"
              />
              <button type="submit" className="git-button w-[max-content] p-2">
                <Search width={16} height={16} />
              </button>
            </div>
          </form>

          <div className="w-24">
            {profile.id && (
              <ProfileCard data={profile} className="w-24" onAdd={addProfile} />
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-3 overflow-hidden rounded-[4px] border-[1px] border-[#dadde6] pb-4 text-center">
          <h4 className="border-b-[1px] border-b-[#dadde6] bg-[#f7f9fc] p-2">
            추가된 팀원 {profileList.length}명
          </h4>
          <div className="flex h-[180px] gap-2">
            {profileList.length > 0 &&
              profileList.map((profile, idx) => (
                <ProfileCard
                  key={`${idx},${profile.id}`}
                  data={profile}
                  className="relative w-32"
                  onDelete={() => deleteProfile(profile.id)}
                />
              ))}
          </div>
          {profileList.length > 0 && (
            <button onClick={handleCreateTable} className="git-button mx-auto">
              표 생성하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTableForm;
