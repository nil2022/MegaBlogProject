import React from "react";

const imageSrc = `https://hqsv3cqzgaigl7jv.public.blob.vercel-storage.com/logo-mega-blog-8t3HXPGzzOKzmuuDWOQgMajrh0iNy7.png`;

function Logo({ width = "100px" }) {
  return (
    <div className="text-center mx-auto">
      <img
        src={imageSrc}
        alt="Logo"
        style={{ width, height: width, borderRadius: "50%" }}
        className="mx-auto"
      />
    </div>
  );
}

export default Logo;
