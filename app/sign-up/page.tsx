import Logo from "@/components/utils/Logo";
import RegistrationForm from "@/components/Form/RegistrationForm";

export default async function Page() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-bgGreen to-bgBlue py-1 md:py-4 mx-auto px-3 md:px-10 lg:px-16">
      <div className="">
        <Logo />
      </div>
      <div className="flex flex-col items-center justify-center p-8 md:p-10">
        <div className="flex flex-col gap-6">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
