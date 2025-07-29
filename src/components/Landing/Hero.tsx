const Hero = ({ subdomain }: { subdomain: string | null }) => {
  if (!subdomain) {
    return (
      <div className="hero">
        <h1 className="text-4xl font-bold">Welcome to Website Desa </h1>
        <p className="mt-4 text-lg">Your journey starts here.</p>
      </div>
    );
  }

  return (
    <div className="hero">
      <h1 className="text-4xl font-bold">Welcome to Our {subdomain} </h1>
      <p className="mt-4 text-lg">Your journey starts here.</p>
    </div>
  );
};

export default Hero;
