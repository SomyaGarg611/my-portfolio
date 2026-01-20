'use client';

import { useRouter } from 'next/navigation';
import ProfileCard from './profile-card';

interface ProfileCardWrapperProps {
  avatarUrl: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  behindGlowEnabled?: boolean;
  contactUrl?: string;
}

export default function ProfileCardWrapper({
  avatarUrl,
  miniAvatarUrl,
  name,
  title,
  handle,
  status,
  contactText,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  behindGlowEnabled = true,
  contactUrl = '/contact'
}: ProfileCardWrapperProps) {
  const router = useRouter();

  const handleContactClick = () => {
    router.push(contactUrl);
  };

  return (
    <ProfileCard
      avatarUrl={avatarUrl}
      miniAvatarUrl={miniAvatarUrl}
      name={name}
      title={title}
      handle={handle}
      status={status}
      contactText={contactText}
      showUserInfo={showUserInfo}
      enableTilt={enableTilt}
      enableMobileTilt={enableMobileTilt}
      mobileTiltSensitivity={mobileTiltSensitivity}
      behindGlowEnabled={behindGlowEnabled}
      onContactClick={handleContactClick}
    />
  );
}
