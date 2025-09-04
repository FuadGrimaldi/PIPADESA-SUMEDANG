import HostLogin from "@/components/Auth/SigninHost";

export default async function LoginHostPage() {
  return (
    <div className="container min-h-screen  ">
      {/* <div className="relative px-[31px] lg:px-[100px] px-4 py-8"> */}
      <div className="relative">
        <HostLogin />
      </div>
      {/* </div> */}
    </div>
  );
}
