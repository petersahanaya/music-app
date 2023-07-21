"use client";
import Image from "next/image";

type ProfileProps = {
  src?: string;
};

const Profile = ({ src = "/profile.jpeg" }: ProfileProps) => {
  return (
    <Image className="cursor-pointer" src={src} alt="profile image" fill />
  );
};

export default Profile;
