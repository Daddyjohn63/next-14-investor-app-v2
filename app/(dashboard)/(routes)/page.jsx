import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <p>Investment Profiles</p>
    </div>
  );
}
