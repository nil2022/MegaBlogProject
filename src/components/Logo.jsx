import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="text-center mx-auto">
      <img
        src="/logo-mega-blog.png"
        alt="Logo"
        style={{ width, height: width, borderRadius: "50%" }}
        className="mx-auto"
      />
    </div>
  );
}

export default Logo;
