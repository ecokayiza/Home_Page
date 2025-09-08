import Image from 'next/image';
import GitHubIcon from './icons/GitHubIcon';
import BilibiliIcon from './icons/BilibiliIcon';

const Profile = () => {
  return (
    <section className="text-center py-8">
      <Image
        src="/profile.jpg"
        alt="Profile Picture"
        width={96}
        height={96}
        className="rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold">Ecokayiza</h1>
      <p className="text-md text-gray-600 mt-2">Treat with AI.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="https://github.com/ecokayiza" aria-label="GitHub Profile" className="text-gray-600 hover:text-blue-500 transition-colors">
          <GitHubIcon className="w-6 h-6" />
        </a>
        <a href="https://space.bilibili.com/327061940" aria-label="Bilibili Profile" className="text-gray-600 hover:text-blue-500 transition-colors">
          <BilibiliIcon className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default Profile;